import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("No user found with the username");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id,
          fname: user.firstName,
          lname: user.lastName,
          name: user.username,
          email: user.email,
          image: "",
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.sub = user.id; // Ensure id is set
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub; // Ensure the user's id is saved in the session
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Optional: Define your own sign-in page
  },
});
