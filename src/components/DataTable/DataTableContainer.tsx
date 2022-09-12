import { useState } from "react";

import { Spinner, UnableToLoad } from "@/components";
import { DataTableRepositoryFragment, useDataTableQuery } from "@/services";

import { SortDirectionEnum } from "./";
import { DataTableView } from "./DataTableView";

const sortFieldMap: { [key: string]: string } = {
  name: "name",
  stargazerCount: "stars",
  forkCount: "forks",
};

const DataTableContainer = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<string>("stargazerCount");
  const [query, setQuery] = useState(`is:public sort:${sortFieldMap[sortField]}-desc`);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);

  const [{ data, fetching, error }] = useDataTableQuery({
    variables: {
      after: endCursor,
      first: pageSize,
      query,
    },
  });

  const handlePageChange = (newPage: number) => {
    if (!fetching) {
      setPage(newPage);
      if (data?.search.pageInfo?.endCursor) {
        setEndCursor(data?.search.pageInfo?.endCursor);
      }
    }
  };

  const handleSortChange = (newSortField: string, direction: SortDirectionEnum) => {
    const sortFieldQuery = sortFieldMap[newSortField];

    if (sortFieldQuery) {
      setQuery(`is:public sort:${sortFieldQuery}-${direction}`);
    }

    setSortField(newSortField);
  };

  const handleRowsPerPageChange = (newPage: number) => setPageSize(newPage);

  if (fetching && !data) return <Spinner />;
  if (error) return <UnableToLoad />;

  const repositories = data?.search.edges?.map((edge) => edge?.node) as DataTableRepositoryFragment[];

  return (
    <DataTableView
      fetching={fetching}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onSortChange={handleSortChange}
      page={page}
      repositories={repositories || []}
      repositoryCount={data?.search.repositoryCount || 0}
      rowsPerPage={pageSize}
      sortField={sortField}
    />
  );
};

export { DataTableContainer };
