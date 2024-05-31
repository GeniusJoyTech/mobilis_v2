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
      if (response.status === 401) {
        window.location.href = '/login';
      }
      else if (response.status === 403) {
        return response.json().then(error => {
          redirecionar(error.cargo)
        });
      }
      else if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erro na solicitação da API:', error);
      throw error;
    });
};

function redirecionar(cargo) {
  switch (cargo) {
    case 'Supervisor':
      window.location.href = '/sup';
      break;
    case 'Administrador':
      window.location.href = '/adm';
      break;
    case 'Promotor':
      window.location.href = '/pro';
      break;
    default:
      window.location.href = '/login';
  }
}


export default requestApi;
