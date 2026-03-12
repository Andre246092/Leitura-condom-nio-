

// pegar todos os inputs
let inputs = document.querySelectorAll("input");

// carregar dados salvos
inputs.forEach((input, index) => {

let valorSalvo = localStorage.getItem("leitura_" + index);

if(valorSalvo){
input.value = valorSalvo;
}

// salvar automaticamente
input.addEventListener("input", () => {

localStorage.setItem("leitura_" + index, input.value);

});

});

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


// limpar campos
function limparCampos(){

let confirmar = confirm("Tem certeza que deseja apagar todas as leituras?");

if(confirmar){

let inputs = document.querySelectorAll("input");

inputs.forEach((input, index) => {

input.value = "";
localStorage.removeItem("leitura_" + index);

});

}

}