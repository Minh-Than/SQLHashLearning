const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

app.post('/register', (req, res) => {
  const POST_REG_QUERY = `INSERT INTO LoginSystem.users (username, password) VALUES (?,?)`;
  const salt = bcryptjs.genSaltSync(10);
  const hashedPass = bcryptjs.hashSync(req.body.password, salt);
  const regParam = [req.body.username, hashedPass];

  db.query(POST_REG_QUERY, regParam, (err) => {
    if (err) {
      res.send('Failed to register.');
    } else {
      res.send('Register succeeded.');
    }
  });
});

app.post('/login', (req, res) => {
  const POST_LOGIN_QUERY = `SELECT * FROM LoginSystem.users WHERE username = ?`;
  const logParam = [req.body.username];

  db.query(POST_LOGIN_QUERY, logParam, (err, result) => {
    if (err) {
      res.send('Failed to login.');
    }
    if (result.length > 0) {
      const isValid = bcryptjs.compareSync(
        req.body.password,
        result[0].password
      );
      if (isValid) {
        res.send({ message: 'Login successful', bool: true });
      } else {
        res.send({ message: 'Wrong username/passwordl', bool: false });
      }
    } else {
      res.send({ message: 'Wrong username/passwordl', bool: false });
    }
  });
});

app.listen(3001, () => {
  console.log('running on port 3001');
});
