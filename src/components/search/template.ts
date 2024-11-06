const template = `<header class="chat-header">
  <div class="chat-header__link">
    <p page="{{ page }}">Профиль</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
    >
      <path d="M1 9L5 5L1 1" stroke="#999999" />
    </svg>
  </div>
  <div class="chat-header__input">
    <input type="text" placeholder="Поиск" />
  </div>
</header>
`;

export default template;
