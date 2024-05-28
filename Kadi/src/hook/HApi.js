import requestApi from '../utils/requestApi';
import getAuthToken from '../utils/authorization';

const h_api = async (fetchData, setData) => {
    
    const { url, method, body } = fetchData;
    const requestData = {
      url: url,
      token: getAuthToken(),
      method: method,
      body: body,
    };
    const result = await requestApi(requestData);
    if(result.length == 0){alert("Sua solicitação retornou um elemento vazio, nada consta.")}
    if(setData){setData(result)};
};

export default h_api;