const template = `
  <nav class="chat-aside">
    {{{search }}}
    <ul>
    {{#each chatList}}
      {{{this}}}  
    {{/each}}
    </ul>
  </nav>
  {{#if chosenChat}} {{{chosenChat}}}
    {{else}}
  <section class="chat-messages flex">
          Выберите чат чтобы отправить сообщение
          </section>
          {{/if}}

`;
export default template;
