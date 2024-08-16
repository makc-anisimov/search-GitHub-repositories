import React, { useState } from "react";
import styles from "./app.module.scss";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchSearchRepos, /* IRepoData */} from "@/store/reposSlice";
import useAppDispatch from "@/hooks/useAppDispatch";
import { Greeting } from "@/widgets/greeting/greeting";
import  RepositoryTable  from "../repos/repos";

const App = () => {
  const [isShowGreeting, SetIsShowGreeting] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { results, loading, error } = useSelector(
    (state: RootState) => state.repos
  );

  const handleSearch = (query: string) => {
    if (isShowGreeting) SetIsShowGreeting(false);
    dispatch(fetchSearchRepos(query));
  };

  return (
    <>
      <Header onSubmit={handleSearch} />
      <main className={styles.app}>
        <div className={styles.app__main}>
          {isShowGreeting ? (
            <Greeting />
          ) : (
            <>
              {loading && <h1 className={styles.app__title}>Загрузка...</h1>}
              {error && <h1 className={styles.app__title}>{error}</h1>}
              <RepositoryTable 
               data={results} 
              />
              {/* <ul>
                {results.map((result: IRepoData) => (
                  <li key={result.id}>
                    <h3>{result.name}</h3>
                    <p>{result.description}</p>
                    <a href={result.html_url} target="_blank" rel="noreferrer">
                      Открыть на GitHub
                    </a>
                  </li>
                ))}
              </ul> */}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
