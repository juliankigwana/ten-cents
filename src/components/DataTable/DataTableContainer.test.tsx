import { render } from "@testing-library/react";
import { CombinedError } from "urql";

import { Spinner, UnableToLoad } from "@/components";
import { DataTableRepositoryFragment, useDataTableQuery } from "@/services";

import { data } from "./__graphql__";
import { DataTableContainer } from "./DataTableContainer";
import { DataTableView } from "./DataTableView";

jest.mock("./DataTableView", () => ({ DataTableView: jest.fn() }));
jest.mock("@/components", () => ({ Spinner: jest.fn(), UnableToLoad: jest.fn() }));
jest.mock("@/services", () => ({ useDataTableQuery: jest.fn() }));

type SetupOptions = {
  useDataTableQueryImplementation: typeof useDataTableQuery;
};

const expectedValues = {
  fetching: false,
  onPageChange: expect.any(Function),
  onRowsPerPageChange: expect.any(Function),
  page: 0,
  repositories: data.search.edges?.map((edge) => edge?.node) as DataTableRepositoryFragment[],
  repositoryCount: data.search.repositoryCount,
  rowsPerPage: 10,
};

const setup = (options?: Partial<SetupOptions>) => {
  (DataTableView as jest.Mock).mockImplementation(() => null);
  (Spinner as jest.Mock).mockImplementation(() => null);
  (UnableToLoad as jest.Mock).mockImplementation(() => null);

  const setupOptions: SetupOptions = {
    useDataTableQueryImplementation: () => [{ data, error: undefined, fetching: false, stale: false }, () => undefined],
    ...options,
  };

  (useDataTableQuery as jest.Mock).mockImplementation(setupOptions.useDataTableQueryImplementation);

  return render(<DataTableContainer />);
};

describe("DataTableContainer", () => {
  it("renders DataTableView", () => {
    setup();

    expect(DataTableView).toHaveBeenCalledWith(expectedValues, expect.anything());
  });

  describe("when query returns no data", () => {
    it("renders DataTableView with no data", () => {
      setup({ useDataTableQueryImplementation: () => [{ data: undefined, error: undefined, fetching: false, stale: false }, () => undefined] });

      expect(DataTableView).toHaveBeenCalledWith({ ...expectedValues, repositories: [], repositoryCount: 0 }, expect.anything());
    });
  });

  describe("when query is fetching", () => {
    describe("when query returns no data", () => {
      it("renders Spinner", () => {
        setup({ useDataTableQueryImplementation: () => [{ data: undefined, error: undefined, fetching: true, stale: false }, () => undefined] });

        expect(Spinner).toHaveBeenCalled();
      });
    });

    describe("when query returns with data", () => {
      it("renders DataTableView", () => {
        // It is possible to return both fetching and data as the urql graphql client retains its previous data until the query completes
        setup({ useDataTableQueryImplementation: () => [{ data, error: undefined, fetching: true, stale: false }, () => undefined] });

        expect(DataTableView).toHaveBeenCalledWith({ ...expectedValues, fetching: true }, expect.anything());
      });
    });
  });

  describe("when error", () => {
    it("renders UnableToLoad", () => {
      setup({ useDataTableQueryImplementation: () => [{ data, error: new CombinedError({}), fetching: false, stale: false }, () => undefined] });

      expect(UnableToLoad).toHaveBeenCalled();
    });
  });
});
