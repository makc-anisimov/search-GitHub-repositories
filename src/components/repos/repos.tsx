import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
// import StarIcon from "../../shared/icons/star.svg";
import styles from "./repos.module.scss";
import Star from "@/shared/icons/star/star";

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  license: {
    name: string;
    url: string;
  } | null;
}

interface IRepositoryData {
  data: Repository[];
}

interface SortDirection {
  [key: string]: "asc" | "desc";
}

const RepositoryData: React.FC<IRepositoryData> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<keyof Repository>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    name: "asc",
    language: "asc",
    forks_count: "asc",
    stargazers_count: "asc",
    updated_at: "asc",
  });

  const [isShowRepositoryData, setIsShowRepositoryData] =
    useState<boolean>(false);

  const [repositoryData, setRepositoryData] = useState<Repository>({
    id: 0,
    name: "",
    description: "",
    language: "",
    updated_at: "",
    stargazers_count: 0,
    forks_count: 0,
    license: null,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column: keyof Repository) => {
    const newDirection = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortDirection({ ...sortDirection, [column]: newDirection });
    setSortColumn(column);
  };
  const handleRowClick = (repo: Repository) => {
    if (!isShowRepositoryData) setIsShowRepositoryData(true);
    setRepositoryData(repo);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('ru-RU', {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn && sortDirection[sortColumn]) {
      if (
        typeof a[sortColumn] === "string" &&
        typeof b[sortColumn] === "string"
      ) {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection[sortColumn] === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection[sortColumn] === "asc" ? 1 : -1;
      } else if (
        typeof a[sortColumn] === "number" &&
        typeof b[sortColumn] === "number"
      ) {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection[sortColumn] === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection[sortColumn] === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className={styles.repos}>
      <div className={styles.repos__searchResult}>
        <TableContainer>
          <h2 className={styles.repos__title}>Результаты поиска</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "name"}
                    direction={sortDirection["name"]}
                    onClick={() => handleSort("name")}
                  >
                    Название
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "language"}
                    direction={sortDirection["language"]}
                    onClick={() => handleSort("language")}
                  >
                    Язык
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "forks_count"}
                    direction={sortDirection["forks_count"]}
                    onClick={() => handleSort("forks_count")}
                  >
                    Число форков
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "stargazers_count"}
                    direction={sortDirection["stargazers_count"]}
                    onClick={() => handleSort("stargazers_count")}
                  >
                    Число звезд
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortColumn === "updated_at"}
                    direction={sortDirection["updated_at"]}
                    onClick={() => handleSort("updated_at")}
                  >
                    Дата обновления
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((repo) => (
                  <TableRow
                    key={repo.id}
                    onClick={() => handleRowClick(repo)}
                    className={styles.repos__tableRow}
                  >
                    <TableCell>{repo.name}</TableCell>
                    <TableCell>{repo.language}</TableCell>
                    <TableCell>{repo.forks_count}</TableCell>
                    <TableCell>{repo.stargazers_count}</TableCell>
                    <TableCell>{formatDate(repo.updated_at)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div className={styles.repos__rightBar}>
        {isShowRepositoryData ? (
          <div className={styles.repos__repositoryData}>
            <h3 className={styles.repos__repositoryDataTitle}>
              {repositoryData.name}
            </h3>
            <div className={styles.repos__info}>
              <span className={styles.repos__desc}>
                {repositoryData.description}
              </span>
              <div className={styles.repos__stars}>
                <Star className={styles.repos__starIcon} />
                <span className={styles.repos__starCount}>
                  {formatNumber(repositoryData.stargazers_count)}
                </span>
              </div>
            </div>
            <span className={styles.repos__license}>{repositoryData.license?.name}</span>
          </div>
        ) : (
          <div className={styles.repos__alertWrapper}>
            <span className={styles.repos__alertText}>
              Выберите репозиторий
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositoryData;
