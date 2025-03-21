const template = `

<div class='login-container'>
<form class="flex-column-form" id="login-form">
  <div class="headers-text">Вход</div>
  <div class="flex-column">
  {{#each items}}
    {{{this}}}  
  {{/each}}
  {{{error}}}
  </div>
  <div class="flex-column mt-30">
    {{{button}}}
    {{{secondButton}}}
  </div>
</form>
</div>

`;
export default template;
