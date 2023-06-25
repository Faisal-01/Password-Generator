import connect from "@/db/connection";
import User from "@/models/user";

export default async function handler(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    
    case "POST":
    
      try {
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            res.status(400).json({ success: false, message: "User not found" })
            return;
        }
        if(user.password === req.body.password){
            
            res.status(200).json({ success: true, message: "Login Successfully", userID: user._id })
        }
        else{
            res.status(400).json({ success: false, message: "Invalid credentials" })
        }
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;

    default:
      res.status(500).json({ success: false });
      break;
  }
}
