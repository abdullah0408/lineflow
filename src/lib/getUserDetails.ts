// "use server";
// import {prisma} from "@/lib/prisma";

// export const getUserDetails = async (userId: string) => {
//   try {
//     const userDetails = await prisma.user.findUnique({
//       where: { id: userId }
//     });

//     return userDetails;
//   } catch (error) {
//     console.error("Error fetching user details:", error);

//     return null;
//   }
// };