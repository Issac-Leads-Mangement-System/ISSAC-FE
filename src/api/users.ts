import axios from "axios";

class UserApi {
  static token = localStorage.getItem("authToken");
  static getUsers = async (page: number) => {
    return await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/?page=${page + 1}&limit=5`,
      {},
      {
        headers: {
          Authorization: `Bearer ${UserApi.token}`,
        },
      }
    );
  };

  static deleteUser = async (id: number) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/users/delete_user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${UserApi.token}`,
        },
      }
    );
  };
}

export default UserApi;
