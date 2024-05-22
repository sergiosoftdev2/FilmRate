import "./page.css"

export function SearchCards(props:any){

    return (
        <div className="flex flex-col card rounded-[20px] overflow-clip myCard" data-idnumber={props.id} data-title={props.name} data-img={props.image} data-description={props.description}>
            <div className="h-[100%] flex items-center justify-center relative myIMG">
                <img 
                    src={props.image}
                    alt=""
                    className="w-[auto] rounded-[20px] h-[100%]"
                />
                <div className="flex w-full font-bold text-white bottom-0 mb-4 absolute justify-center text-[2rem] gap-[10px] p-2 rounded-[20px] gradient">
                    <h2 className="z-30">{props.name}</h2>
                </div>
            </div>
            
        </div>
    )

}