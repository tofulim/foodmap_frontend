import axios from "axios";

const getGeocoding = async (query: string) => {
  try {
    const res = await axios({
      url: "/map-geocode/v2/geocode",
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_MAP_API_ID,
        "X-NCP-APIGW-API-KEY": process.env.REACT_APP_MAP_API_KEY,
      },
      params: {
        query: query,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default getGeocoding;
