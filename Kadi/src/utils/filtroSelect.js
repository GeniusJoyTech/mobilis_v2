export default function filtro(data, exibir){
    
    data.forEach(objeto => {
        for (let chave in objeto) {
            if (!exibir.find(item => item.row === chave)) {
                delete objeto[chave];
            }
        }
    });
}
