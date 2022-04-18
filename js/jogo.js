let timeId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){
    let url = window.location.search;

    let nivel_jogo = url.replace("?", "");

    let tempo_segundos = 0;

    //nível 1 -> facil, 120segundos
    if(nivel_jogo == 1){
        tempo_segundos = 120;
    }

    //nível 2 -> medio, 60segundos
    if(nivel_jogo == 2){
        tempo_segundos = 60;
    }

    //nível 3 -> díficil, 30segundos
    if(nivel_jogo == 3){
        tempo_segundos = 30;
    }

    //inserindo segundos no span
    document.getElementById("cronometro").innerHTML = tempo_segundos;

    //quantidade de balões
    let qtde_baloes = 80;

    cria_baloes(qtde_baloes);

    //imprimir quantidade de balões inteiros
    document.getElementById("baloes_inteiros").innerHTML = qtde_baloes;

    //imprimir quantidade de balões estourados
    document.getElementById("baloes_estourados").innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);

}

function contagem_tempo(segundos){

    segundos -= 1;

    if(segundos == -1){
        clearTimeout(timeId); //para a execução da função settimeout;
        game_over();
        return false;
    }

    document.getElementById("cronometro").innerHTML = segundos;

    timeId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
    remove_eventos_baloes();
    alert("fim de jogo, você não conseguiu estourar todos os balões a tempo!!");
}

function cria_baloes(qtde_baloes){

    for(let i = 1; i <= qtde_baloes; i++){

        let balao = document.createElement("img");

        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = "10px";
        balao.id = "b" + i;
        balao.onclick = function(){ estourar(this); } 

        document.getElementById("cenario").appendChild(balao);
    }
}

function estourar(e){
    let id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png"

    pontuacao(-1)
}

function pontuacao(acao){

    let baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
    let baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros += acao;
    baloes_estourados -= acao;

    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros, baloes_estourados);
}

function situacao_jogo(baloes_inteiros){
    if (baloes_inteiros == 0){
        alert("parabéns, você conseguiu estourar todos os balões a tempo");
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timeId);
}

function remove_eventos_baloes() {
    let i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}