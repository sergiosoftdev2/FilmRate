"use server";
import { getMovie } from "../../search/searchEngine";
import { createClient } from "@libsql/client";

const client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_KEY,
})

export async function selectUsers(){
    const res = await client.execute("SELECT * FROM users");
    console.log(res.rows[0].user_id);
}

export async function insertFilm(user:number, id:number, review:string){
    const res = await client.execute(`INSERT INTO favorites (user, movie, critic) VALUES (${user}, ${id}, '${review}')`);
    console.log(res);
}

export async function userFilms(user:number){ 

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTYyNGQ2MTZiMDYxMGQ5ZmMxNjRhZWRjM2U5NmVkMyIsInN1YiI6IjY2MDBjMmU5MDQ3MzNmMDE3ZGVlMjQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q4pgDjqoPU5SiD30QTNHU_oC6heI0jM0iJ3XtvsMiEM'
        }
    };

    let movies:any = []
    let moviesData = []

    const res = await client.execute(`SELECT * FROM favorites WHERE user = ${user}`);
    
    res.rows.forEach((myMovie) => {
        const movieData = {
            data: myMovie.movie,
            critic: myMovie.critic
        }
        movies.push(movieData)

    })

    for (const element of movies) {

        const url = `https://api.themoviedb.org/3/movie/${element.data}?language=en-US`

        try {
            const res = await fetch(url, options);
            const json = await res.json();
            const movieData = {
                data: json,
                critic: element.critic
            }
            moviesData.push(movieData)
        } catch (err) {
            console.error('error:' + err);
            return null; // Retorna null en caso de error
        }
    }

    return moviesData
}