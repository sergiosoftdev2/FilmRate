"use client";

import { useEffect, useState, useRef } from "react";
import { getInfoMovie, getMetaData, search, searchPopular } from "./searchEngine";
import HeaderComponent from "../components/ui/headerComponent/HeaderComponent"
import "./page.css"
import { Playfair_Display } from "next/font/google";
import { SearchCards } from "../components/ui/searchCards/SearchCards";
import { get } from "http";
import { InfoComponent } from "../components/ui/infoComponent/InfoComponent";

const playfairDisplay = Playfair_Display({
  weight: ["800", "500"], // Puedes especificar el peso si hay varias opciones
  subsets: ["latin"], // Subconjuntos que necesitas
});

export default function Search() {

  const [data, setData] = useState({
    idnumber: 0, 
    title: "", 
    image: "",
    description: "",
  });
  const [cards, setCards] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
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

  searchPopular(setCards, addCard, cards, isFirstRender);
  search(setCards, addCard, cards);
  

  useEffect(() => {
    let myCards = document.querySelectorAll(".myCard");
    myCards.forEach((element) => {
      element.addEventListener("mouseover", () => {
        setData({
          idnumber: element.getAttribute("data-idnumber"),
          title: element.getAttribute("data-title"),
          image: element.getAttribute("data-img"),
          description: element.getAttribute("data-description"),
        })
      })
      element.addEventListener("click", () => {
        setShowInfo(true);
        console.log(data)
      })
    })

    if(showInfo){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }

  })

  const handleShowInfo = (value:any) => {
    setShowInfo(value);
  };

  return (
    <>

      <HeaderComponent/> 
      {showInfo && <InfoComponent idnumber={data.idnumber} title={data.title} image={data.image} description={data.description} setShowInfo={handleShowInfo} showInfo={showInfo} />}
      <div className="w-[100%] relative">
        <div className="w-[100%] h-[200px] flex flex-col justify-center items-center " id="SearchWrapper">
            <input autoComplete="off" type="text" name="" className="p-2 pl-4 rounded-[20px] searchInput myText" placeholder="Type the movie name..." id="search"/>
        </div>
        <div className="flex flex-wrap gap-[30px] justify-center top-[60%]" id="searchEngine">
            {cards.map((card, index) => (
              <SearchCards 
                key={index} 
                id={card.id} 
                name={card.name} 
                image={card.image} 
                description={card.description}
                className="myCardTransition"
              />
            ))}
        </div>
      </div>

    </>

  );
}