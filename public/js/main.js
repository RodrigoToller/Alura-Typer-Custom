var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var travarCronometro = false;

var classFacil = $(".facil");
var classMedio = $(".medio");
var classDificil = $(".dificil");

var dificulcadeFacil = $('#btn-dificuldadeFacil');
var dificuldadeMedia = $('#btn-dificuldadeMedia');
var dificuldadeDificil = $('#btn-dificuldadeDificil');

var dificuldades = 
{
    facil:{
        ativo: false,
        tempo: 60,
        multiplicador: 1.5
    }
    ,medio:{
        ativo: false,
        tempo: 30,
        multiplicador: 2.5

    }
    ,dificil:{

        ativo: false,
        tempo: 15,
        multiplicador: 3.5
    }
}


$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    
   
    $("#botao-reiniciar").click(reiniciaJogo);
    dificulcadeFacil.click(MudardificuldadeFacil);
    dificuldadeMedia.click(MudardificuldadeMedia);
    dificuldadeDificil.click(MudardificuldadeDificil);
   

});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function destaqueFrase(){
    var frase = $(".frase");    
    frase.addClass("frase-evidencia");
}
function removeDestaqueFrase(){
    var frase = $(".frase");
    frase.removeClass("frase-evidencia");
}


function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}




function MudardificuldadeFacil() {

    if(travarCronometro) return;
    if(dificuldades.facil.ativo == true) return;
    
    if(dificuldades.medio.ativo == true || dificuldades.dificil.ativo == true)
    {
        dificuldades.medio.ativo = false;
        dificuldades.dificil.ativo = false;
        classMedio.removeClass("medio-ativo");
        classDificil.removeClass("dificil-ativo");
    }

    classFacil.addClass("facil-ativo");
    tempoInicial = dificuldades.facil.tempo;
    $("#tempo-digitacao").text(tempoInicial);
    dificuldades.facil.ativo = true;
   

}
function MudardificuldadeMedia() {
 


    if(travarCronometro) return;
    if(dificuldades.medio.ativo == true) return;
    
    if(dificuldades.facil.ativo == true || dificuldades.dificil.ativo == true){
        dificuldades.facil.ativo = false;
        dificuldades.dificil.ativo = false;
        classFacil.removeClass("facil-ativo");
        classDificil.removeClass("dificil-ativo");
    
    }
    classMedio.addClass("medio-ativo");
    tempoInicial = dificuldades.medio.tempo;
    $("#tempo-digitacao").text(tempoInicial);
    dificuldades.medio.ativo = true;


}
function MudardificuldadeDificil() {

    if(travarCronometro) return;
    if(dificuldades.dificil.ativo == true) return;


    if(dificuldades.facil.ativo == true || dificuldades.medio.ativo == true){


        dificuldades.facil.ativo = false;
        dificuldades.medio.ativo = false;
        classFacil.removeClass("facil-ativo");
        classMedio.removeClass("medio-ativo");
    

    }

    classDificil.addClass("dificil-ativo");
    tempoInicial = dificuldades.dificil.tempo;
    $("#tempo-digitacao").text(tempoInicial);
    dificuldades.facil.ativo = false;
    dificuldades.medio.ativo = false;
    dificuldades.dificil.ativo = true;

}
function inicializaCronometro() {


    campo.one("focus", function() {
        
        var tempoRestante = $("#tempo-digitacao").text();
        if(DificuldadeSelecionada())
            {
                var cronometroID = setInterval(function() {
                    travarCronometro = true;
                    
                    tempoRestante--;
                    $("#tempo-digitacao").text(tempoRestante);
                    if (tempoRestante < 1) {
                        clearInterval(cronometroID);
                        finalizaJogo();
                    }
                }, 1000);
            }
            else{
                alert("Selecione uma dificuldade para jogar!");
            }
    	    
    });

    

    
}
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");

    var a = $(".frase")
    a.removeClass("frase-evidencia");

    travarCronometro = false;
    inserePlacar();
}
function reiniciaJogo() {

    if(travarCronometro) return;
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}
function DificuldadeSelecionada(){

    if(dificuldades.facil.ativo == false && 
       dificuldades.medio.ativo == false && 
       dificuldades.dificil.ativo == false)
       {
        return false;
       }

       else{
        var a = $(".frase")
        a.addClass("frase-evidencia");
        return true;
        
       }

}
