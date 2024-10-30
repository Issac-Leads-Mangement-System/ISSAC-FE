import axios from "axios";

class TeamApi {
  static token = localStorage.getItem("authToken");
  static getTeams = async (page: number) => {
    return await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/?page=${page + 1}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };

  static deleteUser = async (id: number) => {
    await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/users/delete_team/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };
}

export default TeamApi;
