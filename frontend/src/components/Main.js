import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="main">
      <div className="profile">
        <button className="profile__edit-picture" type="button" title="Изменить аватар" onClick={props.onEditAvatar}/>
        <img className="profile__picture" src={currentUser.avatar} alt="Фото профиля" />
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="button profile__edit" aria-label="edit profile" type="button" onClick={props.onEditProfile}/> 
          <p className="profile__description"> {currentUser.about} </p>
        </div>
        <button className="button profile__add" type="button" onClick={props.onAddPlace}/>
      </div>
      <div className="cards">
        <ul className="cards__list list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />))}
        </ul>
      </div>
    </div>
  )
}

export default Main;