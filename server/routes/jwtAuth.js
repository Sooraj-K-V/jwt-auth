import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("user exist");
    }

    // bcrypt

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //console.log(bcryptPassword);

    // enter new user
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING user_id",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 ",
      [email]
    );

    if (user.rows.length === 0) {
      console.log("No user");
    } else {
      const isMatch = await bcrypt.compare(password, user.rows[0].user_password);
      if (isMatch) {
        res.json("correct password");
      } else {
        res.json("wrong password");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// change password
router.post("/change-password", async (req, res) => {
  try {
    //const {}
  } catch (error) {
    console.error(error.message);
    res.status(500).status("server error")
  }
})

export default router;
