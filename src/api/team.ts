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
      `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/delete_team/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };
}

export default TeamApi;
