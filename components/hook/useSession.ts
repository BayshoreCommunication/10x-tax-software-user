// "use client";
// import { auth } from "@/auth";
// import { useEffect, useState } from "react";

// export const useSession = () => {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const sessionData = await auth();
//         setSession(sessionData);
//       } catch (error) {
//         console.error("Failed to fetch session:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSession();
//   }, []);

//   return { session, loading };
// };
