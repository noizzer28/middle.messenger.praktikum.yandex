const template = `
    <header class="chat-main__header" >

      <div class="chat-main__header-wrapper">
          <div class='chat-main__avatar-wrapper'>
              <img class="chat-main__avatar" src="{{{avatar}}}" alt="avatar" />
                  <span>{{{chatName}}}</span>
          </div>
          {{{chatNav}}}
      </div>

    </header>
`;

export default template;
