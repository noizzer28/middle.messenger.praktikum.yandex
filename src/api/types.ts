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
export interface CreateChatInterface {
  title: string;
}
export interface ChangeChatUsersInterface {
  users: [number];
  chatId: number | undefined;
}
export interface DeleteChatInterface {
  chatId: number;
}

export type SearchResponse = {
  avatar: string | null;
  display_name: string | null;
  first_name: string;
  id: number;
  login: string;
  second_name: string;
};
export type SearchDeleteResponse = {
  avatar: string | null;
  display_name: string | null;
  first_name: string;
  id: number;
  login: string;
  role: string;
  second_name: string;
};
