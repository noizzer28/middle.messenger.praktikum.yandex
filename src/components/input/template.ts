const template = `
  <div class="input-wrapper__label">{{ label }}</div>
  <input
    type="{{ type }}"
    class="input"
    name="{{ name }}"
    value="{{ value }}"
    placeholder="{{ placeholder }}"
    autocomplete="{{ autocomplete }}"
  />
`;

export default template;
