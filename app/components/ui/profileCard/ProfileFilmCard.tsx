import "./profileFilmCard.css"

export function ProfileFilmCard(props:any) {

    return(
        <>
            <div className="reviewCard" data-index={props.indexNum}>
                <div className="reviewImage">
                    <img src={props.img} alt="imagen" />
                </div>
                <div className="reviewWrapper">
                        <h1>{props.title}</h1>
                        <p>'{props.desc}'</p>
                </div>
            </div>
        </>
    )

}