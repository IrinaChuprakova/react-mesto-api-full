import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../image/Vector.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="logo" src={headerLogo} />
      <Switch>
        <Route path="/signin">
        <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>

        <Route path="/signup">
        <Link to="/signin" className="header__link">Войти</Link>
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