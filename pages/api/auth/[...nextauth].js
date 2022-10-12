import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db-util";
import User from "../../../models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found!");
        }

        const valid = await verifyPassword(credentials.password, user.password);

        if (!valid) {
          throw new Error("Invalid credentials!");
        }

        return {
          email: credentials.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
