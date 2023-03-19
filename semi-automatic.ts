import { foreignKeyCheck } from './utils/disable-check';
import { generateInsert } from './utils/generate-insert';
import { Dialect, Options, QueryTypes, Sequelize } from 'sequelize';
import { seed } from './seed';
import { nanoid } from 'nanoid';

const DATABASE = 'bibliotecaprog3';
const DIALECT: Dialect = 'postgres';

const sequelize = new Sequelize({
  dialect: DIALECT,
  username: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: DATABASE,
});

(async () => {
  await sequelize.authenticate();

  await sequelize.transaction(async (t) => {
    console.log(`conectado a la base de datos: ${DATABASE}`);

    console.log('Limpiando la base de datos');

    // await foreignKeyCheck.disable(sequelize, DIALECT);

    for (const table of seed) {
      console.log('Eliminando registros de la tabla: ' + table.table);
      await sequelize.query(`DELETE FROM ${table.table}`);
      console.log(
        'Registros eliminados correctamente de la tabla: ' + table.table
      );
    }

    // await foreignKeyCheck.enable(sequelize, DIALECT);

    const dependents = seed
      .filter((table) => table.isDependent)
      .sort((a, b) => (a?.dependentOrder || 1) - (b?.dependentOrder || 1));
    const independents = seed.filter((table) => !table.isDependent);
    const tables = [...independents, ...dependents];

    for (const table of tables) {
      if (table.generateFromArray && table.array) {
        for (const row of table.array) {
          console.log('Insertando registro en la tabla: ' + table.table);

          const dependencies: any[] = [];
          if (table.isDependent && table.dependencies) {
            for (const dependency of table.dependencies) {
              const result = await sequelize.query(
                `SELECT * FROM ${dependency}`,
                {
                  type: QueryTypes.SELECT,
                  transaction: t,
                }
              );
              dependencies.push(result);
            }
          }

          const replacements =
            (table.values &&
              table?.values()?.map((value: any) => {
                if (typeof value === 'string' && value.startsWith('%')) {
                  return nanoid(5);
                }

                if (typeof value === 'string' && value.startsWith('$')) {
                  const index = parseInt(value.substring(1), 10);
                  return row[index];
                }

                if (typeof value === 'string' && value.startsWith('#')) {
                  const values = value.split('-');
                  const index = parseInt(values[1], 10);

                  return dependencies[index][
                    Math.floor(Math.random() * dependencies[index].length)
                  ][values[2]];
                }

                return value;
              })) ||
            [];

          await sequelize.query(
            generateInsert({
              columns: table.columns,
              table: table.table,
            }),
            {
              transaction: t,
              replacements,
            }
          );

          console.log(
            'Registro insertado correctamente en la tabla: ' + table.table
          );
        }
        continue;
      }

      console.log('Insertando registro en la tabla: ' + table.table);
      const insert = generateInsert(table);

      const dependencies: any[] = [];

      if (table.isDependent && table.dependencies) {
        for (const dependency of table.dependencies) {
          const result = await sequelize.query(`SELECT * FROM ${dependency}`, {
            type: QueryTypes.SELECT,
            transaction: t,
          });
          dependencies.push(result);
        }
      }

      await Promise.all(
        Array.from({ length: table.count || 0 }).map(async () => {
          const replacements =
            (table.values &&
              table?.values().map((value: any) => {
                if (typeof value === 'string' && value.startsWith('%')) {
                  return nanoid(5);
                }

                if (typeof value === 'string' && value.startsWith('#')) {
                  const values = value.split('-');
                  const index = parseInt(values[1], 10);

                  return dependencies[index][
                    Math.floor(Math.random() * dependencies[index].length)
                  ][values[2]];
                }

                return value;
              })) ||
            [];
          return sequelize.query(insert, {
            transaction: t,
            replacements,
          });
        })
      );

      console.log(
        'Registro insertado correctamente en la tabla: ' + table.table
      );
    }
  });

  sequelize.close();
})();
