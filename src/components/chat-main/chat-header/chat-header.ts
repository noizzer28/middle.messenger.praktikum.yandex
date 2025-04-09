import template from './template';
import Block from '../../../services/Block';
import './chat-header.scss';
import { TProps, TStore } from '../../../types';
import { connect } from '../../../services/connect';
import { getAvatarLink } from '../../../utils/avatarLink';
import chatDropdown from '../chat-dropdown/chat-dropdown';
import { ModalChatAvatar } from '../../modal/modalChatAvatar';

class ChatHeader extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'chat-main__header'
      }
    });
  }
  componentDidMount() {
    this.addAvatarListener();
  }
  addAvatarListener() {
    const btn = this.getContent().querySelector('#chat-avatar');
    btn?.addEventListener('click', () => {
      const modalChatAvatar = new ModalChatAvatar('div', {});
      modalChatAvatar.show();
    });
  }
  render() {
    return this.compile(template);
  }
}

function mapStateToHeader(state: TStore) {
  const activeChat = state.activeChat;
  return {
    avatar: getAvatarLink(activeChat?.avatar) || null,
    title: activeChat?.title || null,
    chatNav: chatDropdown
  };
}

const Connect = connect(ChatHeader, mapStateToHeader);
export const chatHeader = new Connect('header', {});
