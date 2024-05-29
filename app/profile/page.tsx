"use client";

import { HeaderComponentBasic } from "../components/ui/headerComponent/HeaderComponent";
import { ProfileFilmCard } from "../components/ui/profileCard/ProfileFilmCard";
import { useState, useEffect} from "react";
import "./profile.css"
import { userFilms, getUsersLibraryLength } from "../components/db/DB";
import { useRouter } from "next/navigation";

export default function Profile() {
    
    interface Movie {
        data: {
            poster_path: string;
            title: string;
        };
        critic: string;
    }

    const fetchData = async (offset:any) => {
        const userID:number = parseInt(localStorage.getItem("user_id") as string);
        const userMovies = await userFilms(userID, offset);
        if(userMovies){
            setMovies(userMovies);
        }
        
    }

    const firstFetch = async () => {
        const userMovies = await userFilms(parseInt(localStorage.getItem("user_id") as string), offset);
        if(userMovies){
            setMovies(userMovies);
        }
    }

    const getMoviesLength = async (): Promise<number> => {
        return await getUsersLibraryLength(parseInt(localStorage.getItem("user_id") as string)).then((res) => {return res.countmovies});
    }

    const [movies, setMovies] = useState<Movie[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [moviesLength, setMoviesLength] = useState(0);
    const router = useRouter();

    const handleClickLogOut = () => {
        localStorage.setItem("isLogged", "false");
        router.push("/login");
    };

    const handleClickLeft = async () => {

        if(offset > 0){
            setOffset(offset - 8)
            fetchData(offset - 8);
        }else if(offset == 0){
            setOffset(0)
            fetchData(0)
            UIFix();
            let leftButton = document.getElementById("buttonLeft") as HTMLButtonElement;
            if(leftButton){
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
        if (!localStorage.getItem("isLogged") || localStorage.getItem("isLogged") === "false") {
            router.push("/login");
        } else {
            getMoviesLength().then((length) => setMoviesLength(length));
            firstFetch().then(() => setIsLoading(false));
            setOffset(0);
        }

    }, [router]);

    useEffect(() => {
        UIFix();
    }, [isLoading, setMovies, movies])

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