import { TableSortLabel as MuiTableSortLabel } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  activeSortField: string;
  field: string;
  onSortClick: (field: string) => void;
  children: ReactNode;
};

const TableSortLabel = ({ activeSortField, field, onSortClick, children }: Props) => {
  const handleClick = () => onSortClick(field);

  return (
    <MuiTableSortLabel active={field === activeSortField} direction="desc" onClick={handleClick}>
      {children}
    </MuiTableSortLabel>
  );
};

export { TableSortLabel };
