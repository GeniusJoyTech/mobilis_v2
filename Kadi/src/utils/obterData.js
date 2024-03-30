
export default function obterData(x) {
    const dataAtual = new Date();
    const dataModificada = new Date(dataAtual);
    dataModificada.setDate(dataAtual.getDate() + x);

    const dia = dataModificada.getDate();
    const mes = dataModificada.getMonth() + 1;
    const ano = dataModificada.getFullYear();

    return { dia, mes, ano };
}