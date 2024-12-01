import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../reducers/user";

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // État pour stocker le nom d'utilisateur

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerFormError },
    reset: resetRegisterForm,
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: connectForm,
    handleSubmit: handleConnectForm,
    formState: { errors: connectFormError },
    reset: resetConnectForm,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté via localStorage

    if (user.id !== "") {
      setIsLoggedIn(true);
    }
  }, [user]);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleRegister = async (data) => {
    console.log("Register Data:", data);

    try {
      const response = await fetch(
        "http://localhost:4000/Coconut/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok && result.result) {
        toast.success(
          "Inscription réussie ! Vous pouvez maintenant vous connecter."
        );
        resetRegisterForm();
      } else {
        toast.error(
          result.error ||
            "L'inscription n'a pas pu être complétée. Assurez-vous que toutes les informations sont correctes."
        );
      }
    } catch (error) {
      toast.error(
        "Erreur lors de l'inscription. Vérifiez les champs et réessayez."
      );
    }
  };

  const handleConnect = async (data) => {
    console.log("Connect Data:", data);

    try {
      const response = await fetch(
        "http://localhost:4000/Coconut/users/signin",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.data) {
        console.log("prend tes datas", result.data);

        dispatch(addUser(result.data)); // Mettre à jour le nom d'utilisateur
        setIsLoggedIn(true);
        resetConnectForm();
        setIsModalVisible(false);
        toast.success("Connexion effectuée. Bon retour parmi nous !");
      } else {
        toast.error(
          result.error ||
            "Impossible de se connecter. Veuillez vérifier votre mot de passe et réessayer."
        );
      }
    } catch (error) {
      toast.error(
        "La connexion a échoué. Assurez-vous que vos informations sont correctes."
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(""); // Réinitialiser le nom d'utilisateur
    dispatch(removeUser());
    console.log("Déconnecté");
    toast.info("Déconnexion réussie. Nous espérons vous revoir très vite !");
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const modalContent = (
    <div className={styles.registerContainer}>
      <button className={styles.closeButton} onClick={closeModal}>
        &times;
      </button>
      <form
        onSubmit={handleRegisterSubmit(handleRegister)}
        className={styles.registerSection}
      >
        <p>Sign-up</p>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          {...registerForm("username", {
            required: "Le nom d'utilisateur est requis.",
            minLength: {
              value: 2,
              message:
                "Le nom d'utilisateur doit comporter au moins 2 caractères.",
            },
          })}
        />
        {registerFormError.username && (
          <span className={styles.errorMsg}>
            {registerFormError.username.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Mot de passe"
          {...registerForm("password", {
            required: "Le mot de passe est requis.",
            minLength: {
              value: 6,
              message: "Le mot de passe doit contenir au moins 6 caractères.",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Le mot de passe doit contenir au moins 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 caractère spécial.",
            },
          })}
        />
        {registerFormError.password && (
          <span className={styles.errorMsg}>
            {registerFormError.password.message}
          </span>
        )}
        <button>S'inscrire</button>
      </form>
      <form
        onSubmit={handleConnectForm(handleConnect)}
        className={styles.registerSection}
      >
        <p>Sign-in</p>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          {...connectForm("username", {
            required: "Le nom d'utilisateur est requis.",
          })}
        />
        {connectFormError.username && (
          <span className={styles.errorMsg}>
            {connectFormError.username.message}
          </span>
        )}
        <input
          type="password"
          placeholder="Mot de passe"
          {...connectForm("password", {
            required: "Le mot de passe est requis.",
          })}
        />
        {connectFormError.password && (
          <span className={styles.errorMsg}>
            {connectFormError.password.message}
          </span>
        )}
        <button>Se connecter</button>
      </form>
    </div>
  );

  return (
    <div className={styles.fixed}>
      <header className={styles.header}>
        <div id="logo" className={styles.title}>
          <h1>COCONUT.</h1>
        </div>
        <div className="parent">
          <div className={styles.nav}>
            <Link href="/">
              <a>HOME</a>
            </Link>
            <Link href="/ressources">
              <a>RESSOURCES</a>
            </Link>
            <Link href="/apropos">
              <a>À PROPOS</a>
            </Link>
            {isLoggedIn ? (
              <div className={styles.loggedInContainer}>
                <span className={styles.welcomeMessage}>
                  Welcome {user?.username} !
                </span>
                <img
                  src="/img/iconLogout.png"
                  alt="Logout"
                  className={styles.logoutIcon}
                  onClick={handleLogout}
                />
              </div>
            ) : (
              <div className={styles.icon} onClick={showModal}>
                <img src="/img/icon.png" alt="icon" className={styles.image} />
              </div>
            )}
          </div>
        </div>
      </header>
      {isModalVisible && (
        <div className={styles.modalContainer}>{modalContent}</div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Header;
