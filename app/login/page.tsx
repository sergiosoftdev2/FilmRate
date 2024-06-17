"use client";

import React, { useState, useEffect } from "react";
import HeaderComponent from "../components/ui/headerComponent/HeaderComponent";
import "./login.css";
import { AuroraBackground } from "../components/ui/aurora-background";
import Link from "next/link";
import { getUserID, userLogInDB } from "../components/db/DB";
import { useRouter } from "next/navigation";

export default function Login({ children }: any) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (await userLogInDB(username, password)) {
      localStorage.setItem("isLogged", "true");
      const userID = await getUserID(username);
      localStorage.setItem("user_id", userID);
      localStorage.setItem("username", username);
      router.push("/profile");
    } else {
      console.log("Invalid login credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      router.push("/profile");
    }
    setIsMounted(true);
  }, [router]);

  if (!isMounted) {
    return null; // O un spinner de carga
  }

  return (
    <AuroraBackground className="w-[100dvw] h-[100dvh]">
      <title>Login | FilmRate</title>
      <HeaderComponent />
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <div className="bg-[#3f3f3f] recuadro rounded-[20px] flex p-[30px] box-border gap-[20px]">
          <div className="flex items-center justify-center myTitleWrapper">
            <h1 className="">FILMRATE</h1>
          </div>
          <article className="relative myFormWrapper">
            <div className="w-[100%] flex justify-center flex-col mb-[20px]">
              <h2 className="text-white text-left text-[1.2rem] mb-[10px]">Username</h2>
              <input type="text" id="username" className="w-full rounded-[5px] p-1" autoComplete="off"></input>
            </div>
            <div className="w-[100%] flex justify-center flex-col">
              <h2 className="text-white text-left text-[1.2rem] mb-[10px]">Password</h2>
              <input type="password" id="password" className="w-full rounded-[5px] p-1"></input>
            </div>
            <button onClick={handleClick} className="myLoginButton">Login</button>
          </article>
        </div>
        <p className="text-white mt-[20px] z-30 text-[1rem] p-[20px]">You don&apos;t have an account yet?
          <Link href="/register" className="underline ml-[5px] hover:text-gray-400 duration-200">Register Now!</Link>
        </p>
      </div>
    </AuroraBackground>
  );
}
