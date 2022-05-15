const sortByDate = (filters, data) => {
  switch (filters.sortByDate) {
    case "LATEST_TO_OLD":
      return [...data].sort((a, b) => {
        const firstDate = new Date(a.createdAt);
        const secondDate = new Date(b.createdAt);
        return secondDate - firstDate;
      });
    case "OLD_TO_LATEST":
      return [...data].sort((a, b) => {
        const firstDate = new Date(a.createdAt);
        const secondDate = new Date(b.createdAt);
        return firstDate - secondDate;
      });
    default:
      return data;
  }
};
const prioritySort = (filters, data) => {
  if (!filters.priority) return data;
  else return [...data].filter((note) => note.priority === filters.priority);
};
let getFiltered =
  (...fns) =>
  (filters, data) =>
    fns.reduce((acc, curr) => curr(filters, acc), data);

export { sortByDate, getFiltered, prioritySort };
