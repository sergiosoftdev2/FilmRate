"use client"

import { HeaderComponentBasic } from "@/app/components/ui/headerComponent/HeaderComponent";
import "./page.css"
import { getMovie } from "../searchEngine";
import { useEffect, useState } from "react";
import { insertFilm } from "@/app/components/db/DB";

export default function FilmPage({ params }: {
    params: {
        filmId: number;
    }
}) {

    interface Movie{
        title: string;
        overview: string;
        poster_path: string;
        vote_average: number;
    }

    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        getMovie(params.filmId).then((jsonmovie) => {
            setMovie(jsonmovie);
            console.log(jsonmovie)
        })
    }, [params.filmId])

    const handleClick = () => {
        const textReviewElement = document.getElementById("textReview") as HTMLTextAreaElement;
        if(localStorage.getItem("user_id")){
            insertFilm(parseInt(localStorage.getItem("user_id") as string), params.filmId, textReviewElement.value);
        }
        console.log(textReviewElement.value)
    }
    
    return(
        <>
            <HeaderComponentBasic />
            <div className="wrapperInfoMovie">
                <div className="infoContainerMovie">
                    <div className="imgWrapperMovie">
                        { movie ? (
                            <img src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path} alt="imagen" />
                        ): (
                            <div className="imageLoader"></div>
                        )}
                    </div>
                    <div className="infoBoxMovie">
                        {movie ? (
                            <>
                                <title>{movie.title + " | FilmRate"}</title>
                                <div className="informationWrapper">
                                    <h1>{movie.title}</h1>
                                    <p>{movie.overview}</p>
                                </div>
                                <div className="voteWrapper">
                                    <h2>{movie.vote_average}</h2>
                                </div>
                            </>
                        ): (
                            <>
                                <div className="titleLoader"></div>
                                <div className="descriptionLoader"></div>
                                <div className="buttonLoader"></div>
                            </>
                        )}
                        
                    </div>
                </div>
                <div className="ratingWrapper">
                    <h2>Rating</h2>
                    <textarea name="" id="textReview" className="bg-[#3f3f3f] border-none w-full rounded-[10px] p-4 mt-2 text-white" placeholder="Write a review..."></textarea>
                    <button className="addToLibraryButton" onClick={handleClick}>Add to Library</button>
                </div>  
                
            </div>
        </>
        
    );
}