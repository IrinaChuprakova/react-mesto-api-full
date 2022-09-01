import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../image/Vector.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="logo" src={headerLogo} />
      <Switch>
        <Route path="/log-in">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>

        <Route path="/sign-up">
        <Link to="/log-in" className="header__link">Войти</Link>
        </Route>

        <Route path="/">
        <ul className="list header__nav">
        <li className="header__email">  {props.email} </li>
        <li className="header__logOut" onClick={props.onLogOut}> Выйти  </li>
        </ul>
        </Route>

      </Switch>
    </header>
  );
}

export default Header;