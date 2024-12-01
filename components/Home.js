import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import PostPublish from "../components/PostPublish";
import PostList from "../components/PostList";


const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coconut. | Home</title>
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img
            src="../img/coconut.png"
            alt="Coconut"
            className={styles.image}
          />
        </div>

      
        
        <PostPublish />
        <PostList />
       

      </div>
    </div>
  );
};

export default Home;
