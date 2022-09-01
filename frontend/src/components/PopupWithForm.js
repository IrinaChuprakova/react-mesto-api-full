import React from "react";

function PopupWithForm(props){
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container ">
          <button className="button button_type_close" type="button" onClick={props.onClose}></button>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            <fieldset className="popup__fieldset">
              <legend className="popup__header">{props.title}</legend>
              {props.children}
            </fieldset>
            <button className="button popup__save" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithForm;