document.addEventListener("DOMContentLoaded", function(){

  const inputs = document.querySelectorAll("table input");

  inputs.forEach((input, index) => {

    // carregar dados salvos
    let valorSalvo = localStorage.getItem("leitura_" + index);
    if(valorSalvo){
      input.value = valorSalvo;
    }

    // salvar automaticamente
    input.addEventListener("input", () => {

      // formatação automática
      if(input.classList.contains("agua")){
        input.value = formatarAgua(input.value);
      }

      if(input.classList.contains("gas")){
        input.value = formatarGas(input.value);
      }

      localStorage.setItem("leitura_" + index, input.value);

    });

    // ENTER pula para linha de baixo
    input.addEventListener("keydown", function(e){

      if(e.key === "Enter"){

        e.preventDefault();

        const currentCell = input.closest("td");
        const currentRow = input.closest("tr");

        const colIndex = Array.from(currentRow.children).indexOf(currentCell);

        const nextRow = currentRow.nextElementSibling;

        if(nextRow){

          const nextInput = nextRow.children[colIndex].querySelector("input");

          if(nextInput){
            nextInput.focus();
            nextInput.select();
          }

        }

      }

    });

  });

});

// -------- FORMATAÇÃO --------

function formatarAgua(valor){

  valor = valor.replace(/\D/g,"");

  if(valor === "") return "";

  valor = (valor/100).toFixed(2);

  return valor.replace(".",",");

}

function formatarGas(valor){

  valor = valor.replace(/\D/g,"");

  if(valor === "") return "";

  valor = (valor/1000).toFixed(3);

  return valor.replace(".",",");

}

// -------- EXPORTAR EXCEL --------

function exportarExcel(){

  let linhas = document.querySelectorAll("table tr");

  let csv = [];

  csv.push("AP;Agua;Gas");

  linhas.forEach((linha, index)=>{

    if(index === 0) return;

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

// -------- LIMPAR CAMPOS --------

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
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
