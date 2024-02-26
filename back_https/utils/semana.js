function f_semana(diaDaSemana) {
    let numeroDia;
  
    switch (diaDaSemana) {
      case 0:
        numeroDia = 7; // Domingo
        break;
      case 1:
        numeroDia = 1; // Segunda-feira
        break;
      case 2:
        numeroDia = 2; // Terça-feira
        break;
      case 3:
        numeroDia = 3; // Quarta-feira
        break;
      case 4:
        numeroDia = 4; // Quinta-feira
        break;
      case 5:
        numeroDia = 5; // Sexta-feira
        break;
      case 6:
        numeroDia = 6; // Sábado
        break;
      default:
        console.log("Erro: Dia inválido");
    }
  
    return numeroDia;
  }
  
  // Exemplo de uso:
  let diaAtual = new Date().getDay();
  let numeroDoDia = obterNumeroDoDia(diaAtual);
  console.log("Número do dia da semana: " + numeroDoDia);
  