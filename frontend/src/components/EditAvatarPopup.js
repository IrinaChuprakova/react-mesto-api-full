import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const refAvatar = React.useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar(refAvatar.current.value);
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='formEditAvatar'
            title='Обновить аватар'>
            <label className="popup__label">
                <input className="popup__input" type="url" name="link" placeholder="Ссылка на картинку" ref={refAvatar} required />
                <span className="popup__error"> </span>
            </label>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;