import requestApi from '../utils/requestApi';
import getAuthToken from '../utils/authorization';

const h_api = async (fetchData, setData, mensagem) => {
    
    const { url, method, body } = fetchData;
    const requestData = {
      url: url,
      token: getAuthToken(),
      method: method,
      body: body,
    };
    const result = await requestApi(requestData);
    if(result.length == 0 && mensagem != null){mensagem};
    if(setData){setData(result)};
};

export default h_api;