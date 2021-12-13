var config = require("./dbconfig");
const sql = require("mssql");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Users");
    if (products) {
      res.send(products.recordset);
    }
  } catch (e) {
    return e;
  }
};

const addUser = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let existingUser = await pool
      .request()
      .query(
        `SELECT * FROM Users WHERE user_email='${req.body.email}' AND user_type='${req.body.type}'`
      );
    if (existingUser.recordset.length > 0) {
      res.send({ message: "User Already Exist!" });
    } else {
      let hashPass = await bcrypt.hash(req.body.password, 12);
      let query1 = `INSERT INTO Users VALUES ('${req.body.email}','${hashPass}', '${req.body.type}','${req.body.name}')`;
      pool.query(query1, (err) => {
        if (!err) {
          res.send("User successfully added");
        } else {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const authenticateUser = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let authenticate = await pool
      .request()
      .query(
        `SELECT * FROM Users WHERE user_email='${req.body.email}' AND user_type='${req.body.type}'`
      );
    if (authenticate.recordset.length > 0) {
      const checkPass = await bcrypt.compare(
        req.body.password,
        authenticate.recordset[0].user_password
      );
      if (checkPass) {
        res.send({
          message: `You are logged in as ${authenticate.recordset[0].user_type}`,
        });
      } else {
        res.send({ message: "Login Failed!" });
      }
    } else {
      res.send({ message: "No such account exist!" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  authenticateUser: authenticateUser,
};
