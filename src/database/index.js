import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'fsrmgtsys',
  password: 'admin',
  db: 'fsrmgtsys',
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

db.query('USE fsrmgtsys');

export default db;
