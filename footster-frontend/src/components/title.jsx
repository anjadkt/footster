export default function Title ({title}){
  return(
    <>
     <div className="title-div">
      <h2>{title}</h2>
      <div>
        <img src="./icons/left-arrow.png" alt="left" />
        <img src="./icons/right-arrow.png" alt="right" />
      </div>
     </div>
    </>
  )
}