const template = `
<div class="modal-container pb-30">
  <form class="flex-column-form" id="regForm">
    <div class="headers-text">Регистрация</div>
    <div class="flex-column">
      {{#each inputs}}
      {{{this}}}
      {{/each}}
    </div>
      <div class="flex-column mt-30">
        {{{button}}}
        {{{secondaryButton}}}
      </div>
  </form>
</div>
  
  
  `;
export default template;

// {{> Input type='email' label='Почта' name='form' }}
// {{> Input type='input' label='Логин' name='form' }}
// {{> Input type='text' label='Имя' name='name'  }}
// {{> Input type='text' label='Фамилия' name='last-name'  }}
// {{> Input type='number' label='Телефон' name='phone'  }}
// {{> Input type='password' label='Пароль' name='password'  }}
// {{> Input type='password' label='Повторите пароль' name='rep-password' }}
