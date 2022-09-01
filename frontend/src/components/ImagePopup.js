function ImagePopup (props){
    return(
        <div className={`popup popup_type_open-img ${props.card.link ? "popup_opened" : ""}`}>
        <div className="popup__figure-container ">
          <button className="button button_type_close" type="button" onClick={props.onClose}></button>
          <figure className="popup__figure">
            <img className="popup__img" src={props.card.link} alt={`${props.card.name}`}/>
            <figcaption className="popup__description">{props.card.name} </figcaption>
          </figure>
        </div>
      </div>
    )
}
export default ImagePopup;