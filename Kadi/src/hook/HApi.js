import requestApi from '../utils/requestApi';
import getAuthToken from '../utils/authorization';

const h_api = async (fetchData, setData) => {
  try {
    const { url, method } = fetchData;
    const requestData = {
      url: url,
      token: getAuthToken(),
      method: method,
    };
    const result = await requestApi(requestData);
    setData(result);
  } catch (error) {
    console.error('Erro durante o fetch de dados: ', error);
  }
};

export default h_api;