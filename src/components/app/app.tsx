import React, { useState } from "react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Greeting } from "@/widgets/greeting/greeting";
import { RepositoryData } from "../repos/repos";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchSearchRepos } from "@/store/reposSlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import styles from "./app.module.scss";

const App = () => {
  const [isShowGreeting, setIsShowGreeting] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { results, loading, error } = useSelector(
    (state: RootState) => state.repos
  );

  const handleSearch = (query: string) => {
    if (isShowGreeting) setIsShowGreeting(false);
    dispatch(fetchSearchRepos(query));
  };

  return (
    <div className={styles.app}>
      <Header onSubmit={handleSearch} />
      <main className={styles.app__main}>
        {isShowGreeting ? (
          <Greeting />
        ) : (
          <>
            {error && (
              <div className={styles.app__titleContainer}>
                <h2 className={styles.app__title}>{error}</h2>
              </div>
             )}
            {loading && (
              <div className={styles.app__titleContainer}>
              <h2 className={styles.app__title}>Загрузка...</h2>
              </div>
            )}
            {(!error && !loading) && (
              <RepositoryData data={results} />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
