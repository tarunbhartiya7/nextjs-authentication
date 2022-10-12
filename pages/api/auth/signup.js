import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db-util";
import User from "../../../models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password || !email.includes("@") || password.length < 3) {
      return res.status(422).send({ message: "Invalid credentials!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send({ message: "User already exists!" });
    }

    const hashedPassword = await hashPassword(password);

    await connectToDatabase();
    await User.create({ email, password: hashedPassword });

    return res.status(201).send({ message: "Signed up!" });
  }
}
