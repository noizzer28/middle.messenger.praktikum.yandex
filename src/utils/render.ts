import Block from '@/services/Block';

export function renderDOM(page: Block): HTMLElement {
  // console.log('renderDOM', page);
  const app = document.getElementById('app');
  if (!app) throw new Error("Element with id 'app' not found");
  app.innerHTML = '';

  return app.appendChild(page.getContent());
}
