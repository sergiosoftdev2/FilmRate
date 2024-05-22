import { removeAllListeners } from "process";
import { useEffect, useState, useRef, use } from "react";


// TO GET MOVIES FROM API
export function search(setCards:any, addCard:any, cards:any){
    // SEARCH MOVIES
    useEffect(() => {

      const search = document.getElementById("search");

      const handleKeyUp = async (e:any) => {

        if (e.key) {
          setCards([]);

          if (search?.value !== "") {
            try {
              const res = await getMovies(search.value);
              console.log(res)              
              res.results.forEach((movie:any) => {
                const image = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                const name = movie.title;
                const id = movie.id;
                const description = movie.overview;
                if(movie.poster_path != null){
                  addCard(id, name, image, description);
                }
                
              });
            } catch (err) {
              console.error('error:', err);
            }
          }
        }
        
      };

      search?.addEventListener("keyup", handleKeyUp);

      // Remover el event listener al desmontar el componente
      return () => {
        search?.removeEventListener("keyup", handleKeyUp);
      };
    }, [cards]);
}

export function searchPopular(setCards:any, addCard:any, cards:any, isFirstRender:any){
  useEffect(() => {
    const searchWrappe = document.getElementById("SearchWrapper");
    const mySearch = document.getElementById("search");
    const title = document.getElementById("title");

    mySearch?.addEventListener("keyup", (e:any) => {
      if(mySearch?.value !== "" && e.key === "Enter"){
        searchWrappe?.classList.add("searchFocus");
        title?.classList.add("remove");
      }else if(mySearch?.value === ""){
      }else{
        searchWrappe?.classList.remove("searchFocus");
        title?.classList.remove("remove");
      }
    });

    const popularMovies = async () => {
      setCards([])
      const res = await getPopularMovies();
      if (res && res.results) {
        res.results.forEach((movie:any) => {
          const image = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          const name = movie.title;
          const id = movie.id;
          const description = movie.overview;
          if (movie.poster_path != null) {
            addCard(id, name, image, description);
          }
        });
      }
    };

    if (isFirstRender.current) {
      popularMovies();
      isFirstRender.current = false; // Marcar que ya no es la primera renderización
    }

  }, []);
}

async function getMovies(name: string){
  const fetch = require('node-fetch');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTYyNGQ2MTZiMDYxMGQ5ZmMxNjRhZWRjM2U5NmVkMyIsInN1YiI6IjY2MDBjMmU5MDQ3MzNmMDE3ZGVlMjQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q4pgDjqoPU5SiD30QTNHU_oC6heI0jM0iJ3XtvsMiEM'
    }
  };
  
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('error:' + err);
    return null; // Retorna null en caso de error
  }
}

async function getPopularMovies(){

  const fetch = require('node-fetch');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTYyNGQ2MTZiMDYxMGQ5ZmMxNjRhZWRjM2U5NmVkMyIsInN1YiI6IjY2MDBjMmU5MDQ3MzNmMDE3ZGVlMjQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q4pgDjqoPU5SiD30QTNHU_oC6heI0jM0iJ3XtvsMiEM'
    }
  };

  const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error('error:' + err);
    return null; // Retorna null en caso de error
  }

}
