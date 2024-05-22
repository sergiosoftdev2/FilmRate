import "./profileFilmCard.css"

export function ProfileFilmCard(props:any) {

    return(
        <>
            <div className="reviewImage">
                <img src={props.img} alt="imagen" />
                <div className="reviewWrapper">
                    <h1>{props.title}</h1>
                    <p>'{props.desc}'</p>
                </div>
            </div>
        </>
    )

}