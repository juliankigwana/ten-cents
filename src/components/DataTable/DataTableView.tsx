import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, MouseEvent } from "react";

import { DataTableRepositoryFragment } from "@/services";

import { TableBodyRow } from "./components";

type Props = {
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  page: number;
  repositories: DataTableRepositoryFragment[];
  repositoryCount: number;
};

const useStyles = makeStyles({
  tableContainer: {
    position: "relative",
  },
  tableCell: {
    width: "100%",
  },
});

const DataTableView = ({ rowsPerPage, onPageChange, onRowsPerPageChange, page, repositories, repositoryCount }: Props) => {
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
      <TableContainer className={classes.tableContainer}>
        <Table aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Repository Name</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Forks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBodyRows}</TableBody>
        </Table>
      </TableContainer>
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
