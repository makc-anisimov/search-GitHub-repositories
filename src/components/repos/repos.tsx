import React, { useState } from 'react';

import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel
} from '@mui/material';
import styles from "./repos.module.scss";

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

interface RepositoryTableProps {
  data: Repository[];
}

interface SortDirection {
  [key: string]: 'asc' | 'desc';
}

const RepositoryTable: React.FC<RepositoryTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<keyof Repository>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    name: 'asc',
    language: 'asc',
    forks_count: 'asc',
    stargazers_count: 'asc',
    updated_at: 'asc',
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
    const newDirection = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    setSortDirection({ ...sortDirection, [column]: newDirection });
    setSortColumn(column);
  };
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    // const day = date.getDate();
    const day = (date.getDate()).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn && sortDirection[sortColumn]) {
      if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'string') {
        if (a[sortColumn] < b[sortColumn]) return sortDirection[sortColumn] === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection[sortColumn] === 'asc' ? 1 : -1;
      } else if (typeof a[sortColumn] === 'number' && typeof b[sortColumn] === 'number') {
        if (a[sortColumn] < b[sortColumn]) return sortDirection[sortColumn] === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection[sortColumn] === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
  

  return (
    <div className={styles.repos}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'name'}
                  direction={sortDirection['name']}
                  onClick={() => handleSort('name')}
                >
                  Название
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'language'}
                  direction={sortDirection['language']}
                  onClick={() => handleSort('language')}
                >
                  Язык
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'forks_count'}
                  direction={sortDirection['forks_count']}
                  onClick={() => handleSort('forks_count')}
                >
                  Число форков
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'stargazers_count'}
                  direction={sortDirection['stargazers_count']}
                  onClick={() => handleSort('stargazers_count')}
                >
                  Число звезд
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'updated_at'}
                  direction={sortDirection['updated_at']}
                  onClick={() => handleSort('updated_at')}
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
                <TableRow key={repo.id}>
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
  );
};

export default RepositoryTable;
