export default (source) => (next) => (reducer, initialState) => {
  const store = next(reducer, initialState);
  return {
    ...store,
    ...source,
  };
};
