import { TablePagination } from "@mui/material";
import { useTable } from "@xest-ui/data-table";

function calculatePage(from: any, to: any, rowsPerPage: any, totalRows: any) {
  from = Math.max(1, from);
  to = Math.min(totalRows, to);

  const page = Math.ceil((from - 1) / rowsPerPage);

  return page;
}

function MyPaginator() {
  const {
    data: {
      goToFirstPage,
      goToNextPage,
      goToLastPage,
      goToPreviousPage,
      pageSize,
      metadata = { total: 0, from: 0, to: 0 }, // Default value for metadata incase we have no data
      setPageSize,
    },
  } = useTable();
  const { total, from, to } = metadata;

  const currentPage = calculatePage(from, to, pageSize, total);

  const pageSizes = [5, 10, 25].concat(total! > 25 ? total : ([] as any));
  const ariaLabelFor = {
    first: "Go to first page",
    previous: "Go to previous page",
    next: "Go to next page",
    last: "Go to last page",
  };

  return (
    <TablePagination
      component="div"
      sx={{
        "& .MuiTablePagination-toolbar": {
          flexWrap: "wrap",
          justifyContent: "flex-end",
        },
      }}
      labelRowsPerPage="Rows per page"
      labelDisplayedRows={({ from: start, to: end, count }) => `${start}-${end} of ${count}`}
      getItemAriaLabel={(type) => ariaLabelFor[type]}
      count={total || 0} // Replace with the actual count
      onPageChange={(_, page) => {
        if (page === 0) return goToFirstPage();
        if (total) {
          if (page === Math.floor(total / pageSize)) {
            goToLastPage();
          }
        }
      }} // Replace with the actual onPageChange handler
      page={currentPage || 0} // Replace with the actual page number
      rowsPerPage={pageSize} // Replace with the actual number of rows per page
      rowsPerPageOptions={pageSizes}
      onRowsPerPageChange={(e) => {
        setPageSize(Number(e.target.value));
        goToFirstPage();
      }}
      showFirstButton
      showLastButton
      nextIconButtonProps={{
        onClick: goToNextPage,
      }}
      backIconButtonProps={{
        onClick: () => {
          goToPreviousPage();
        },
      }}
    />
  );
}

export default MyPaginator;
