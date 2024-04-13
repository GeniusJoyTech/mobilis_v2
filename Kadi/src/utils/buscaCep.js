export default async function buscarCEP(cep, setSend) {
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                window.alert('CEP não encontrado');
            } else {//Aqui eu posso realizar a inserção com os componentes corretos.
                setSend(prevSend => ({
                    ...prevSend,
                    rua: data.logradouro,
                    cidade: data.localidade
                }));
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
            window.alert('Por favor Verifique e tente novamente, algo não está certo.');
        });
}

