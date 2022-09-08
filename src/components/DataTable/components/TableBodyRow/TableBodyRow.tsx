import { Link, TableCell, TableRow } from "@mui/material";

import { DataTableRepositoryFragment } from "@/services";

type Props = Pick<DataTableRepositoryFragment, "name" | "url" | "stargazerCount" | "forkCount">;

const TableBodyRow = ({ name, url, stargazerCount, forkCount }: Props) => (
  <TableRow hover>
    <TableCell>
      <Link href={url}>{name}</Link>
    </TableCell>
    <TableCell>{stargazerCount}</TableCell>
    <TableCell>{forkCount}</TableCell>
  </TableRow>
);

export { TableBodyRow };
