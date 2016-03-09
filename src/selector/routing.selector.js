export const routingSelector = (state) => state.routing;

export const pathnameSelector = (state) => routingSelector(state).pathname;
