const template = `
  <nav class="chat-aside">
    {{{search }}}
    {{{btn}}}
    <ul>
    {{#each chatList}}
      {{{this}}}  
    {{/each}}
    </ul>
  </nav>
  {{{chatMain}}}
  `;
export default template;

// {{#if chatMain}} {{{chatMain}}}
//   {{else}}
// <section class="chat-messages flex">
//         {{{asideMessage}}}
//         </section>
//         {{/if}}
