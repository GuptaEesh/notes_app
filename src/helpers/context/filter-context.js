import { createContext, useContext, useReducer } from "react";
import { useData } from "./data-context";
import {
  getFiltered,
  sortByDate,
  prioritySort,
} from "../utils/filter-functions";
import { filtersReducer, initialFilters } from "../utils";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filters, dispatchFilter] = useReducer(filtersReducer, initialFilters);
  const {
    data: { pinnedNotes, unPinnedNotes },
  } = useData();

  let finalArray = getFiltered(sortByDate, prioritySort)(filters, [
    ...pinnedNotes,
    ...unPinnedNotes,
  ]);
  return (
    <FilterContext.Provider value={{ filters, dispatchFilter, finalArray }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
