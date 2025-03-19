import HTTPTransport from '../HttpTransport';
import { CreateUserModel, LoginUserModel, CreateUserResponse } from '../types';

const authRegApi = new HTTPTransport();

export class AuthApi {
  createUser(data: CreateUserModel) {
    return authRegApi.post<CreateUserResponse>('auth/signup', {
      body: data
    });
  }

  login(data: LoginUserModel) {
    return authRegApi.post('auth/signin', {
      body: data
    });
  }

  getUser() {
    return authRegApi.get('auth/user');
  }
  logout() {
    return authRegApi.post('auth/logout');
  }
}
export default new AuthApi();
