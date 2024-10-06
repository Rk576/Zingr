// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import authOptions from "./options"; // Import authOptions from the options file

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler as GET and POST
export { handler as GET, handler as POST };
