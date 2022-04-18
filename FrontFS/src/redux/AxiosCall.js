import axios from "axios";
const baseUrl = "http://localhost:8000";

axios({
  method: "get",
  url: `${baseUrl}/api/salon/1`,
}).then((response) => {
  console.log(response.data);
});

axios.get(`${baseUrl}/api/salon`).then((response) => {
  console.log(response.data);
});

export const getetchBarber = async () => {
  const url = `${baseUrl}/api/salon`;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};
