const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'database_development'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexi�n:', err);
  } else {
    console.log('? Conexi�n exitosa a MySQL');
  }
  connection.end();
});
