//__________DADOS DO IMC____________
const dadosImc = [
    {
        min: 0,
        max: 18.4,
        classificacao: "Menor que 18,5",
        status: "Magreza",
        obesidade: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classificacao: "Entre 18,5 e 24,9",
        status: "Normal",
        obesidade: "0",
    },
    {
        min: 25,
        max: 29.9,
        classificacao: "Entre 25,0 e 29,9",
        status: "Sobrepeso",
        obesidade: "I",
    },
    {
        min: 30,
        max: 39.9,
        classificacao: "Entre 30,0 e 39,9",
        status: "Obesidade",
        obesidade: "II",
    },
    {
        min: 40,
        max: 99,
        classificacao: "Maior que 40,0",
        status: "Obesidade grave",
        obesidade: "III",
    }
];

//_____________SELEÇÃO DE ELEMENTOS DO DOCUMENTO____________
//elementos do container do formulário
const containerFormulario = document.querySelector("#container-formulario");
const inputAltura = document.querySelector("#altura");
const inputPeso = document.querySelector("#peso");
const btnCalcular = document.querySelector("#btn-calcular");
const btnLimpar = document.querySelector("#btn-limpar");

//elementos do container de resultado do calculo IMC
const containerResultado = document.querySelector("#container-resultado");
const tabelaImc = document.querySelector("#tabela-imc");
const imcValor = document.querySelector("#imc-valor span");
const imcStatus = document.querySelector("#imc-status span");
const btnVoltar = document.querySelector("#btn-voltar");

//_____________FUNÇÕES_________________
//função de calculo do IMC
function calcularImc(altura, peso){
    const valorImc = (peso / (altura * altura)).toFixed(1); //toFixed arredonda o valor

    return valorImc;
}

//função para limpar os campos de input
function limparInputs(){
    inputAltura.value = "";
    inputPeso.value = "";
}

//função pra limitar digitar só números nos campos de input
function validacaoValorDigitado(texto){
    return texto.replace(/[^0-9,]/g, "");
}
//função de mostrar ou esconder containers
function mostrarOuEsconderContainer(){
    containerFormulario.classList.toggle("esconder");
    containerResultado.classList.toggle("esconder");
}

// função para criar cada linha da tabela de dados do IMC
function criarTabelaImc(dadosImc){
    dadosImc.forEach((dadoImc) => {
        
        //cria a div das linhas 
        const linhaTabela = document.createElement("div");
        linhaTabela.classList.add("tabela-linha");
        
        //inserindo dados na primeira coluna
        const classificacao = document.createElement("p");
        classificacao.innerText = dadoImc.classificacao;
        //inserindo dados na segunda coluna
        const status = document.createElement("p");
        status.innerText = dadoImc.status;
        //inserindo dados na terceira coluna
        const obesidade = document.createElement("p");
        obesidade.innerText = dadoImc.obesidade;

        //incluir as informações do IMC na div linhaTabela 
        linhaTabela.appendChild(classificacao);
        linhaTabela.appendChild(status);
        linhaTabela.appendChild(obesidade);

        //incluir na tabela as informacoes de cada linhaTabela
        tabelaImc.appendChild(linhaTabela);
    });
}

//_________________EVENTOS________________
//evento de validação dos campos do input
[inputAltura, inputPeso].forEach((elemento) =>{
    elemento.addEventListener("input", (evento) => {
        const atualizarValor = validacaoValorDigitado(evento.target.value);

        evento.target.value = atualizarValor;
    });
});

//evento que efetua o calculo do IMC ao Clicar no botão
btnCalcular.addEventListener("click", (evento) =>{
    evento.preventDefault();
    
    const altura = +inputAltura.value.replace(",", "."); // repleace troca ',' por '.' e o sinal de mais na frente converte o tipo para numerico
    const peso = +inputPeso.value.replace(",", "."); 
    
    if(!altura || !peso) return;

    const valorImc = calcularImc(altura, peso);

    let status;
    
    dadosImc.forEach((dadoImc) =>{
        if (valorImc >= dadoImc.min && valorImc <= dadoImc.max) {
            status = dadoImc.status;            
        }
    });

    if (!status) return;

    imcValor.innerText = valorImc;
    imcStatus.innerText = status;

    mostrarOuEsconderContainer();
});

//evento de clicar no botão limpar os campos
btnLimpar.addEventListener("click", (evento) => {
    evento.preventDefault();    
    limparInputs();
});

//evento de clique no botao voltar da tela de resultado
btnVoltar.addEventListener("click", () => {
    limparInputs();
    mostrarOuEsconderContainer();
});

//_________________INICIALIZAÇÃO________________
//chama a função que insere os dados do ICM na tabela 
criarTabelaImc(dadosImc);
