"use client";

import HeaderComponent from "../components/ui/headerComponent/HeaderComponent";
import { ProfileFilmCard } from "../components/ui/profileCard/ProfileFilmCard";
import { useState, useEffect } from "react";
import "./profile.css"
import { userFilms } from "../components/db/DB";

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
    }, [])

    console.log("Movies in component state:", movies);

    return(
        <>
        
            <HeaderComponent />
            <div className="mt-[100px] ml-[auto] mr-[auto] flex flex-col items-center justify-center gap-5 w-[50%]">
                <h1 className="">Library</h1>
                {movies.map((movie, index) => (
                    <ProfileFilmCard
                        key={index}
                        title={movie.user} 
                        desc={movie.critic} 
                    />
                ))}
            </div>
        
        </>
    )

}