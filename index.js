import pg from 'pg';
import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
const Client = pg.Client;

faker.locale = 'es';

const AUTORES = 100;
const PRESTAMO_ALUMNO = 150;
const ALUMNO = 75;

const CATEGORIA_LIBROS = [
  'Novela',
  'Poesía',
  'Teatro',
  'Cuento',
  'Biografía',
  'Ensayo',
  'Ciencia Ficción',
  'Fantasía',
  'Terror',
  'Autoayuda',
  'Religión',
  'Accion',
  'Aventura',
  'Comedia',
  'Crimen',
  'Drama',
  'Fantasía',
  'Historia',
  'Misterio',
  'Policíaco',
  'Romance',
  'Suspenso',
  'Thriller',
  'Western',
  'Infantil',
  'Juvenil',
  'Cuentos',
];

const LIBROS = [
  'La casa de Bernarda Alba',
  'La colmena',
  'El gato negro',
  'El aleph',
  'Rayuela',
  'La tregua',
  'La guerra de los mundos',
  'La naranja mecánica',
  'La conjura de los necios',
  'El ocho',
  'El día del chacal',
  'El club de la lucha',
  'El código Da Vinci',
  'Los pilares de la tierra',
  'La catedral del mar',
  'La sombra del viento',
  'El cementerio de Praga',
  'La cabaña del tío Tom',
  'La llamada de lo salvaje',
  'El señor de las moscas',
  'Matar a un ruiseñor',
  'El nombre de la rosa',
  'La hoguera de las vanidades',
  'Crónicas marcianas',
  'Dune',
  'Fahrenheit 451',
  'La isla misteriosa',
  'La vuelta al mundo en ochenta días',
  'La isla del tesoro',
  'Robinson Crusoe',
  'La Odisea',
  'La Ilíada',
  'Las aventuras de Tom Sawyer',
  'Las aventuras de Huckleberry Finn',
  'El gran Gatsby',
  'Las uvas de la ira',
  'De ratones y hombres',
  'La perla',
  'El amor en los tiempos del cólera',
  'Cien años de soledad',
  'El coronel no tiene quien le escriba',
  'El general en su laberinto',
  'El túnel',
  'La ciudad y los perros',
  'La muerte de Artemio Cruz',
  'Pedro Páramo',
  'El llano en llamas',
  'El extranjero',
  'El proceso',
  'El castillo',
  'La metamorfosis',
  'El jardín de los senderos que se bifurcan',
  'La insoportable levedad del ser',
  'El hombre invisible',
  'La mujer en la ventana',
  'El psicoanalista',
  'El código enigma',
  'La caída de los gigantes',
  'El invierno del mundo',
  'El umbral de la eternidad',
  'El niño con el pijama de rayas',
  'La ladrona de libros',
  'La luz que no puedes ver',
  'El laberinto de los espíritus',
  'La casa de las miniaturas',
  'La caza',
  'La chica de nieve',
  'Un pequeño favor',
  'La chica del tren',
  'El libro de los Baltimore',
  'Un hombre llamado Ove',
  'La verdad sobre el caso Harry Quebert',
  'El psicoanalista',
  'La sombra del viento',
  'El código Da Vinci',
  'Los pilares de la tierra',
  'La catedral del mar',
  'La hoguera de las vanidades',
  'La isla misteriosa',
  'La vuelta al mundo en ochenta días',
  'La isla del tesoro',
  'Robinson Crusoe',
  'La Odisea',
  'La Ilíada',
  'Las aventuras de Tom Sawyer',
  'Las aventuras de Huckleberry Finn',
  'Las uvas de la ira',
  'De ratones y hombres',
  'El nombre de la rosa',
  'La perla',
  'Cien años de soledad',
  'El amor en los tiempos del cólera',
  'El coronel no tiene quien le escriba',
  'Cien años de soledad',
  'El Aleph',
  'Rayuela',
  'La tregua',
  'El amor en los tiempos del cólera',
  'La ciudad y los perros',
  'La casa de los espíritus',
  'Los pasos perdidos',
  'La invención de Morel',
  'La fiesta del chivo',
  'Pedro Páramo',
  'La sombra del viento',
  'El otoño del patriarca',
  'El túnel',
  'El hombre en busca de sentido',
  'El perfume',
  '1984',
  'Fahrenheit 451',
  'Un mundo feliz',
  'Doce cuentos peregrinos',
  'La muerte de Artemio Cruz',
  'Como agua para chocolate',
  'La guerra del fin del mundo',
  'Las batallas en el desierto',
  'Los cachorros',
  'El coronel no tiene quien le escriba',
  'La insoportable levedad del ser',
  'El viejo y el mar',
  'El lobo estepario',
  'El proceso',
  'El castillo',
  'El extranjero',
  'El gran Gatsby',
  'Matar a un ruiseñor',
  'Los miserables',
  'Madame Bovary',
  'La iliada',
  'La odisea',
  'La divina comedia',
  'Hamlet',
  'El rey Lear',
  'Romeo y Julieta',
  'El mercader de Venecia',
  'Orgullo y prejuicio',
  'El retrato de Dorian Gray',
  'Drácula',
  'Frankenstein',
  'El hombre invisible',
  'La isla del tesoro',
  'Robinson Crusoe',
  'Moby Dick',
  'El conde de Montecristo',
  'Los tres mosqueteros',
  'La vuelta al mundo en ochenta días',
  'Viaje al centro de la tierra',
  'Veinte mil leguas de viaje submarino',
  'El principito',
  'Crimen y castigo',
  'Los hermanos Karamazov',
  'Guerra y paz',
  'Anna Karenina',
  'La montaña mágica',
  'Ulises',
  'Dublineses',
  'Retrato del artista adolescente',
  'La inmortalidad',
  'Las olas',
  'La metamorfosis',
  'La náusea',
  'La peste',
  'El extranjero',
  'El túnel',
  'La muerte de Ivan Ilich',
  'El maestro y Margarita',
  'El jugador',
  'El proceso',
  'Cien años de soledad',
  'La hojarasca',
  'El amor en los tiempos del cólera',
  'Crónica de una muerte anunciada',
  'El coronel no tiene quien le escriba',
  'El otoño del patriarca',
  'Los funerales de la Mamá Grande',
  'La vorágine',
  'María',
  'La vorágine',
  'María',
  'El señor presidente',
  'El árbol de la ciencia',
  'Niebla',
  'La Regenta',
  'Fortunata y Jacinta',
  'La familia de Pascual Duarte',
  'El espejo africano',
  'La rebelión de las masas',
  'La deshumanización del arte',
  'Ensayos',
  'El hombre en busca de sentido',
  'Así habló Zaratustra',
  'La genealogía de la moral',
  'El anticristo',
];

