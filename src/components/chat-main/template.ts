const template = `
  {{#if asideMessage}}
    <section class="chat-messages flex">
          {{{asideMessage}}}
          </section>
   {{else}}
          {{{header}}}

            <div class="chat-main" id="chat-scroll">
              {{#each message}}
                     {{{this}}}
              {{/each}}
            </div>
          <div class="chat-main__input-wrapper">
          <input
            type="text"
            name="message"
            placeholder="Cообщение"
            id='chat-input'
            />
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28" fill="none" id="chat-input__btn">
          <circle cx="14" cy="14" r="14" fill="#1c7cd0"></circle>
          <rect x="8" y="13.2" width="11" height="1.6" fill="white"></rect>
          <path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"></path>
          </svg>
          </div>
          
          {{/if}}`;

export default template;
