export interface CreateUserModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
export interface ChangeUserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
export interface CreateUserResponse {
  id: number;
}
export interface SearchUser {
  login: string;
}
export interface ChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface LoginUserModel {
  login: string;
  password: string;
}
