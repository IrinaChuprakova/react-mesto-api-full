import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (`button ${isOwn ? 'cards__trash' : 'cards__trash_type_visible'}`);
    const cardLikeButtonClassName = (`button cards__like ${isLiked ? 'cards__like_active' : ''}`);

    function handleCardClick(){
        props.onCardClick(props.card);
    }

    function handleCardDelete(){
        props.onCardDelete(props.card);
    }

    function handleCardLike(){
        props.onCardLike(props.card);
    }
    return (
            <li  className="cards__item">
                <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}/> 
                <img className="cards__img" src={props.card.link} alt={`${props.card.name}`} onClick={handleCardClick}/>
                <div className="cards__box">
                    <h2 className="cards__title">{props.card.name}</h2>
                    <div className="cards__box-like">
                        <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}/> 
                        <span className="cards__like-count"> {props.likes} </span>
                    </div>
                </div>
            </li>    
    )

}
export default Card;