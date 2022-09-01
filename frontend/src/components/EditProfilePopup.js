import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    function handleName(evt) {
        setName(evt.target.value)
    }

    function handleDescription(evt) {
        setDescription(evt.target.value)
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser(name, description);
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='formEditProfile'
            title='Редактировать профиль'>
            <label className="popup__label">
                <input className="popup__input" onChange={handleName} value={name || ''} type="text" name="firstname" minLength="2" maxLength="40" required />
                <span className="popup__error"></span>
            </label>
            <label className="popup__label">
                <input className="popup__input" onChange={handleDescription} value={description || ''} type="text" name="job" minLength="2" maxLength="200" required />
                <span className="popup__error"> </span>
            </label>
        </PopupWithForm>
    )
}
export default EditProfilePopup;