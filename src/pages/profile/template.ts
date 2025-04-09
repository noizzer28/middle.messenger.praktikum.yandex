const template = `
<div class="profile-container {{class}} ">
{{{buttonBack}}}
{{{avatar}}}
<form id="profile-form">
  <table>
    <tbody>
      {{#each profileLine}}
        {{{this}}}
      {{/each}}
    </tbody>
  </table>
</form>
<table>
{{{error}}}
<tbody>
{{#each profileEdit}}
      {{{this}}}
    {{/each}}
  </tbody>
</table>
</div>

`;
export default template;
