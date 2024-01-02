const requestApi = (data) => {
  let requestOptions = {
    method: data.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${data.token}`,
    },
  };
  if (data.body) {
    requestOptions.body = JSON.stringify(data.body);
  }

  return fetch(data.url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
    });
};

export default requestApi;
