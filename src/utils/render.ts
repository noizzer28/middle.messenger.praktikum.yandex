import Block from '@/services/Block';

// export function renderDOM(page: Block): HTMLElement {
//   // console.log('renderDOM', page);
//   const app = document.getElementById('app');
//   if (!app) throw new Error("Element with id 'app' not found");
//   app.innerHTML = '';

//   return app.appendChild(page.getContent());
// }

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.replaceChildren(block.getContent());
  }
  return root;
}
