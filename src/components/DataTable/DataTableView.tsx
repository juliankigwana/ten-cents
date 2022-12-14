import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, MouseEvent } from "react";

import { Spinner } from "@/components";
import { DataTableRepositoryFragment } from "@/services";

import { SortDirectionEnum } from "./";
import { TableBodyRow, TableSortLabel } from "./components";

type Props = {
  fetching: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSortChange: (sortField: string, direction: SortDirectionEnum) => void;
  page: number;
  repositories: DataTableRepositoryFragment[];
  repositoryCount: number;
  rowsPerPage: number;
  sortField: string;
};

const useStyles = makeStyles({
  tableContainer: {
    position: "relative",
  },
  tableCell: {
    width: "100%",
  },
});

const DataTableView = ({ fetching, onPageChange, onRowsPerPageChange, onSortChange, page, repositories, repositoryCount, rowsPerPage, sortField }: Props) => {
  const classes = useStyles();

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value));
  };

  const tableBodyRows = repositories.map(({ id, ...props }) => <TableBodyRow key={id} {...props} />);

  return (
    <Box display="flex" flexDirection="column" maxHeight="100%" overflow="hidden">
      <Box display="flex" overflow="auto" position="relative">
        {fetching && <Spinner />}
        <TableContainer className={classes.tableContainer}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>
                  <TableSortLabel field="name" onSortClick={onSortChange} sortField={sortField}>
                    Repository Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel field="stargazerCount" onSortClick={onSortChange} sortField={sortField}>
                    Stars
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel field="forkCount" onSortClick={onSortChange} sortField={sortField}>
                    Forks
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableBodyRows}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        component={Box}
        count={repositoryCount}
        minHeight={52}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  );
};

export { DataTableView };
