"use client";

import HeaderComponent, { HeaderComponentBasic } from "../components/ui/headerComponent/HeaderComponent";
import { ProfileFilmCard } from "../components/ui/profileCard/ProfileFilmCard";
import { useState, useEffect } from "react";
import "./profile.css"
import { userFilms } from "../components/db/DB";
import { InfoComponent } from "../components/ui/infoComponent/InfoComponent";

export default function Profile() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
              const userMovies = await userFilms(52);
              setMovies(userMovies);
            } catch (error) {
              console.error("Error fetching movies:", error);
              // Handle errors gracefully (e.g., display an error message to the user)
            }
        };

        fetchData()
    }, [setMovies])

    console.log(movies)

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
                        <h2 className="text-white text-[4rem]">Mi Usuario</h2>
                        <p className="text-[#999] text-[1.2rem]">Esta es la cuenta de prueba de FilmRate, es totalmente ajustable a lo que el usuario quiera pedir</p>
                    </div>
                </section>

                <h1 className="text-white text-[4rem] mb-[20px]">Your Library - {movies.length}</h1>
                <div className="flex flex-wrap gap-[30px] justify-left top-[60%] overloflow-hidden w-full" id="searchEngine">
                    {movies.map((element, index) => {
                        return (
                            <ProfileFilmCard 
                                key={index} 
                                img={"https://image.tmdb.org/t/p/w500" + element.data.poster_path} 
                                title={element.data.title} 
                                desc={element.critic}
                            />
                        );
                    })}
                </div>
            </div>
        
        </>
    )

}