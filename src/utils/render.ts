import Block from '../services/Block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.replaceChildren(block.getContent());
  }
  return root;
}
