import React, { useState, useEffect } from "react";
import styles from "../styles/PostPublish.module.css";
import PostList from "./PostList";
import { useSelector } from "react-redux";

const getUserInfoFromToken = (token) => {
  try {
    if (!token) {
      console.error("Aucun token trouvé dans le localStorage.");
      return { userId: null, username: "" };
    }
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    console.log("Token décodé:", decodedToken);
    return {
      userId: decodedToken?.id || null,
      username: decodedToken?.username || "",
    };
  } catch (e) {
    console.error("Erreur de décodage du token:", e);
    return { userId: null, username: "" };
  }
};

// Fonction pour gérer les erreurs 401 (non autorisé)
const handleUnauthorized = () => {
  alert(
    "Votre session a expiré ou vous n'êtes pas autorisé. Veuillez vous connecter."
  );
  localStorage.removeItem("userToken");
  window.location.href = "/login";
};

const PostPublish = () => {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/Coconut/posts/displayAllPost"
      );
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) throw new Error("Erreur lors du chargement des posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger les posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => setInputValue(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handlePostSubmit = async () => {
    if (!inputValue.trim()) {
      alert("Veuillez écrire quelque chose !");
      return;
    }

    const token = localStorage.getItem("userToken");
    console.log("Token JWT:", token);
    if (!token) {
      alert("Veuillez vous connecter.");
      return;
    }

    const { userId, username } = getUserInfoFromToken(token);
    if (!userId) {
      alert("Erreur lors de la récupération de l'ID utilisateur");
      return;
    }

    const postData = {
      text: inputValue,
      username: username || "Anonyme",
      user: userId,
    };
    
    try {
      const response = await fetch(
        "http://localhost:4000/Coconut/posts/newPost",
        {
          method: "POST",
          credentials: "include", // Assure que le cookie de session est inclus
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData), // Envoi des données complètes du post
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error("Erreur lors de la publication");

      const newPost = await response.json();
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setInputValue("");
      setUsername("");
      setSuccessMessage("Post publié avec succès !");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de publier le post pour le moment");
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Veuillez vous connecter pour liker un post.");
      return;
    }

    const { userId } = getUserInfoFromToken(token);
    if (!userId) {
      alert("Erreur de récupération de l'ID utilisateur");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/Coconut/posts/likePost/${postId}`,
        {
          method: "POST",
          credentials: "include", // Assure que le cookie de session est inclus
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error("Erreur lors du like");
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de liker le post");
    }
  };

  const handleEdit = async (postId, updatedText) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Veuillez vous connecter pour modifier un post.");
      return;
    }

    const { userId } = getUserInfoFromToken(token);
    if (!userId) {
      alert("Erreur de récupération de l'ID utilisateur");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/Coconut/posts/editPost/${postId}`,
        {
          method: "PUT",
          credentials: "include", // Assure que le cookie de session est inclus
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, text: updatedText }),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error("Erreur lors de la modification");
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de modifier le post");
    }
  };

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Veuillez vous connecter pour supprimer un post.");
      return;
    }

    const { userId } = getUserInfoFromToken(token);
    if (!userId) {
      alert("Erreur de récupération de l'ID utilisateur");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/Coconut/posts/deletePost/${postId}`,
        {
          method: "DELETE",
          credentials: "include", // Assure que le cookie de session est inclus
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de supprimer le post");
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.containerinput}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={user.username || ""}
          onChange={handleUsernameChange}
          className={styles.usernameInput}
          disabled={!!localStorage.getItem("userToken")}
        />
        <textarea
          placeholder="Quelles émotions vous traversent en ce moment ?"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.textarea}
        />
        <button className={styles.button} onClick={handlePostSubmit}>
          Publier
        </button>
      </div>

      <PostList
        posts={posts}
        onLike={handleLike}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PostPublish;
