import mysql from 'mysql';

const db = mysql.createPool({
  host: 'localhost',
  user: 'easyfsr',
  password: 'admin',
  database: 'easyfsr',
});

db.getConnection((err, connection) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Database is connected');
  }
});

db.on('connection', connection => {
  connection.config.queryFormat = function(query, values) {
    if (!values) return query;

    if (Array.isArray(values)) {
      let offset = 0;

      return query.replace(
        /(\?{1,2})/g,
        function(text, match) {
          offset++;

          if (offset > values.length) return text;

          if (match.length === 2) return this.escapeId(values[offset - 1]);
          else return this.escape(values[offset - 1]);
        }.bind(this),
      );
    } else {
      const escaped = query.replace(
        /\:(\w+)/g,
        function(text, key) {
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
          }

          return text;
        }.bind(this),
      );

      return escaped.replace(
        /\[(\w+)\]/g,
        function(text, key) {
          if (values.hasOwnProperty(key)) {
            return this.escapeId(values[key]);
          }

          return text;
        }.bind(this),
      );
    }
  };

  connection.query('USE easyfsr');
});

export default db;
