import { useEffect, useState } from "react"
import "./info.css"
import { selectUsers, insertFilm } from "../../db/DB";
import Link from "next/link";

function submitButton(isLogged:boolean){
  return(
    <>
      {
        isLogged ? (
          <button className="submitButton" id="submitButton">Submit</button>
        ) : (
          <Link href="/login" className="submitButton">Login to submit</Link>
        )
      }
    </>
  )
}

export function InfoComponent(props:any){

    const [isLogged, SetisLogged] = useState(false) 

    useEffect(() => {

      if (localStorage.getItem("isLogged") === "true") {
        SetisLogged(true);
      } else {
        SetisLogged(false);
      }

    }, []);

    useEffect(() => {
        const infoBox = document.getElementById("infoBox");
        const closeInfoBox = document.getElementById("closeInfoBox");
        const submitButton = document.getElementById("submitButton");
      
        // Event listener setup (optimized for performance)
        const handleScroll = () => {
          if (infoBox) {
            infoBox.style.top = window.scrollY + "px";
          }
        };

        handleScroll()
      
        const handleClickCloseInfoBox = () => {
          if (closeInfoBox) {
            props.setShowInfo(false);
          }
        };
      
        const handleClickSubmit = () => {
          insertFilm(52, parseInt(props.idnumber), document.getElementById("textReview").value);
          props.setShowInfo(false)
        };
      
        window.addEventListener("scroll", handleScroll);
        closeInfoBox?.addEventListener("click", handleClickCloseInfoBox);
        submitButton?.addEventListener("click", handleClickSubmit);
      
        // Cleanup function (combined for efficiency)
        return () => {
          window.removeEventListener("scroll", handleScroll);
          closeInfoBox?.removeEventListener("click", handleClickCloseInfoBox);
          submitButton?.removeEventListener("click", handleClickSubmit);
        };
      
      }, [props.setShowInfo]);

    return(
        <div className="wrapper" id="infoBox">
            <div className="referenceButton absolute right-0 top-0 m-5" id="closeInfoBox">
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                >
                    <path
                        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                        fill="#FFF"
                    />
                </svg>
            </div>
            <div className="infoBox">
                <div className="infoImage">
                    <img src={props.image} alt="imagen"/>
                </div>
                <div className="infoSection">
                    <div className="flex flex-col gap-[50px] w-full h-full">
                        <div className="reviewContainer">
                            <h1>{props.title}</h1>
                            <p>{props.description}</p>

                            <div className="mt-[20px]">
                                <h2 className="text-white mb-2 text-[1.5rem] font-bold">> Write your review</h2>
                                <textarea name="" id="textReview" className="bg-[#3f3f3f] border-none w-full rounded-[10px] p-4 text-white" placeholder="Write a review..."></textarea>
                            </div>
                        </div>
                    
                    </div>
                    {submitButton(isLogged)}
                </div>

                
            </div>
        </div>
    )
}