// AUTORES

const client = new pg.Client({
  password: 'root',
  user: 'postgres',
  database: 'bibliotecaprog3',
});

client.connect();

console.log('Limpiando tablas...');

console.log("Limpiando tabla 'prestamo_alumno'...");
await client.query('delete from prestamo_alumno');

console.log("Limpiando tabla 'libro'...");
await client.query('delete from libro');

console.log("Limpiando tabla 'autor'...");
await client.query('delete from autor');

console.log("Limpiando tabla 'categorialibro'...");
await client.query('delete from categorialibro');

console.log("Limpiando tabla 'alumno'...");
await client.query('delete from alumno');

console.log('Insertando autores...');
await Promise.allSettled(generateAutores());
console.log('Insertando autores terminado...');

const autores = await client.query('select * from autor');

console.log('Insertando categoria...');
await Promise.allSettled(generateCategoriasLibros());
const categorias = await client.query('select * from categorialibro');

console.log('Insertando alumnos ...');
await Promise.allSettled(generateAlumnos());
const alumnos = await client.query('select * from alumno');

console.log('Insertando libros...');
await Promise.allSettled(generateLibros());
const libros = await client.query('select * from libro');

console.log('Insertando prestamos de libros...');
await Promise.allSettled(generatePrestamos());
const prestamos = await client.query('select * from prestamo_alumno');

console.log('autores creados:', autores.rowCount);
console.log('categorias creados:', categorias.rowCount);
console.log('alumnos creados:', alumnos.rowCount);
console.log('libros creados:', libros.rowCount);
console.log('prestamos creados:', prestamos.rowCount);

