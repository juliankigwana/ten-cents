import { TableSortLabel as MuiTableSortLabel } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import { SortDirectionEnum } from "../../";

type Props = {
  children: ReactNode;
  field: string;
  onSortClick: (sortField: string, direction: SortDirectionEnum) => void;
  sortField: string;
};

const TableSortLabel = ({ children, field, onSortClick, sortField }: Props) => {
  const [direction, setDirection] = useState(SortDirectionEnum.Descending);

  useEffect(() => {
    if (field !== sortField) {
      setDirection(SortDirectionEnum.Descending);
    }
  }, [sortField, field]);

  const handleClick = () => {
    if (field === sortField) {
      const newDirection = direction === SortDirectionEnum.Descending ? SortDirectionEnum.Ascending : SortDirectionEnum.Descending;

      onSortClick(field, newDirection);
      setDirection(newDirection);
    } else {
      onSortClick(field, direction);
    }
  };

  return (
    <MuiTableSortLabel active={field === sortField} direction={direction} onClick={handleClick}>
      {children}
    </MuiTableSortLabel>
  );
};

export { TableSortLabel };
