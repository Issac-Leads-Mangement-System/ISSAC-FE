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

  static getTeamById = async (id: number) => {
    return await axios.get(
      `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/teams/${id}`,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };

  static updateTeam = async (values: any, id: any) => {
    return axios.put(
      `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/edit_team/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };

  static createTeam = async (values: any) => {
    return axios.post(
      `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/add_team`,
      values,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };

  static changePage = async (newPage: any, rowsPerPage: any) => {
    return await axios.get(
      `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/teams/?page=${
        newPage + 1
      }&limit=${rowsPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };

  static changeRowsPerPage = async (value: any, page: any) => {
    return await axios.get(
      `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/teams/?page=${
        page === 0 ? page + 1 : page
      }&limit=${parseInt(value, 10)}`,
      {
        headers: {
          Authorization: `Bearer ${TeamApi.token}`,
        },
      }
    );
  };
}

export default TeamApi;
