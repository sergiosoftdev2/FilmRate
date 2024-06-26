"use client";

import { useEffect, useState, useRef } from "react";
import { SearchMyMovies, SearchPopular } from "./searchEngine";
import HeaderComponent from "../components/ui/headerComponent/HeaderComponent"
import "./page.css"
import { Playfair_Display } from "next/font/google";
import { SearchCards } from "../components/ui/searchCards/SearchCards";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  weight: ["800", "500"], // Puedes especificar el peso si hay varias opciones
  subsets: ["latin"], // Subconjuntos que necesitas
});

export default function Search() {

  interface Card {
    id: number;
    name: string;
    image: string;
    description: string;
  }

  const [data, setData] = useState({
    idnumber: 0, 
    title: "", 
    image: "",
    description: "",
  });

  const [cards, setCards] = useState<Card[]>([]);
  const isFirstRender = useRef(true);
  const addCard = (id: number, name: string, image: string, description: string) => {
    const newCard = {
      id: id,
      name: name,
      image: image,
      description: description
    };
    setCards(prevCards => [...prevCards, newCard]);
  };

  SearchPopular(setCards, addCard, cards, isFirstRender);
  SearchMyMovies(setCards, addCard, cards);
  

  useEffect(() => {
    let myCards = document.querySelectorAll(".myCard");
    myCards.forEach((element) => {
      element.addEventListener("mouseover", () => {
        setData({
          idnumber: parseInt(element.getAttribute("data-idnumber") as string),
          title: element.getAttribute("data-title") as string,
          image: element.getAttribute("data-img") as string,
          description: element.getAttribute("data-description") as string,
        })
        console.log(data)
      })
    })
  })
  return (
    <>

      <title>Search | FilmRate</title>

      <HeaderComponent/> 
      <div className="w-[100%] relative">
        <div className="w-[100%] h-[200px] flex flex-col justify-center items-center " id="SearchWrapper">
            <input autoComplete="off" type="text" name="" className="p-2 pl-4 rounded-[20px] searchInput myText" placeholder="Type the movie name..." id="search"/>
        </div>
        <div className="flex flex-wrap gap-[30px] justify-center top-[60%]" id="searchEngine">
            {cards.map((card, index) => (
              <Link href="/search/[filmId]" as={`/search/${card.id}`} key={index} >
              
                <SearchCards 
                  
                  id={card.id} 
                  name={card.name} 
                  image={card.image} 
                  description={card.description}
                  className="myCardTransition"
                />
              
              </Link>
            ))}
        </div>
      </div>

    </>

  );
}