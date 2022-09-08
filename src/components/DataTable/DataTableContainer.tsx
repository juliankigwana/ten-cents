import { useEffect, useMemo, useRef, useState } from "react";

import { DataTableRepositoryFragment, useDataTableQuery } from "@/services";

import { DataTableView } from "./DataTableView";

const DataTableContainer = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const mapPageToNextCursor = useRef<{ [page: number]: string }>({});

  const variables = useMemo(
    () => ({
      after: mapPageToNextCursor.current[page - 1],
      first: pageSize,
      query: "is:public",
    }),
    [page, pageSize]
  );

  const [{ data, fetching, error }] = useDataTableQuery({ variables });

  useEffect(() => {
    const endCursor = data?.search.pageInfo?.endCursor;
    if (!fetching && endCursor) {
      mapPageToNextCursor.current[page] = endCursor;
    }
  }, [page, fetching, data?.search.pageInfo?.endCursor]);

  const handlePageChange = (newPage: number) => {
    if (newPage === 0 || mapPageToNextCursor.current[newPage - 1]) setPage(newPage);
  };

  const handleRowsPerPageChange = (newPage: number) => setPageSize(newPage);

  if (fetching && !data) return <>loading</>;
  if (error) return <>error</>;

  const repositories = data?.search.edges?.map((edge) => edge?.node) as DataTableRepositoryFragment[];

  return (
    <DataTableView
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={page}
      repositories={repositories || []}
      repositoryCount={data?.search.repositoryCount || 0}
      rowsPerPage={pageSize}
    />
  );
};

export { DataTableContainer };
