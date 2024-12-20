export interface CreateUserModel {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
export interface CreateUserResponse {
  id: number;
}

export interface LoginUserModel {
  login: string;
  password: string;
}
