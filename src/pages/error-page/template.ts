const template = `
<div class="not-found">
  <div>
    <div class="pb-30">
      <h1 class="pb-30 headers-text">Упс! <br /></h1>
      <p>{{ text }}</p>
    </div>
    <button class="button" page="chat">Вернуться</button>
  </div>
  <img class="non-found-image" src="{{ img }}" alt="none" />
</div>
`;
// const template = `
// {{> NotFound text="Произошла ошибка на сервере..." img='/error.png'}}
// `;
export default template;
