import React from "react";
import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isOpen])

    function handlePlaceName(evt) {
        setPlaceName(evt.target.value);
    }

    function handlePlaceLink(evt) {
        setPlaceLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace(placeName, placeLink);
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name='formAddPlace'
            title='Новое место'>
            <label className="popup__label">
                <input className="popup__input" onChange={handlePlaceName} value={placeName || ''} type="text" name="place" placeholder="Название" minLength="2" maxLength="30" required />
                <span className="popup__error"> </span>
            </label>
            <label className="popup__label">
                <input className="popup__input" onChange={handlePlaceLink} value={placeLink || ''} type="url" name="link" placeholder="Ссылка на картинку" required />
                <span className="popup__error"> </span>
            </label>
        </PopupWithForm>
    )
}
export default AddPlacePopup;
