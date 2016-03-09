export const intlSelector = (state) => state.intl;

export const localeSelector = (state) => intlSelector(state).locale;
