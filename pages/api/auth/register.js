import connect from "@/db/connection";
import User from "@/models/user";

export default async function handler(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(200).json({ success: true, message: "User created successfully" });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "User not created" });
      }
      break;

    default:
      res.status(500).json({ success: false, message: "Something went wrong" });
      break;
  }
}
