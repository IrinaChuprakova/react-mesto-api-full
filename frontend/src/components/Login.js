import React from "react";

function Login(props) {
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
        if (!email || !password) {
            return
        }
        props.onLogin(email, password);
    }

    return (
        <form className="autoriz" onSubmit={handleSubmit} name="formLogin">
            <fieldset className="autoriz__fieldset">
                <legend className="autoriz__header"> Вход</legend>
                <label className="autoriz__label">
                    <input className="autoriz__input" placeholder="Email" value={email || ''} onChange={handleEmail}  type="email" minLength="2" maxLength="40"/>
                    <span className="autoriz__error"></span>
                </label>
                <label className="autoriz__label">
                    <input className="autoriz__input" placeholder="Пароль" value={password || ''} onChange={handlePassword}  type="password" minLength="2" maxLength="40"/>
                    <span className="autoriz__error"> </span>
                </label>
            </fieldset>
            <button className="button autoriz__save" type="submit">Войти</button>
        </form>

    )
}
export default Login;

