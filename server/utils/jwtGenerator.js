import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id,
  };

  jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});

}

export default jwtGenerator;