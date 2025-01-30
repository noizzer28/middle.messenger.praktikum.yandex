import userApi from './userApi';
import store from '../../services/Store';
import { ChangeUserPassword } from '../types';

class ChangePasswordController {
  public async changePassword(data: ChangeUserPassword) {
    try {
      const response = await userApi.changePassword(data);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Неизвестная ошибка');
      }
    }
  }
}
export default new ChangePasswordController();