function generateAsync(times = 0, fn) {
  const promises = [];
  for (let i = 0; i < times; i++) {
    promises.push(
      new Promise((resolve, reject) => fn(resolve, reject, nanoid(5)))
    );
  }
  return promises;
}

function randomDate(start = new Date(1870, 0, 1), end = new Date(1990, 0, 1)) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateAutor(id) {
  return [
    id,
    faker.name.firstName(),
    faker.name.lastName(),
    randomDate(),
    faker.address.country(),
  ];
}

function generateAutores() {
  return generateAsync(AUTORES, async (resolve, reject, id) => {
    client
      .query(
        'insert into autor (codigoautor,nombreautor,apellidoautor,fechanacimiento,nacionalidad) values ($1,$2,$3,$4,$5)',
        generateAutor(id)
      )
      .then(() => {
        console.log('Autor insertado: ', id);
        resolve();
      })
      .catch(reject);
  });
}

function generateCategoriasLibros() {
  return CATEGORIA_LIBROS.map((categoria) => {
    const id = nanoid(5);
    return new Promise((resolve, reject) => {
      client
        .query(
          'insert into categorialibro (codigocategoria,nombrecategoria) values ($1,$2)',
          [id, categoria]
        )
        .then(() => {
          console.log('Categoria libro insertada: ', id);
          resolve();
        })
        .catch(reject);
    });
  });
}

function generateAlumno(id) {
  return [
    id,
    faker.name.firstName(),
    faker.name.lastName(),
    faker.address.streetAddress(),
    randomDate(new Date(1998, 0, 1), new Date()),
    randomDate(new Date(2003, 0, 1), new Date()),
    ['masculino', 'femenino'][Math.floor(Math.random() * 2)],
    Math.random() < 0.5,
  ];
}

function generateAlumnos() {
  return generateAsync(ALUMNO, async (resolve, reject, id) => {
    client
      .query(
        'insert into alumno (carnet,nombre,apellido,direccion,fechanacimiento,fechaingreso,genero,estado) values ($1,$2,$3,$4,$5,$6,$7,$8)',
        generateAlumno(id)
      )
      .then(() => {
        console.log('Alumno insertado: ', id);
        resolve();
      })
      .catch(reject);
  });
}

function generateLibros() {
  return LIBROS.map((libro) => {
    const id = nanoid(5);
    return new Promise((resolve, reject) => {
      client
        .query(
          'insert into libro (codigolibro,titulolibro,existencia,codigocategoria,precio,codigoautor) values ($1,$2,$3,$4,$5,$6)',
          [
            id,
            libro,
            Math.floor(Math.random() * 10),
            categorias.rows[Math.floor(Math.random() * categorias.rowCount)]
              .codigocategoria,
            Math.floor(Math.random() * 100) + 2,
            autores.rows[Math.floor(Math.random() * autores.rowCount)]
              .codigoautor,
          ]
        )
        .then(() => {
          console.log('Categoria libro insertada: ', id);
          resolve();
        })
        .catch(reject);
    });
  });
}

function generatePrestamo(id) {
  return [
    alumnos.rows[Math.floor(Math.random() * alumnos.rowCount)].carnet,
    libros.rows[Math.floor(Math.random() * libros.rowCount)].codigolibro,
    randomDate(new Date(2020, 0, 1), new Date()),
    Math.random() < 0.5 ? randomDate(new Date(2020, 0, 1), new Date()) : null,
    id,
    Math.floor(Math.random() * 10) + 1,
  ];
}

function generatePrestamos() {
  return generateAsync(PRESTAMO_ALUMNO, async (resolve, reject, id) => {
    client
      .query(
        'insert into prestamo_alumno (carnet_alumno,codigo_libro,fecha_prestamo,fecha_devolucion,codigo_prestamo,cantidadprestamo) values ($1,$2,$3,$4,$5,$6)',
        generatePrestamo(id)
      )
      .then(() => {
        console.log('Prestamo insertado: ', id);
        resolve();
      })
      .catch(reject);
  });
}

await client.end();
