import React from "react";
import Head from "next/head"; // Assure-toi d'importer Head depuis next/head
import styles from "../styles/Apropos.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coconut. | A propos</title>
      </Head>
      <h1 className={styles.header}>À propos de COCONUT</h1>
      <p className={styles.text}>
        Bienvenue sur COCONUT ! Conçu pour promouvoir le bien-être
        émotionnel, COCONUT vous invite à répondre à la question « Quelles émotions vous traversent en ce moment ? » chaque jour.
      </p>

      <h2 className={styles.subheader}>Comment ça marche ?</h2>
      <ol className={styles.list}>
        <li className={styles.listItem}>
          Exprimez-vous: Chaque jour, connectez-vous à COCONUT
          et répondez à la question du jour dans un champ de texte dédié.
          Partagez vos pensées, vos sentiments et vos réflexions du moment.
        </li>
        <li className={styles.listItem}>
          Publiez, Likez et Partagez : Cliquez sur le bouton "Publier"
          pour enregistrer votre réponse et pour favoriser un environnement
          de soutien et de compréhension.
        </li>

        <li className={styles.listItem}>
          Accédez à des Ressources : COCONUT propose également
          une bibliothèque de ressources de soutien. Que vous cherchiez des
          conseils pour gérer le stress, des outils de relaxation, ou des lignes
          de soutien, nous avons tout ce qu'il vous faut pour vous aider à
          traverser les moments difficiles.
        </li>
      </ol>

      <h2 className={styles.subheader}>Notre Mission</h2>
      <p className={styles.text}>
        Chez COCONUT, nous croyons que l'expression régulière de ses émotions
        est essentielle pour une bonne santé mentale. Notre mission est de créer
        un espace sûr et bienveillant où chacun peut se sentir libre de partager
        ses ressentis, sans jugement.
      </p>

      <h2 className={styles.subheader}>Rejoignez notre Communauté</h2>
      <p className={styles.text}>
        Rejoignez la communauté COCONUT et faites partie d'un mouvement qui
        valorise le bien-être émotionnel. Ensemble, nous pouvons créer un
        environnement où chacun se sent entendu, compris et soutenu.
      </p>
    </div>
  );
};

export default About;
