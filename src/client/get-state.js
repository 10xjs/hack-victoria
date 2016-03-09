export default () => {
  const element = document.getElementById('state');
  return JSON.parse(element.textContent || element.innerText || '{}');
};
