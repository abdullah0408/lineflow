// "use client";

// import React, { createContext, ReactNode, useEffect, useState } from "react";
// import { User as PrismaUser } from "@prisma/client";
// import { useUser } from "@clerk/nextjs";
// import { getUserDetails } from "@/lib/getUserDetails"; 

// // Define the type for the AuthContext value
// interface AuthContextType {
//   userDetails: PrismaUser | null; // Holds the details of the authenticated user
//   // isLoading: boolean; // Indicates whether user details are still being fetched
//   // isSignedIn: boolean | undefined; // Indicates whether the user is signed in
//   // isLoaded: boolean | undefined; // Indicates whether the user details are fully loaded
// }

// // Create the AuthContext with an initial value of undefined
// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode; // ReactNode to render all child components
// }

// /**
//  * AuthProvider component
//  * - Fetches user details and provides them via AuthContext.
//  * - Ensures loading state while the data is being fetched.
//  */
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   // State to store the authenticated user's details
//   const [userDetails, setUserDetails] = useState<PrismaUser | null>(null);
//   // State to manage the loading indicator for fetching user details
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetches the current user status from Clerk
//   const { isSignedIn, user, isLoaded } = useUser();
//   console.log(isSignedIn, user, isLoaded); // Log user status to check if they are fetched properly

//   /**
//    * Fetches the authenticated user's details from Clerk and Prisma.
//    * - Uses Clerk's `currentUser` to get the user session.
//    * - Queries Prisma to fetch the user's full details from the database.
//    */
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         if (isLoaded && isSignedIn && user) {
//           const fetchedUserDetails = await getUserDetails(user.id);
//           // console.log(fetchedUserDetails); // Log user details to check if they are fetched properly
//           setUserDetails(fetchedUserDetails);
//         } else {
//           setUserDetails(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         setUserDetails(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // console.log(isSignedIn, user, isLoaded); // Log user status to check if they are fetched properly
//     fetchUserDetails();
//   }, [isSignedIn, user, isLoaded]);
//    // Depend on user sign-in and loading states

//   return (
//     /**
//      * Provide the `userDetails`, `isLoading`, `isSignedIn`, and `isLoaded` states to the entire app via context.
//      * - Allows child components to access the authenticated user's details.
//      * - Useful for conditional rendering based on the loading state or user info.
//      */
//     <AuthContext.Provider value={{ userDetails }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };