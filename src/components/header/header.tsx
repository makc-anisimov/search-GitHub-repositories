import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "./header.module.scss";

interface IHeaderProps {
  onSubmit: (query: string) => void;
}

export const Header: React.FC<IHeaderProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <header className={styles.header}>
      <form className={styles.header__searchForm} onSubmit={handleSubmit}>
        <input
          required
          className={styles.header__input}
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Введите поисковый запрос"
        />
        <Button
          className={styles.header__searchButton}
          type="submit"
          variant="contained"
          disabled={!(inputValue.length > 0)}
        >
          Искать
        </Button>
      </form>
    </header>
  );
};
