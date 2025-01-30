import userApi from './userApi';
import { SearchResponse } from '../types';
class SearchUser {
  public async searchUser(login: string) {
    try {
      const resp = (await userApi.searchUser({
        login: login
      })) as SearchResponse[];
      return resp;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new SearchUser();
