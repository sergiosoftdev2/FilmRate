"use client";
import Link from "next/link";
import "./header.css"
import { Inter } from "next/font/google"

const abeeZee = Inter({
  weight: ["800", "500"], // Puedes especificar el peso si hay varias opciones
  subsets: ["latin"], // Subconjuntos que necesitas
});

import accountSVG from "/public/account.svg";
import { useEffect } from "react";

export default function HeaderComponent() {

  useEffect(() => {

    window.addEventListener("scroll", () => {
      if(window.scrollY > 200){
        document.getElementById("headerComponent")?.classList.add("moved");
      }else{
        document.getElementById("headerComponent")?.classList.remove("moved");
      }
    })
  });

  return (
    <div className={`flex justify-between fixed top-0 w-full box-border
    zindex items-center text-white border-radius-[10px] ${abeeZee.className} p-2`} id="headerComponent">
      <div className="flex items-center">
        <Link href="/" className="referenceButton">Home</Link>
        <Link href="/search" className="referenceButton">About</Link>
        <Link href="/search" className="referenceButton">Search</Link>
      </div>
      <div>
        <Link href="/profile">
          <div className="referenceButton">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#FFFFFF">   
              <defs>
                <style>
                {`.cls-6374f8d9b67f094e4896c670-1{fill:none;stroke:currentColor;stroke-miterlimit:10;}`}
                </style>
                </defs>
                <circle className="cls-6374f8d9b67f094e4896c670-1" cx="12" cy="7.25" r="5.73"></circle>
                <path className="cls-6374f8d9b67f094e4896c670-1" d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}