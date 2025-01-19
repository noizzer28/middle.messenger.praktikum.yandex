import HTTPTransport from '../HttpTransport';
import { ChangeUserData, ChangeUserPassword, SearchUser } from '../types';

const userApi = new HTTPTransport();

export class UserApi {
  changeProfile(data: ChangeUserData) {
    return userApi.put<ChangeUserData>('user/profile', {
      body: data
    });
  }

  changeAvatar(data: FormData) {
    return userApi.put('user/profile/avatar', {
      body: data
    });
  }

  changePassword(data: ChangeUserPassword) {
    return userApi.put<ChangeUserPassword>('user/password', {
      body: data
    });
  }

  searchUser(data: SearchUser) {
    return userApi.post('user/search', {
      body: data
    });
  }
}
export default new UserApi();
