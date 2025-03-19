import authApi from './authApi';

class GetUserInfoController {
  public async getInfo() {
    try {
      const response = await authApi.getUser();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Ошибка:', error.message);
        throw new Error(error.message);
      }
    }
  }
}
export default new GetUserInfoController();
