import React, { useState } from "react";
import { Button } from "@mui/material";
import styles from "./header.module.scss";
// import { useDispatch } from 'react-redux';

interface IHeaderProps {
  onSubmit: (query: string) => void;
}

export const Header: React.FC<IHeaderProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");
  // const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__searchForm}>
        <input
          required
          className={styles.header__input}
          value={inputValue}
          onChange={handleInputChange}
          // variant="outlined"
          type="text"
          placeholder="Введите поисковый запрос"
        />
        <Button
          className={styles.header__searchButton}
          variant="contained"
          onClick={handleSubmit}
          disabled={!(inputValue.length>0)}
        >
          Искать
        </Button>
      </div>
    </header>
  );
};
