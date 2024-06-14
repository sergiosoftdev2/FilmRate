"use client";

import { HeaderComponentBasic } from "../components/ui/headerComponent/HeaderComponent";
import { ProfileFilmCard } from "../components/ui/profileCard/ProfileFilmCard";
import React, { useEffect, useState } from 'react';
import "./profile.css"
import { userFilms, getUsersLibraryLength } from "../components/db/DB";
import { useRouter } from "next/navigation";
import { InfoComponentProfile } from "../components/ui/infoComponent/InfoComponent";

export default function Profile() {
    const [showInfo, setShowInfo] = useState(false);
    const [data, setData] = useState({
        idnumber: 0,
        title: "",
        image: "",
        description: "",
    });

    const handleShowInfo = (value: any) => {
        setShowInfo(value);
    };

    useEffect(() => {
        let myCards = document.querySelectorAll(".reviewCard");
        myCards.forEach((element) => {
            element.addEventListener("mouseover", () => {
                setData({
                    idnumber: parseInt(element.getAttribute("data-id") as string),
                    title: element.getAttribute("data-title") as string,
                    image: element.getAttribute("data-img") as string,
                    description: element.getAttribute("data-desc") as string,
                })
            })
            element.addEventListener("click", () => {
                setShowInfo(true);
            })
        })

        if (showInfo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    })

    interface Movie {
        data: {
            poster_path: string;
            title: string;
            id: number;
        };
        critic: string;
    }

    const fetchData = async (offset: any) => {
        const userID: number = parseInt(typeof window !== 'undefined' ? window.localStorage.getItem("user_id") as string : "0") ?? 0;
        const userMovies = await userFilms(userID, offset);
        if (userMovies) {
            setMovies(userMovies);
        }
    }

    const firstFetch = async () => {
        const userID: number = parseInt(typeof window !== 'undefined' ? window.localStorage.getItem("user_id") as string : "0") ?? 0;
        const userMovies = await userFilms(userID, offset);
        if (userMovies) {
            setMovies(userMovies);
        }
    }

    const getMoviesLength = async (): Promise<number> => {
        const userID: number = parseInt(typeof window !== 'undefined' ? window.localStorage.getItem("user_id") as string : "0") ?? 0;
        return await getUsersLibraryLength(userID).then((res) => { return res.countmovies });
    }

    const [movies, setMovies] = useState<Movie[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [moviesLength, setMoviesLength] = useState(0);
    const router = useRouter();

    const handleClickLogOut = () => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("isLogged", "false");
            localStorage.removeItem("user_id");
            localStorage.removeItem("username");
            router.push("/login");
        }
    };

    const handleClickLeft = async () => {
        if (offset > 0) {
            setOffset(offset - 8)
            fetchData(offset - 8);
        } else if (offset == 0) {
            setOffset(0)
            fetchData(0)
            UIFix();
            let leftButton = document.getElementById("buttonLeft") as HTMLButtonElement;
            if (leftButton) {
                leftButton.disabled = true;
            }
        }
    }

    const handleClickRight = async () => {
        const length: number = await getMoviesLength();
        if (offset < length - 8) {
            setOffset(offset + 8);
            await fetchData(offset + 8) // Llamar a fetchData con el nuevo offset
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!window.localStorage.getItem("isLogged") || window.localStorage.getItem("isLogged") === "false") {
                router.push("/login");
            } else {
                getMoviesLength().then(setMoviesLength);
                fetchData(offset).then(() => setIsLoading(false));
                setOffset(0);
            }
        }
    }, [router]);

    useEffect(() => {
        UIFix();
    }, [isLoading, setMovies, movies])

    // SKELETON
    if (isLoading) {
        return (
            <>
                <title>My Profile</title>
                <HeaderComponentBasic />
                <div className="bordersProfile">
                    <section className="infoUser">
                        <div className="imgWrapper">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                alt="Profile Pic"
                                className="w-[100%]"
                            />
                        </div>
                        <div>
                            <h2 className="text-white text-[4rem]">{typeof window !== 'undefined' && window.localStorage.username}</h2>
                            <p className="text-[#999] text-[1.2rem]">Esta es la cuenta de prueba de FilmRate, es totalmente ajustable a lo que el usuario quiera pedir</p>
                        </div>
                    </section>
                    <div className="flex w-full">
                        <h1 className="text-white text-[4rem] mb-[20px]">Your Library - {moviesLength}</h1>
                        <div className="flex ml-[auto]">
                            <button
                                className="referenceButton bg-[#3f3f3f] text-white"
                                onClick={handleClickLeft}
                                id="buttonLeft"
                            >&lt;</button>
                            <button
                                className="referenceButton bg-[#3f3f3f] text-white"
                                onClick={handleClickRight}
                            >&gt;</button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-[30px] justify-left top-[60%] overloflow-hidden w-full relative" id="searchEngine">
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                        <div className="loadingCard"></div>
                    </div>
                    <div>
                        <button onClick={handleClickLogOut} className="bg-[#3f3f3f] relative mt-[50px] text-white p-2">Log Out</button>
                    </div>
                </div>
            </>
        );
    }

    else return(
        <>
            {showInfo && <InfoComponentProfile idnumber={data.idnumber} title={data.title} image={data.image} description={data.description} data-review={data.description} setShowInfo={handleShowInfo} showInfo={showInfo} />}
            <title>My Profile</title>
            <HeaderComponentBasic />
            <div className="bordersProfile">
                <section className="infoUser">
                    <div className="imgWrapper">
                        <img 
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
                            alt="Profile Pic" 
                            className="w-[100%]"    
                        />
                    </div>
                    <div className="infoWrapper p-5">
                        <h2>{typeof window !== 'undefined' && window.localStorage.username}</h2>
                        <p>Esta es la cuenta de prueba de FilmRate, es totalmente ajustable a lo que el usuario quiera pedir</p>
                    </div>
                </section>
                <hr className="border-[#5f5f5f] mt-5 mb-5"/>
                <div className="flex w-full items-center justify-center mb-[20px]">
                    <h1 className="library">Your Library - {moviesLength}</h1>
                    <div className="flex ml-[auto]">
                        <button 
                            className="referenceButton bg-[#3f3f3f] text-white"
                            onClick={handleClickLeft}
                            id="buttonLeft"
                        >&lt;</button>
                        <button 
                            className="referenceButton bg-[#3f3f3f] text-white"
                            onClick={handleClickRight}
                        >&gt;</button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-[30px] justify-center top-[60%] overloflow-hidden w-full relative" id="searchEngine">
                    {movies.map((element, index) => (
                        <ProfileFilmCard 
                            key={index} 
                            img={"https://image.tmdb.org/t/p/w500" + element.data.poster_path} 
                            title={element.data.title} 
                            desc={element.critic}
                            id={element.data.id}
                            indexNum={index}
                        />
                    ))}
                </div>
                <div>
                    <button onClick={handleClickLogOut} className="bg-[#3f3f3f] relative mt-[50px] text-white p-2">Log Out</button>
                </div>
            </div>
        </>
    );
}

function UIFix(){
    let searchEngine = document.getElementById("searchEngine");
    let myWidth = searchEngine?.getBoundingClientRect().width
    
    let cards = document.querySelectorAll(".reviewCard");
    let lenght = cards.length;

    cards.forEach((element:any) => {
        let index = parseInt(element.getAttribute("data-index"));
        let info = element.querySelector(".reviewWrapper")

            
        if (!info) {
            console.error(`Element at index ${index} in cards array is missing the .reviewWrapper class`);
            return; // Skip to the next iteration if .reviewWrapper is not found
        }

        info.style.height = "100%";
        
        info.style.width = myWidth + "px";
        info.style.left = "-" + element.offsetLeft + "px";
        if(index >= 0 && index <=3){
            info.classList.add("bottomWrapper");
            info.style.height = "110%";
        }else{
            info?.classList.add("topWrapper")
            
            info.style.top = "-" + (element.offsetTop) + "px"; 
        }

    })
}