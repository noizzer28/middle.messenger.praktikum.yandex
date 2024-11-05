const template = `
<div class="profile-container {{class}}">
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
// {{#> ProfileContainer}}
// {{>ButtonBack page="chat"}}
// {{> Avatar src='/profile.jpg' name="Noizzer"}}

// <table>
//   <tbody>
//     {{>ProfileLine caption="Почта" detail="email@ya.ru" type="email" readonly="true" name='email'}}
//     {{>ProfileLine caption="Логин" detail="login" type="text" readonly="true" name='login'}}
//     {{>ProfileLine caption="Имя" detail="Виктория" type="text" readonly="true" name='first-name'}}
//     {{>ProfileLine caption="Фамилия" detail="Ноунэйм" type="text" readonly="true" name='second-name'}}
//     {{>ProfileLine caption="Имя в чате" detail="noizzer" type="text" readonly="true" name='login'}}
//     {{>ProfileLine caption="Телефон" detail="+7(900)000-00-00" type="text" readonly="true" name='phone'}}
//   </tbody>
// </table>
// <table>
//   <tbody>
//     {{>ProfileEdit caption="Изменить данные"}}
//     {{>ProfileEdit caption="Изменить пароль"}}
//     {{>ProfileEdit class="color-red" caption="Выйти из аккаунта"}}
//   </tbody>
// </table>
// {{/ ProfileContainer}}
