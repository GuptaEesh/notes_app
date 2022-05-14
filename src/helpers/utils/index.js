export { dataReducer, initialData } from "./reducers/data-reducer";
export { filtersReducer, initialFilters } from "./reducers/filter-reducer";


export { loginHandler,signUpHandler,getNotes,handleNoteTemporaryDeletion,addNote,handleNoteArchive,handleNotePin,deleteNote,updateNote  } from "./server-requests";

export { instance as axios } from "./axios";
export { requests } from "./constants"
