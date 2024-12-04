const template = `
<div class="profile-container {{class}} ">
{{{buttonBack}}}
{{{avatar}}}
<table>
  <tbody>
    {{#each profileLine}}
      {{{this}}}  
    {{/each}}
  </tbody>
</table>
<table>
<tbody>
{{#each profileEdit}}
      {{{this}}}
    {{/each}}
  </tbody>
</table>
</div>

`;
export default template;
