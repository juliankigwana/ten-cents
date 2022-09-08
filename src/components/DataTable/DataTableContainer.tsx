import { useEffect, useMemo, useRef, useState } from "react";

import { Spinner, UnableToLoad } from "@/components";
import { DataTableRepositoryFragment, useDataTableQuery } from "@/services";

import { DataTableView } from "./DataTableView";

const sortFieldsMap: { [key: string]: string } = {
  name: "name",
  stargazerCount: "stars",
  forkCount: "forks",
};

const DataTableContainer = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [activeSortField, setActiveSortField] = useState<string>("stargazerCount");
  const [query, setQuery] = useState(`is:public sort:${sortFieldsMap[activeSortField]}-desc`);
  const mapPageToEndCursor = useRef<{ [page: number]: string }>({});

  const variables = useMemo(
    () => ({
      after: mapPageToEndCursor.current[page - 1],
      first: pageSize,
      query,
    }),
    [page, pageSize, query]
  );

  const [{ data, fetching, error }] = useDataTableQuery({ variables });

  useEffect(() => {
    const endCursor = data?.search.pageInfo?.endCursor;
    if (!fetching && endCursor) {
      mapPageToEndCursor.current[page] = endCursor;
    }
  }, [page, fetching, data?.search.pageInfo?.endCursor]);

  const handlePageChange = (newPage: number) => {
    // The previous page has loaded so we can set the next page
    if (newPage === 0 || mapPageToEndCursor.current[newPage - 1]) setPage(newPage);
  };

  const handleSortChange = (activeSort: string) => {
    const sortField = sortFieldsMap[activeSort];

    if (sortField) {
      setQuery(`is:public sort:${sortField}-desc`);
    }

    setActiveSortField(activeSort);
  };

  const handleRowsPerPageChange = (newPage: number) => setPageSize(newPage);

  if (fetching && !data) return <Spinner />;
  if (error) return <UnableToLoad />;

  const repositories = data?.search.edges?.map((edge) => edge?.node) as DataTableRepositoryFragment[];

  return (
    <DataTableView
      activeSortField={activeSortField}
      fetching={fetching}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSortChange={handleSortChange}
      page={page}
      repositories={repositories || []}
      repositoryCount={data?.search.repositoryCount || 0}
      rowsPerPage={pageSize}
    />
  );
};

export { DataTableContainer };
