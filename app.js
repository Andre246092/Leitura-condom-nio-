// app.js

document.addEventListener("DOMContentLoaded", function(){

  // pegar todos os inputs da tabela
  const inputs = document.querySelectorAll("table input");

  inputs.forEach((input, index) => {

    // carregar dados salvos
    let valorSalvo = localStorage.getItem("leitura_" + index);
    if(valorSalvo){
      input.value = valorSalvo;
    }

    // salvar automaticamente
    input.addEventListener("input", () => {
      localStorage.setItem("leitura_" + index, input.value);
    });

    // escuta tecla Enter para pular para a linha de baixo
    input.addEventListener("keydown", function(e){
      if(e.key === "Enter"){
        e.preventDefault(); // evita quebrar a página

        const currentCell = input.closest("td");
        const currentRow = input.closest("tr");
        const colIndex = Array.from(currentRow.children).indexOf(currentCell);
        const nextRow = currentRow.nextElementSibling;

        if(nextRow){
          const nextInput = nextRow.children[colIndex].querySelector("input");
          if(nextInput){
            nextInput.focus();
            nextInput.select(); // seleciona o valor para digitar rápido
          }
        }
      }
    });

  });

});

// -------------------- FUNÇÃO EXPORTAR PARA CSV --------------------
function exportarExcel(){

  let linhas = document.querySelectorAll("table tr");
  let csv = [];

  // cabeçalho
  csv.push("AP;Agua;Gas");

  linhas.forEach((linha, index)=>{
    if(index === 0) return; // pula o cabeçalho

    let colunas = linha.querySelectorAll("td");

    let ap = colunas[0].innerText;
    let agua = colunas[1].querySelector("input").value;
    let gas = colunas[2].querySelector("input").value;

    csv.push(`${ap};${agua};${gas}`);
  });

  let arquivo = csv.join("\n");
  let blob = new Blob([arquivo], {type:"text/csv"});
  let url = URL.createObjectURL(blob);

  let link = document.createElement("a");
  link.href = url;
  link.download = "leituras_condominio.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

}

// -------------------- FUNÇÃO LIMPAR CAMPOS --------------------
function limparCampos(){

  let confirmar = confirm("Tem certeza que deseja apagar todas as leituras?");

  if(confirmar){

    let inputs = document.querySelectorAll("table input");

    inputs.forEach((input, index) => {
      input.value = "";
      localStorage.removeItem("leitura_" + index);
    });

  }

}
