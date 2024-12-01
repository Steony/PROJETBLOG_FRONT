import React, { useEffect, useState } from "react";
import styles from "../styles/PostList.module.css";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const PostList = ({ posts, onLike, onEdit, onDelete }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Récupérer l'ID utilisateur du token JWT stocké dans localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);
      } catch (error) {
        console.error("Erreur de décodage du token", error);
      }
    }
  }, []);

  if (!posts || posts.length === 0) {
    return <div className={styles.postsContainer}>Aucun post à afficher</div>;
  }

  const handlePostLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/Coconut/posts/likePost/${postId}`,
        {
          method: "POST",
          credentials:'include',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors du like");

      const updatedPost = await response.json();
      onLike(postId, updatedPost);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de liker le post pour le moment");
    }
  };

  const handlePostEdit = async (postId, currentText) => {
    const newText = prompt("Modifier le texte du post", currentText);
    if (!newText || newText === currentText) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/Coconut/posts/modifyPost/${postId}`,
        {
          method: "PUT",
          credentials:'include',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newText }),
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la modification");

      const updatedPost = await response.json();
      onEdit(postId, updatedPost);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de modifier le post pour le moment");
    }
  };

  const handlePostDelete = async (postId) => {
    if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/Coconut/posts/deletePost/${postId}`,
        {
          method: "DELETE",
          credentials:'include',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      onDelete(postId);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de supprimer le post pour le moment");
    }
  };

  return (
    <div className={styles.postsContainer}>
      {posts.map((post) => (
        <div key={post._id} className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.postUsername}>@{post.user?.username}</div>
            <div className={styles.likeContainer}>
              <img
                src="/img/Coeur.png"
                alt="Like"
                className={styles.buttonLike}
                onClick={() => handlePostLike(post._id)}
              />
              <span className={styles.likeCount}>{post.likes.length}</span>
            </div>
          </div>
          <div className={styles.postText}>{post.text}</div>
          <div className={styles.postDateTime}>
            Posté il y a{" "}
            {formatDistanceToNow(new Date(post.date), { locale: fr })}
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.iconContainer}>
              {userId && post.user._id && userId === post.user._id && (
                <>
                  <img
                    src="/img/edit.png"
                    alt="Modifier"
                    className={styles.buttonEdit}
                    onClick={() => handlePostEdit(post._id, post.text)}
                  />
                  <img
                    src="/img/corbeille.png"
                    alt="Supprimer"
                    className={styles.buttonDelete}
                    onClick={() => handlePostDelete(post._id)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
