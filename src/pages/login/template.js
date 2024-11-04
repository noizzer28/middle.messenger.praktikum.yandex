//  {{#> Container}}
// {{#> ModalContainer}}
// <form class="flex-column-form">
//   <div class="headers-text">Вход</div>
//   <div class="flex-column">
//     {{> Input type='input' label='Логин' name='login'}}
//     {{> Input type='password' label='Пароль' name='password'  }}
//   </div>
//   <div class="flex-column mt-30">
//     {{> Button text='Войти'}}

//     {{> SecondButton text='Нет аккаунта?' page="registration"}}
//   </div>
// </form>

// {{/ ModalContainer}}
// {{/ Container}}

const template = `

<div class='modal-container'>
<form class="flex-column-form">
  <div class="headers-text">Вход</div>
  <div class="flex-column">
{{#each items}}
  {{{this}}}  
{{/each}}
  </div>
  <div class="flex-column mt-30">
    {{{button}}}
    {{{secondButton}}}
  </div>
</form>
</div>

`;
export default template;
