import './profile-line.scss';
import template from './template';
import Block from '../../services/Block';

class ProfileLine extends Block {
  render() {
    return this.compile(template);
  }
}

export default ProfileLine;
