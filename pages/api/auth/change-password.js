import { unstable_getServerSession } from "next-auth/next";
import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db-util";
import User from "../../../models/user";
import { authOptions } from "./[...nextauth]";

export async function handler(req, res) {
  if (req.method === "PATCH") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send({ message: "Not authenticated!" });
    }

    const email = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    await connectToDatabase();
    const user = await User.findOne({ email });

    const passwordMatch = await verifyPassword(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(403).send({ message: "Passwords don't match" });
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    return res.send({ message: "Password updated!" });
  }

  return res.status(405).send({ message: "Operation not permitted!" });
}

export default handler;
