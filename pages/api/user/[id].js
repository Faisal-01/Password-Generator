import connect from "@/db/connection";
import User from "@/models/user";
import Password from "@/models/password";

export default async function handler(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    case "GET":
      try {
        const user = await User.findById(req.query.id);
        const passwords = await Password.find({ _id: { $in: user.passwordsList } });
        res.status(200).json({ success: true, passwords: passwords });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;

    case "POST":
      try {
        const password = await Password.create(req.body);
        const user = await User.findOneAndUpdate(
          { _id: req.query.id },
          { $push: { passwordsList: password._id } }
        );
        console.log(user)
        res.status(200).json({ success: true, message: "Password added successfully" });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;

    default:
      res.status(500).json({ success: false });
      break;
  }
}
