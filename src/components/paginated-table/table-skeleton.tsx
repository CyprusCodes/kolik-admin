import type { FC } from "react";
import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

interface TableSkeletonProps {
  rows?: number;
  cols: number;
}

export const TableSkeleton: FC<TableSkeletonProps> = ({ rows = 5, cols }) => (
  <TableBody>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <TableRow key={rowIndex}>
        {Array.from({ length: cols }).map((__, colIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={colIndex}>
            <Skeleton variant="text" width={colIndex === 0 ? "60%" : "40%"} />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

export default TableSkeleton;
