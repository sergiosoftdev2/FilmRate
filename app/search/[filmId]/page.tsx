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
    const [rating, setRating] = useState(5);

    useEffect(() => {
        getMovie(params.filmId).then((jsonmovie) => {
            setMovie(jsonmovie);
            console.log(jsonmovie)
        })
    }, [params.filmId])

    useEffect(() => {
        const ratingSlider = document.getElementById("ratingSlider") as HTMLInputElement;
        ratingSlider.addEventListener("input", () => {
            setRating(ratingSlider.valueAsNumber);
        });

    });

    const handleClick = () => {
        const textReviewElement = document.getElementById("textReview") as HTMLTextAreaElement;
        if(localStorage.getItem("user_id")){
            let response = insertFilm(parseInt(localStorage.getItem("user_id") as string), params.filmId, textReviewElement.value, rating)
                .then((serverResponse) => {
                    if(serverResponse == true){
                        console.log("Added to library")
                    }else{
                        let errorMessage = document.getElementById("errorMessage") as HTMLParagraphElement;
                        errorMessage.innerText = "Error: You already have this movie in your library";
                    }
                })

        }
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
                    <h2>Write your Review: </h2>
                    <textarea name="" id="textReview" className="bg-[#3f3f3f] border-none w-full rounded-[10px] p-4 mt-[20px] text-white" placeholder="Write a review..."></textarea>
                    <div className="ratingNumberWrapper">
                        <div className="ratingNumber">
                            <h3>Rating: </h3>
                            <input type="range" name="rating" min="0" max="10" step="0.1" className="ratingSlider" id="ratingSlider"/>
                        </div>
                        <div className="ratingTextWrapper">
                            <h2 className="ratingText">{rating}</h2>
                        </div>
                    </div>
                    <p id="errorMessage" className="text-[#f00] text-[1.2rem] m-0 mt-[20px]"></p>
                    <button className="addToLibraryButton" onClick={handleClick}>Add to Library</button>
                </div>
                
            </div>
        </>
        
    );
}