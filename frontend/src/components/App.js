import React from "react";
import "../index.css";
import api from "../utils/Api";
import * as Auth from "../utils/Auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [status,setStatus] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({});
  }
  function handleUpdateUser(name, about) {
    api
      .sendUserInfo(name, about)
      .then((res) =>
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        })
      )
      .then(() => setIsEditProfilePopupOpen(false))
      .catch((error) => console.log(error));
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateAvatar(avatar)
      .then((res) =>
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        })
      )
      .then(() => setIsEditAvatarPopupOpen(false))
      .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .sendCard(name, link)
      .then((res) => setCards([res, ...cards]))
      .then(() => setIsAddPlacePopupOpen(false))
      .catch((error) => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((error) => console.log(error));
  }

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then((res) => {
        if (res) {
          setInfoTooltip(true);
          setStatus(true);
          // setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(() => {
        setInfoTooltip(true);
          setStatus(false);
      })
  }

  function handleLogin(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setEmail(email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.getContent(token)
        .then((res) => {
          setEmail(res.data.email)
          setLoggedIn(true);
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleLogOut(){
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/log-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="pg">
          <Header email={email} onLogOut={handleLogOut}/>
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/log-in">
              <Login onLogin={handleLogin} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/log-in" />}
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip isOpen={isInfoTooltip} onClose={closeAllPopups} status={status} />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
