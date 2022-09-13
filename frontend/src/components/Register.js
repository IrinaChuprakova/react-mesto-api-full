import React from "react";
import { Link } from 'react-router-dom';
function Register(props){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmail(evt) {
        setEmail(evt.target.value)
    }

    function handlePassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(email,password);
    }

    return(
    <form className="autoriz" onSubmit={handleSubmit} name="formRegister">
    <fieldset className="autoriz__fieldset">
        <legend className="autoriz__header"> Регистрация</legend>
        <label className="autoriz__label">
            <input className="autoriz__input" placeholder="Email" value={email || ''} onChange={handleEmail}  type="email" minLength="2" maxLength="40"/>
            <span className="autoriz__error"></span>
        </label>
        <label className="autoriz__label">
            <input className="autoriz__input" placeholder="Пароль" value={password || ''} onChange={handlePassword}  type="password" minLength="2" maxLength="40"/>
            <span className="autoriz__error"> </span>
        </label>
    </fieldset>
    <button className="button autoriz__save" type="submit">Зарегестрироваться</button>
    <Link to="/signin" className="autoriz__link">Уже зарегестрированы? Войти</Link>
</form>
    )
}
export default Register;