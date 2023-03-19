import { Dialect, Sequelize } from 'sequelize';

export const foreignKeyCheck = {
  disable: async (sequelize: Sequelize, d: Dialect) => {
    switch (d) {
      case 'mysql':
      case 'mariadb':
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        break;
      case 'postgres':
        await sequelize.query('SET CONSTRAINTS ALL DEFERRED', { raw: true });
        break;
      case 'sqlite':
        await sequelize.query('PRAGMA foreign_keys = OFF', { raw: true });
        break;
      case 'oracle':
        await sequelize.query('ALTER SESSION SET CONSTRAINTS = DEFERRED', {
          raw: true,
        });
        break;
      case 'mssql':
        await sequelize.query(
          'EXEC sp_MSforeachtable @command1="ALTER TABLE ? NOCHECK CONSTRAINT all"',
          { raw: true }
        );
        break;
      default:
        throw new Error(`Dialect ${d} not supported`);
    }
  },
  enable: async (sequelize: Sequelize, d: Dialect) => {
    switch (d) {
      case 'mysql':
      case 'mariadb':
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
        break;
      case 'postgres':
        await sequelize.query('SET CONSTRAINTS ALL IMMEDIATE', { raw: true });
        break;
      case 'sqlite':
        await sequelize.query('PRAGMA foreign_keys = ON', { raw: true });
        break;
      case 'oracle':
        await sequelize.query('ALTER SESSION SET CONSTRAINTS = IMMEDIATE', {
          raw: true,
        });
        break;
      case 'mssql':
        await sequelize.query(
          'EXEC sp_MSforeachtable @command1="ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"',
          { raw: true }
        );
        break;
      default:
        throw new Error(`Dialect ${d} not supported`);
    }
  },
};
