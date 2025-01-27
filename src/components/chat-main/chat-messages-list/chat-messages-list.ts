import template from './template';
import Block from '../../../services/Block';
import { TProps, TStore } from '../../../types';
import { formatDate } from '../../../utils/formatDate';
import { connect } from '../../../services/connect';

class ChatMessagesList extends Block {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds
    });
  }
  render() {
    return this.compile(template);
  }
}

// function mapStateToMessenger(state: TStore) {
//   const activeMessages = state.activeMessages;
//   const userId = state.user?.id;
//   if (activeMessages.length > 0) {
//     // return activeMessages.map((message) => {
//     //   const isCurrentUser = message.user_id === userId ? true : null;
//     //   return {
//     //     you: isCurrentUser,
//     //     text: message.content,
//     //     time: formatDate(message.time)
//     //   };
//     // });
//     return {
//       text: 'message text'
//     };
//   } else {
//     return {
//       text: 'Здесь нет сообщений'
//     };
//   }
// }

// const Connect = connect(ChatMessagesList, mapStateToMessenger);
// export const chatMessagesList = new Connect('main', {});

export default ChatMessagesList;
