const template = `
<div class="login-container pb-30">
  <form class="flex-column-form" id="regForm">
    <div class="headers-text">Регистрация</div>
    <div class="flex-column">
      {{#each inputs}}
      {{{this}}}
      {{/each}}
      {{{error}}}
    </div>
      <div class="flex-column mt-30">
        {{{button}}}
        {{{secondaryButton}}}
      </div>
  </form>
</div>
  
  
  `;
export default template;
