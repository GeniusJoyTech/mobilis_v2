import requestApi from '../utils/requestApi';
import getAuthToken from '../utils/authorization';

const h_api = async (fetchData, setData) => {
  try {
    const { url, method, body } = fetchData;
    const requestData = {
      url: url,
      token: getAuthToken(),
      method: method,
      body: body,
    };
    const result = await requestApi(requestData);
    if(setData){setData(result)};
  } catch (error) {
    console.error('Erro durante o fetch de dados: ', error);
  }
};

export default h_api;