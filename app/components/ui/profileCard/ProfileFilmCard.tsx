import "./profileFilmCard.css"

export function ProfileFilmCard(props:any) {

    return(
        <>
            <div className="reviewCard" data-index={props.indexNum}>
                <div className="reviewImage">
                    <img src={props.img} alt="imagen" />
                </div>
                <div className="reviewWrapper">
                    <div className="h-[100%]">
                        <img src={props.img} alt="imagen" className="h-[100%] rounded-[10px]" id="reviewImage"/>
                    </div>
                    <div className="max-w-[75%]">
                        <h1>{props.title}</h1>
                        <p>&apos;{props.desc}&apos;</p>
                    </div>
                </div>
            </div>
        </>
    )

}