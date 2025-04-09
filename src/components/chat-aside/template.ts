const template = `
  <div class="chat-list__avatar">
    <img src="{{ avatar }}" alt="avatar" />
  </div>
  <div class="chat-list__data">
    <h2 class="chat-list__data__chat-name">{{ chatName }}</h2>
    <p class="chat-list__data__chat-message">
      {{#if you}} <span class="chat-list__data__span">Вы:</span>{{/if}}
      {{ lastMessage }}
    </p>
  </div>
  <div class="chat-list__time">
    {{ time }}
  </div>
`;

export default template;
