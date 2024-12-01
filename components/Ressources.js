import React from "react";
import Head from "next/head"; // Assure-toi d'importer Head depuis next/head
import styles from "../styles/Ressources.module.css";

const Ressources = () => {
  return (
    <div className={styles.resources}>
      <Head>
        <title>Coconut. | Ressources</title>
      </Head>

      <h1 className={styles.header}>Ressources de soutien</h1>
      <p className={styles.description}>
        Bienvenue sur la page des ressources de soutien de COCONUT. Ici, vous
        trouverez une sélection de liens utiles vers des sites web et des
        services dédiés à la santé mentale et au soutien émotionnel.
      </p>
      <p className={styles.text}>Voici des ressources pour vous aider :</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <a
            className={styles.link}
            href="https://www.sos-suicide.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="SOS Suicide - Site de ressources et de soutien pour les personnes en détresse psychologique"
          >
            SOS Suicide
          </a>{" "}
          - Site de ressources et de soutien pour les personnes en détresse
          psychologique.
        </li>
        <li className={styles.listItem}>
          <a
            className={styles.link}
            href="https://www.filsantejeunes.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Fil Santé Jeunes - Informations et soutien pour les jeunes"
          >
            Fil Santé Jeunes
          </a>{" "}
          - Informations et soutien pour les jeunes.
        </li>
        <li className={styles.listItem}>
          <a
            className={styles.link}
            href="https://www.headspace.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Headspace - Application et plateforme de méditation guidée"
          >
            Headspace
          </a>{" "}
          - Application et plateforme de méditation guidée.
        </li>
        <li className={styles.listItem}>
          <a
            className={styles.link}
            href="https://www.7cups.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="7 Cups - Soutien émotionnel en ligne avec des auditeurs formés"
          >
            7 Cups
          </a>{" "}
          - Soutien émotionnel en ligne avec des auditeurs formés.
        </li>
        <li className={styles.listItem}>
          <a
            className={styles.link}
            href="https://www.psycom.org/"
            target="_blank"
            rel="noopener noreferrer"
            title="Psycom - Plateforme d'information et de sensibilisation sur la santé mentale"
          >
            Psycom
          </a>{" "}
          - Plateforme d'information et de sensibilisation sur la santé mentale.
        </li>
        <li className={styles.listItem}>
          <a
            className={styles.link}
            href="https://organisologie.com/respirelax/"
            target="_blank"
            rel="noopener noreferrer"
            title="l’application gratuite pour entre en cohérence cardiaque"
          >
            RespiRelax
          </a>{" "}
          - Découvrez comment l'application Respirelax peut vous aider à
          déstresser et rester serein au quotidien.
        </li>
      </ul>
    </div>
  );
};

export default Ressources;
