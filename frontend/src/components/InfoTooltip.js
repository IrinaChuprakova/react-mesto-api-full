import fail from "../image/fail.svg";
import success from "../image/success.svg"
function InfoTooltip(props) {
    return (

        <div className={`popup  ${props.isOpen && "popup_opened"}`}>
            <div className="popup__message-container">
                <button className="button button_type_close" type="button" onClick={props.onClose}></button>
                <img className="popup__message-img" src={props.status ? success : fail} />
                <p className="popup__message-text"> {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."} </p>
            </div>
        </div>
    )
}

export default InfoTooltip;