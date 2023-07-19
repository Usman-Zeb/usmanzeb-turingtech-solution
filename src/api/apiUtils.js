import axios from "axios";
const API_URL = "https://frontend-test-api.aircall.io";

export const getToken = async (username, password) => {
  try {
    axios
      .post(API_URL + "/auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.access_token) {
          console.log("Inside getToken: " + JSON.stringify(response.data));
          //const mykey = JSON.stringify(response.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      });
  } catch (e) {
    console.log(e.err);
  }
};

export const getData = async (offset, total) => {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.access_token;
  return axios
    .get(API_URL + `/calls?offset=${offset}&limit=${total}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const totalCount = JSON.stringify(response.data.totalCount);
      const hasNextPage = JSON.stringify(response.data.hasNextPage);

      const calls = JSON.stringify(response.data.nodes) || [];
      return [calls, totalCount, hasNextPage];
    })
    .catch((e) => {
      console.log(e.err);
    });
};

export const archiveCall = async (id, isArchived) => {
  let user = JSON.parse(localStorage.getItem("user"));
  const token = user.access_token;
  axios
    .put(API_URL + `/calls/${id}/archive`, isArchived, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const call = response.data;
      console.log(call);
    })
    .catch((e) => {
      console.log(e.err);
    });
};

export const addNote = async (id, note) => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("USSS:" + id);
  const token = user.access_token;
  try {
    axios.post(
      API_URL + `/calls/${id}/note`,
      { content: note },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
     
    );
    console.log("success!");
  } catch (e) {
    console.log(e.err);
  }
};