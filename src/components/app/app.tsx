import React from "react";
import styles from "./app.module.scss";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchSearchRepos, IRepositoryData } from "@/store/reposSlice";
import useAppDispatch from "@/hooks/useAppDispatch";

const App = () => {
  const dispatch = useAppDispatch();
  const { results, loading, error } = useSelector(
    (state: RootState) => state.repos
  );

  const handleSearch = (query: string) => {
    dispatch(fetchSearchRepos(query));
  };

  return (
    <>
      <Header onSubmit={handleSearch} />
      <div className={styles.app}>
        <main className={styles.app__main}>
          {/* <h1 className={styles.app__title}>Добро пожаловать</h1> */}
          <div>
            {/* <input type="text" onChange={(e) => handleSearch(e.target.value)} /> */}
            {loading && <div>Загрузка...</div>}
            {error && <div>Ошибка: {error}</div>}
            <ul>
              {results.map((result: IRepositoryData) => (
                <li key={result.id}>
                  <h3>{result.name}</h3>
                  <p>{result.description}</p>
                  <a href={result.html_url} target="_blank" rel="noreferrer">
                    Открыть на GitHub
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
