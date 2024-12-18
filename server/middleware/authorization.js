import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
export default async (req, res) => {
  try {
    const jwtToken = req.header("token");

    if(!jwtToken){
        return res.status(403).send("you are not authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
  } catch (error) {
    console.error(error.message);
    return res.status(403).send("you are not authorized");
  }
};
