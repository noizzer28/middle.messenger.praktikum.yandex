const template = `
  <td class="table-line">{{ caption }}</td>
  <td class="table-line__last">
    <input
      type="{{ type }}"
      class="table-input"
      name="{{ name }}"
      value="{{ detail }}"
      {{#if readonly}}readonly{{/if}}
    />
  </td>

`;

export default template;
