const template = `
  <div class="input-wrapper__label">{{ label }}</div>
  <input
    type="{{ type }}"
    class="input"
    name="{{ name }}"
    id="{{ name }}"
    value="{{ value }}"
    placeholder="{{ placeholder }}"
    autocomplete="{{ autocomplete }}"
  />
  {{#if eye}}{{{eye}}}{{/if}}
`;

export default template;
