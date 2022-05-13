import express from "express"
import {body, validationResult} from "express-validator"
import User from "../models/user"


const router = express.Router()

router.post("/userInfo", 
    body("id"), 
    async (req, res) => {
    
    const { id } = req.body;
    const userInfo = await User.findOne({ "_id" : id });

    if (!userInfo) {
      return res.json({
        errors: [
          {
            msg: "User does not exists",
          },
        ],
        data: null,
      });
    }
    return res.json(userInfo);
});


router.get("/user", async (req, res) => {
  const users = await User.find({ });
  return res.json(users);
});

export default router