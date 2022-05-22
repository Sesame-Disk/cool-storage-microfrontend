import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

export const ApiPing = () => {
  axios.get(`${api_url}/api/v1/ping`).then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
};

export const GetToken = async (user, pass, callback) => {
  await axios
    .post(
      `${api_url}/api/v1/auth-token`,
      new URLSearchParams({
        username: user,
        password: pass,
      })
    )
    .then((response) => {
      if (response.status === 200) {
        callback(null, response.data.token);
      } else callback(response.status + ": " + response.statusText);
    })
    .catch((err) => {
      console.log("API_ERROR: " + err);
    });
};

export const VerifyToken = async (api_token, callback) => {
  await axios
    .get(
      api_url + "/auth/ping/",
      { key: "value" },
      {
        headers: {
          Authorization: `Token ${api_token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.data === "pong") {
          callback();
          return;
        }
        callback(response.data);
      } else callback(response.status + ": " + response.statusText);
    })
    .catch((err) => {
      console.log("API_ERROR: " + err);
    });
};
