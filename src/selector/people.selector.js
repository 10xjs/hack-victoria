export const peopleSelector = (state) => state.people;

export const personSelector = (state, id) => peopleSelector(state)[id];
