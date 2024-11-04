export function renderDOM(page) {
  console.log('renderDOM', page);
  return document.getElementById('app').appendChild(page.getContent());
}
