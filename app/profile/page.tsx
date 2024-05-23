"use client";

import HeaderComponent, { HeaderComponentBasic } from "../components/ui/headerComponent/HeaderComponent";
import { ProfileFilmCard } from "../components/ui/profileCard/ProfileFilmCard";
import { useState, useEffect, use} from "react";
import "./profile.css"
import { userFilms } from "../components/db/DB";
import { useRouter } from "next/navigation";
import ColorThief from "colorthief";

export default function Profile() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const handleClickLogOut = () => {
        localStorage.setItem("isLogged", "false");
        router.push("/login");
    };

    useEffect(() => {
        if (!localStorage.getItem("isLogged") || localStorage.getItem("isLogged") === "false") {
            router.push("/login");
        } else {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const userMovies = await userFilms(localStorage.getItem("user_id"));
                    setMovies(userMovies);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            };
            fetchData();
        }

    }, [router]);

    useEffect(() => {
        UIFix();
    }, [isLoading])

    if (isLoading) return (<></>);
    return(
        <>
            <HeaderComponentBasic />
            <div className="w-[1000px] overflow-hidden ml-[auto] mr-[auto] bordersProfile">
                <section className="w-full flex gap-[50px] items-center justify-left">
                    <div className="w-[25%]">
                        <img 
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
                            alt="Profile Pic" 
                            className="w-[100%] rounded-[50px] p-5"    
                        />
                    </div>
                    <div>
                        <h2 className="text-white text-[4rem]">{localStorage.username}</h2>
                        <p className="text-[#999] text-[1.2rem]">Esta es la cuenta de prueba de FilmRate, es totalmente ajustable a lo que el usuario quiera pedir</p>
                    </div>
                </section>
                <h1 className="text-white text-[4rem] mb-[20px]">Your Library - {movies.length}</h1>
                <div className="flex flex-wrap gap-[30px] justify-left top-[60%] overloflow-hidden w-full relative" id="searchEngine">
                    {movies.map((element, index) => (
                        <ProfileFilmCard 
                            key={index} 
                            img={"https://image.tmdb.org/t/p/w500" + element.data.poster_path} 
                            title={element.data.title} 
                            desc={element.critic}
                            indexNum={index}
                        />
                    ))}
                </div>
                <div>
                    <button onClick={handleClickLogOut} className="bg-[#3f3f3f] relative mt-[50px] text-white p-2">Log Out</button>
                </div>
            </div>
            <script src="https://unpkg.com/fast-average-color/dist/index.browser.min.js"></script>
        </>
    );
}

function UIFix(){
    let searchEngine = document.getElementById("searchEngine");
    let myWidth = searchEngine?.getBoundingClientRect().width
    
    let cards = document.querySelectorAll(".reviewCard");
    cards.forEach((element) => {
        let index = parseInt(element.getAttribute("data-index"));
        let info = element.querySelector(".reviewWrapper")

        if (!info) {
            console.error(`Element at index ${index} in cards array is missing the .reviewWrapper class`);
            return; // Skip to the next iteration if .reviewWrapper is not found
        }

        info.style.height = "100%";
        
        info.style.width = myWidth + "px";
        info.style.left = "-" + element.offsetLeft + "px";
        if(index >= 0 && index <=3 ){
            info.classList.add("bottomWrapper");
            info.style.height = "110%";
        }else{
            info?.classList.add("topWrapper")
            
            info.style.top = "-" + (element.offsetTop) + "px"; 
        }

    })
}