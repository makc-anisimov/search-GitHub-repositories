import React from "react";
import styles from "./app.module.scss";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

const App = () => {
  const test = (searchText:string) => {
    console.log(searchText)

  }
  return (
    <>
      <Header onSubmit={test} />
      <div className={styles.app}>
        <main className={styles.app__main}>
          <h1 className={styles.app__title}>Добро пожаловать</h1>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
