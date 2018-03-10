import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'easyfsr',
  password: 'admin',
  db: 'easyfsr',
});

db.on('ready', () => console.log('Database is connected')).on('error', err => {
  console.log('Error in connecting to database');
  console.log(err.message);
});

db.connect(err => {
  if (err) {
    console.log('Error in connecting to database');
    console.log(err.message);
  } else {
    console.log('Database is connected');
  }
});

db.query('USE easyfsr');

export default db;
