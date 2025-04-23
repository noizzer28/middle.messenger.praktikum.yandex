import { Modal } from './modal';
import { TProps } from '../../types';
import deleteChat from '../../api/chats/deleteChat';
export class ModalDeleteChat extends Modal {
  constructor(tagName: string, propsAndChilds: TProps) {
    super(tagName, {
      ...propsAndChilds,
      body: 'Удалить чат и всю историю сообщений?',
      buttontext: 'Подтвердить',
      events: {
        click: (e: Event) => this.handleSubmit(e)
      }
    });
  }

  private handleSubmit = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'button') {
      e.preventDefault();
      this.handleDelete();
    }
  };

  private handleDelete = async () => {
    try {
      await deleteChat.delete();
      this.setProps({ error: null, success: 'Успешно удалено' });
      setTimeout(() => {
        this.hide();
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        this.setProps({
          error: error.message,
          success: null
        });
        throw new Error(`Ошибка: ${error.message || error}`);
      }
    }
  };
}
