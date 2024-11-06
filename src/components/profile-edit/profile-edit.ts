import '../profile-line/profile-line.scss';
import template from './template';
import Block from '../../services/Block';

class ProfileEdit extends Block {
  render() {
    return this.compile(template);
  }
}

export default ProfileEdit;
