// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// CONSULTA A API DE LIVROS PARA POPULAR AS VARIAVEIS DO GRAFICO
function getLivro(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

data = getLivro("http://localhost:8080/livros");
livros = JSON.parse(data);

// OBJETO PARA ARMAZENAR AS QUANTIDADES POR CATEGORIA
const quantidadesPorCategoria = {};

// CALCULAR A QUANTIDADE POR CATEGORIA
livros.forEach(livro => {
    const categoriaId = livro.categoria.id;
    quantidadesPorCategoria[categoriaId] = (quantidadesPorCategoria[categoriaId] || 0) + 1;
});

// CRIA ARRAY DE OBJETOS
const novoJson = Object.keys(quantidadesPorCategoria).map(categoriaId => {
    const categoriaNome = livros.find(livro => livro.categoria.id === parseInt(categoriaId)).categoria.nome;
    return {
        id: parseInt(categoriaId),
        nome: categoriaNome,
        quantidade: quantidadesPorCategoria[categoriaId]
    };
});

// POPULA AS VARIAVEIS PARA LABEL, DATA E TAMANHO DO GRAFICO
nome = novoJson.map(function(elem){
	return elem.nome;
})
quantidade = novoJson.map(function(elem){
	return elem.quantidade;
})
quantidadeMax = Math.max.apply(null, quantidade) + 5;

// GRAFICO
var ctx = document.getElementById("graficoQtdCategoria");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: nome,
    datasets: [{
      label: "Quantidade",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: quantidade,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: quantidadeMax,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});