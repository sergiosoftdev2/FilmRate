"use server";
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

    const res = await client.execute(`SELECT * FROM favorites WHERE user = ${user}`);
    
    const userMovies = res.rows.map((row) => ({
        user: row.user,
        id: row.movie,
        critic: row.critic,
    }));

    return userMovies;
}