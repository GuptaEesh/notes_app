import { FILTER_ACTIONS } from "../../../helpers/utils/constants";

const resetFilters = (dispatch) =>
  dispatch({
    type: FILTER_ACTIONS.CLEAR_FILTERS,
  });
const latestToOldHandler = (dispatch) =>
  dispatch({
    type: FILTER_ACTIONS.LATEST_TO_OLD,
    payload: "LATEST_TO_OLD",
  });
const oldToLatestHandler = (dispatch) =>
  dispatch({
    type: FILTER_ACTIONS.OLD_TO_LATEST,
    payload: "OLD_TO_LATEST",
  });
const priorityHandler = (priority, dispatch) => {
  dispatch({
    type: FILTER_ACTIONS.PRIORITY_HANDLE,
    payload: priority,
  });
};
export {
  resetFilters,
  latestToOldHandler,
  oldToLatestHandler,
  priorityHandler,
};
