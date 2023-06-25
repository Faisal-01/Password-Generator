import connect from "@/db/connection";
import Password from "@/models/password";
import User from '@/models/user';

export default async function handler(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    
    case "PATCH":
      try {
        const user = await User.findOneAndUpdate({_id: req.body.userId}, {$pull: {passwordsList: req.query.id}});
        
        const password = await Password.findByIdAndDelete(req.query.id);

        res.status(200).json({ success: true, message: "Password Deleted Successfully" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
