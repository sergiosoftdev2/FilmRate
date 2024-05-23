"use client"

import React, { useState, useEffect } from "react";
import HeaderComponent from "../components/ui/headerComponent/HeaderComponent";
import "./login.css"
import { AuroraBackground } from "../components/ui/aurora-background";
import Link from "next/link";
import { getUserID, userLogInDB } from "../components/db/DB";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function Login({children}:any){

    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter()

    const handleClick = () => {
        userLogin(router)
    }

    useEffect(() => {
        setIsMounted(false);
        if(localStorage.user_id != ""){
            router.push("profile")
        }
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Or a loading spinner
    }

    return(
        <AuroraBackground className="w-[100dvw] h-[100dvh]">

            <HeaderComponent />

            <div className="w-full h-screen flex items-center justify-center flex-col">
                <div className="bg-[#3f3f3f] w-[1000px] h-80 rounded-[20px] flex p-[30px] box-border gap-[20px]">
                    <div className="w-[50%] h-full flex items-center justify-center myTitleWrapper"> 
                        <h1 className="text-[4rem]">FILMRATE</h1>
                    </div>
                    <article className="w-[50%] h-full relative">
                        <div className="w-[100%] flex justify-center flex-col mb-[20px]">
                            <h2 className="text-white text-left text-[1.2rem] mb-[10px]">Username</h2>
                            <input type="text" name="" id="username" className="w-full rounded-[5px] p-1" autoComplete="off"></input>
                        </div>
                        <div className="w-[100%] flex justify-center flex-col">
                            <h2 className="text-white text-left text-[1.2rem] mb-[10px]">Password</h2>
                            <input type="password" id="password" className="w-full rounded-[5px] p-1"></input>
                        </div>
                        <button className="" onClick={handleClick}>Login</button>
                    </article>
                    
                </div>
                <p className="text-white mt-[20px] z-30 text-[1rem]">You dont have an account yet? 
                    <Link href="/register" className="underline ml-[5px] hover:text-gray-400 duration-200">Register Now!</Link>
                </p>
            </div>
        </AuroraBackground>
    )
}

async function userLogin(router:any){

    let username = document.getElementById("username")?.value
    let password = document.getElementById("password")?.value

    let userID;

    if( await userLogInDB(username, password)){
        localStorage.setItem("isLogged", "true")

        getUserID(username).then((res) => {
            userID = res;
            localStorage.setItem("user_id", "" + userID)
        })

        localStorage.setItem("username", username)

        router.push("/profile")
    }else{
        console.log("Como estas")
    }

}