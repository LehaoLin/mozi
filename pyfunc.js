import axios from "axios";

export const call_py = async (api_name, data) => {
  // api_name: "/..."
  const url = "http://localhost:5600";
  let result = await axios({
    method: "post",
    url: `${url}${api_name}`,
    data: data,
    timeout: 2000,
    headers: {
      "Content-type": "application/json",
    },
  });
  return result.data;
};
