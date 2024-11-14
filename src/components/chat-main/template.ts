const template = `
    <header class="chat-main__header" >

      <div class="chat-main__header-wrapper">
          <div class='chat-main__avatar-wrapper'>
              <img class="chat-main__avatar" src="{{{avatar}}}" alt="avatar" />
                  <span>{{{chatName}}}</span>
          </div>
      </div>
    </header>
        <div class="chat-main">
            <div class="chat-main__date">{{{time}}}</div>
            <div class='chat-main__block {{#if you}} receiver
    {{else}}
 sender
          {{/if}}'>
                <p>{{{lastMessage}}}</p>
                 <span>{{{time}}}</span>
            </div>
        </div>
        <div class="chat-main__input-wrapper">
          <input
            type="text"
            name="message"
            value="{{ value }}"
            placeholder="Cообщение"
            autocomplete="{{ autocomplete }}"
            />
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="14" fill="#1c7cd0"></circle>
  <rect x="8" y="13.2" width="11" height="1.6" fill="white"></rect>
  <path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"></path>
</svg>

       
  </div>
`;

export default template;
