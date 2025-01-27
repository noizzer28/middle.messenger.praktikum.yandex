import template from './template';
import Block from '../../../services/Block';
import './chat-header.scss';
import { TProps, TStore } from '../../../types';
import { connect } from '../../../services/connect';
import { getAvatarLink } from '../../../utils/avatarLink';
import chatDropdown from '../chat-dropdown/chat-dropdown';

class ChatHeader extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      attr: {
        class: 'chat-main__header'
      }
    });
  }
  render() {
    return this.compile(template);
  }
}

function mapStateToHeader(state: TStore) {
  const activeChat = state.activeChat;
  if (activeChat) {
    console.log('active chat header', activeChat);
    return {
      avatar: getAvatarLink(activeChat.avatar),
      title: activeChat.title,
      chatNav: chatDropdown
    };
  } else {
    return {
      avatar: null
    };
  }
}

const Connect = connect(ChatHeader, mapStateToHeader);
export const chatHeader = new Connect('header', {});
