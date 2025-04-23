const template = `
      <div class="chat-main__header-wrapper">
          <div class='chat-main__avatar-wrapper'>
            <div class="rel chat-main__avatar-container" >
                <img class="chat-main__avatar" src="{{avatar}}" alt="avatar" />
                <div class='chat-main__avatar-shadow' id="chat-avatar">Изменить</div>
            </div>
            <span>{{{title}}}</span>
            </div>
            {{{chatNav}}}
            </div>
  `;
//   <img class="chat-main__avatar" src="{{{avatar}}}" alt="avatar" />

export default template;
