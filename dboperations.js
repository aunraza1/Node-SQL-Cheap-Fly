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

const addHotel = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let checkHotel = await pool
      .request()
      .query(
        `SELECT * FROM  Hotels Where hotel_name='${req.body.hotelName}' AND hotel_location='${req.body.hotelLocation}'`
      );
    if (checkHotel.recordset.length > 0) {
      res.send({ message: "Hotel already exist with same name and location!" });
    } else {
      let query1 = `INSERT INTO Hotels VALUES ('${req.body.hotelName}','${req.body.hotelLocation}', '${req.body.hotelImage}','${req.body.userId}')`;
      pool.query(query1, (err) => {
        if (!err) {
          res.send({ messgae: "Hotel Added Successfully" });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const addRooms = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let query1 = `INSERT INTO Room VALUES('${req.body.name}','${req.body.price}','${req.body.hotelId}')`;
    pool.request().query(query1, (err) => {
      if (!err) {
        res.send({ message: "Room Added Successfully!" });
      } else {
        res.send({ error: err });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const showVendorHotels = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let showHotels = await pool
      .request()
      .query(`SELECT * FROM Hotels Where user_id='${req.params.userId}'`);
    if (showHotels.recordset.length > 0) {
      res.send({
        message: "Hotels Found Successfully!",
        data: showHotels.recordset,
      });
    } else {
      res.send({ message: "No Hotels Exist" });
    }
  } catch (e) {
    console.log(e);
  }
};

const showAllHotels = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let showHotels = await pool.request()
      .query(`SELECT  H.hotel_name,H.hotel_location,H.hotel_image, H.hotel_id,R.room_id, R.room_name,R.room_price FROM Hotels as H
      INNER JOIN Room as R
      ON H.hotel_id=R.hotel_id
      `);
    if (showHotels.recordset.length > 0) {
      res.send({
        message: "Hotels Found Successfully!",
        data: showHotels.recordset,
      });
    } else {
      res.send({ message: "No Hotels Exist" });
    }
  } catch (e) {
    console.log(e);
  }
};

const saveHotel = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let checkSaved = await pool
      .request()
      .query(
        `SELECT * FROM Saved Where user_id='${req.body.userId}' AND hotel_id='${req.body.hotelId}'`
      );
    if (checkSaved.recordset.length > 0) {
      res.send({ message: "Hotel Already Saved" });
    } else {
      pool
        .request()
        .query(
          `INSERT INTO Saved VALUES('${req.body.userId}','${req.body.hotelId}','1')`,
          (err) => {
            if (!err) {
              res.send({ message: "Hotel Saved Successfully!" });
            } else {
              res.send({ Error: err });
            }
          }
        );
    }
  } catch (e) {
    console.log(e);
  }
};

const removeSaved = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let query1 = `DELETE FROM Saved Where user_id='${req.body.userId}' AND hotel_id='${req.body.hotelId}'`;

    pool.request().query(query1, (err) => {
      if (!err) {
        res.send({ messgae: "Remove from saved successfully!" });
      } else {
        res.send({ error: err });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const addHotelReview = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let query1 = `INSERT INTO Hotel_Reviews VALUES('${req.body.reviewStars}',${req.body.bookingId})`;
    pool.request().query(query1, (err) => {
      if (!err) {
        res.send({ message: "Review Added Successfully!" });
      } else {
        res.send({ error: err });
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  addHotel: addHotel,
  addRooms: addRooms,
  saveHotel: saveHotel,
  removeSaved: removeSaved,
  addHotelReview: addHotelReview,
  showVendorHotels: showVendorHotels,
  showAllHotels: showAllHotels,
  authenticateUser: authenticateUser,
};
