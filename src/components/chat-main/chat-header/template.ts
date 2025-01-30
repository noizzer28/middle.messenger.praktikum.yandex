const template = `
      <div class="chat-main__header-wrapper">
          <div class='chat-main__avatar-wrapper'>
              <img class="chat-main__avatar" src="{{{avatar}}}" alt="avatar" />
                  <span>{{{title}}}</span>
          </div>
          {{{chatNav}}}
      </div>
`;

export default template;
