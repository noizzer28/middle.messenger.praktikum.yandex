const template = `
  <nav class="chat-aside">
    {{{search }}}
    <ul>
    {{#each chatList}}
      {{{this}}}  
    {{/each}}
    </ul>
  </nav>
  <section class="chat-messages flex">
    Выберите чат чтобы отправить сообщение
  </section>

`;
// const template = `<main class="chat">
//   <nav class="chat-aside">
//     {{> Search page="profile"}}
//     <ul>
//       {{> ChatList avatar="/profile.jpg" you="Вы" chatName='Lorem ipsum' lastMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" chatName='Movies search' lastMessage="Check out the last one" time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" you="Вы" chatName='Hangout september' lastMessage="Lorem ipsum dolor sit amet, consectetur." time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" chatName='Movies search' lastMessage="Check out the last one" time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" you="Вы" chatName='Lorem ipsum' lastMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" chatName='Movies search' lastMessage="Check out the last one" time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" you="Вы" chatName='Hangout september' lastMessage="Lorem ipsum dolor sit amet, consectetur." time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" chatName='Movies search' lastMessage="Check out the last one" time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" you="Вы" chatName='Lorem ipsum' lastMessage="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" chatName='Movies search' lastMessage="Check out the last one" time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" you="Вы" chatName='Hangout september' lastMessage="Lorem ipsum dolor sit amet, consectetur." time="10:34"}}
//       {{> ChatList avatar="/profile.jpg" chatName='Movies search' lastMessage="Check out the last one" time="10:34"}}
//     </ul>
//   </nav>
//   <section class="chat-messages flex">
//     Выберите чат чтобы отправить сообщение
//   </section>
// </main>
// `;

export default template;
