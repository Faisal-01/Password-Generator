import connect from "@/db/connection";
import Password from '@/models/password'

export default async function handler(req, res) {
  const { method } = req;

  await connect();

  switch (method) {
    case "GET":
      try {
        const password = await Password.find({});
        res.status(200).json(password);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const password = await Password.create(req.body);
        res.status(200).json({ success: true, data: password });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
