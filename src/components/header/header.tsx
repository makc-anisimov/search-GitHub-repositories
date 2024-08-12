// import React, { MouseEventHandler, useState } from "react";
// import { Button } from '@mui/material';
// // import { styled } from '@mui/material/styles';
// import styles from "./header.module.scss";
// import TextField from "@mui/material/TextField";

// export const Header: React.FC = () => {

//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const handleSearch: MouseEventHandler<HTMLButtonElement> = (text: string) => {
//     console.log(text);
//   };

//   return (
//     <header className={styles.header}>
//       <TextField
//         value={searchTerm}
//         onChange={(e) => {
//           // console.log(e.target.value);
//           setSearchTerm(e.target.value);
//         }}
//         placeholder="Введите поисковый запрос"
//       />
//       {/* <StyledButton >Искать</StyledButton> */}

//       <Button onClick={handleSearch(searchTerm)} variant="outlined">Искать</Button>

//       {/* <Searchform /> */}
//       {/* <input type='text' placeholder='Введите поисковый запрос' className={styles.header__input} />
//       <button type='button' className={styles.header__searchButton}>Искать</button> */}
//     </header>
//   );
// };

import React, { useState } from "react";
import { Button } from "@mui/material";


import styles from "./header.module.scss";


interface MyComponentProps {
  onSubmit: (value: string) => void;
}

export const Header: React.FC<MyComponentProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    // setInputValue('');
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

      {/* </Box> */}
    </header>
  );
};
