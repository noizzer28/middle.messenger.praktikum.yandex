import './search.scss';
import template from './template';
import Block from '../../services/Block';

class Search extends Block {
  render() {
    return this.compile(template);
  }
}

const search = new Search('header', {
  attr: {
    class: 'chat-header'
  },
  page: '/settings'
});
export default search;
