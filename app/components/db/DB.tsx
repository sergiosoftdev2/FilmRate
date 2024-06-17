"use server";
import { getMovie } from "../../search/searchEngine";
import { createClient } from "@libsql/client";

const client = createClient({
    url: process.env.DB_URL as string,
    authToken: process.env.DB_KEY as string,
})

export async function selectUsers(){
    const res = await client.execute("SELECT * FROM users");
}

export async function insertFilm(user:number, id:number, review:string, rate:number){

    

    try{
        const res = await client.execute(`INSERT INTO favorites (user, movie, rate, critic) VALUES (${user}, ${id}, ${rate}, '${review}')`);
        return true;
    }catch(err){
        return false
    }
}

export async function userFilms(user:number, offset:number){ 

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTYyNGQ2MTZiMDYxMGQ5ZmMxNjRhZWRjM2U5NmVkMyIsInN1YiI6IjY2MDBjMmU5MDQ3MzNmMDE3ZGVlMjQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q4pgDjqoPU5SiD30QTNHU_oC6heI0jM0iJ3XtvsMiEM'
        }
    };

    let movies:any = []
    let moviesData = []

    const res = await client.execute({
        sql: "SELECT * FROM favorites WHERE user = ? LIMIT 8 OFFSET ?",
        args: [user, offset]
    });
    
    res.rows.forEach((myMovie) => {
        const movieData = {
            data: myMovie.movie,
            critic: myMovie.critic as string
        }
        movies.push(movieData)

    })

    for (const element of movies) {

        const url = `https://api.themoviedb.org/3/movie/${element.data}?language=en-US`

        try {
            const res = await fetch(url, options);
            const json = await res.json();
            const movieData = {
                data: json as { poster_path: string; title: string, id:number },
                critic: element.critic as string
            }
            moviesData.push(movieData)
        } catch (err) {
            return null; // Retorna null en caso de error
        }
    }

    return moviesData
}

// LOG IN

export async function userLogInDB(user:string, pass:string){

    try{
        const res = await client.execute({
            sql: `SELECT username, psswd FROM users WHERE username = ?`, 
            args: [user]
        });

        if(res.rows[0].username == user && res.rows[0].psswd == encrypt(pass)){
            return true
        }
    }catch(err){
        return false   // Handle errors gracefully (e.g., display an error message to the user)
    }
}

// REGISTER

export async function userRegister(user:string, pass:string){

    const resCount = await countUsers()

    try{
        const res = await client.execute({
            sql: `INSERT INTO users VALUES (?, ?, ?)`,
            args: [resCount.countmovies, user, encrypt(pass)]
        }).then(() => {
            userLogInDB(user, pass)
        })

        return true

    }catch(err){
        return false   // Handle errors gracefully (e.g., display an error message to the user)
    }

    

}

export async function countUsers(){
    const res = await client.execute("SELECT COUNT(username) as countmovies FROM users")
    return res.rows[0]
}

export async function getUserID(username:string): Promise<string>{
    const res = await client.execute({
        sql: "SELECT user_id FROM users WHERE username = ?",
        args: [username]
    })
    return "" + res.rows[0].user_id
}

export async function getUsersLibraryLength(user_id:number): Promise<any>{
    const res = await client.execute({
        sql: "SELECT COUNT(user) as countmovies FROM favorites WHERE user = ?",
        args: [user_id]
    })
    return res.rows[0]
}

// ENCRYPT PASSWORDS

function encrypt(password: string){
    var crypto = require('crypto');
    var name = password;
    var hash = crypto.createHash('sha256').update(name).digest('hex');

    return hash

}