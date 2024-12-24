'use client'
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";
export default function Home() {

  const user = useUser()
  const createUser = useMutation(api.user.createUser)

  console.log(user);
  console.log(user?.user?.primaryEmailAddress?.emailAddress)

  useEffect(()=>{
     user&&checkUser()
  },[user])
  

   const checkUser = async () => {
      const result = await createUser({
         email: user?.user?.primaryEmailAddress?.emailAddress ?? "unknown",
         userName: user?.user?.fullName ?? "unknown",
         imageUrl:user?.user?.imageUrl ?? "unknown"
         
      })
      console.log(result);
   }
 
  

  return (
   <div>
    <h1>Pdf note Taker </h1>
    <p>Hello world</p>
   </div>
  );
}
