import userApi from './userApi';
import store from '../../services/Store';
import { modalAddUser } from '../../components/chat-main/chat-dropdown/chat-dropdown';
import addUsertoChat from '../chats/addUsertoChat';

type SearchResponse = {
  avatar: string | null;
  display_name: string | null;
  first_name: string;
  id: number;
  login: string;
  second_name: string;
};
class SearchUser {
  public async searchUser(login: string) {
    try {
      if (!login) {
        modalAddUser.setProps({
          body_2: 'Введите логин'
        });
        modalAddUser.show();
        return;
      }
      const resp = (await userApi.searchUser({
        login: login
      })) as SearchResponse[];
      console.log(resp);
      if (resp.length === 0) {
        modalAddUser.setProps({
          body_2: 'Пользователи не найдены'
        });
        modalAddUser.show();
        return;
      } else {
        addUsertoChat.addUser(resp[0]?.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new SearchUser();
