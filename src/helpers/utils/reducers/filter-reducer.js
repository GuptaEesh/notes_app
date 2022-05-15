import { FILTER_ACTIONS } from "../constants";

const initialFilters = {
  sortByDate: "",
  priority: 0,
};

const filtersReducer = (filters, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.LATEST_TO_OLD:
      return {
        ...filters,
        sortByDate: action.payload,
      };
    case FILTER_ACTIONS.OLD_TO_LATEST:
      return {
        ...filters,
        sortByDate: action.payload,
      };
    case FILTER_ACTIONS.PRIORITY_HANDLE:
      return {
        ...filters,
        priority: action.payload,
      };
    case FILTER_ACTIONS.CLEAR_FILTERS:
      return initialFilters;
    default:
      return filters;
  }
};
export { initialFilters, filtersReducer };
