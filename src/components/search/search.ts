import './search.scss';
import template from './template';
import Block from '../../services/Block';

class Search extends Block {
  render() {
    return this.compile(template);
  }
}
export default Search;
