


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = ObterNomeUsuario();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);


    if(dificuldades.facil.ativo)    
    {
        pontuacao = parseInt(palavras) * dificuldades.facil.multiplicador;
    } else if(dificuldades.medio.ativo){
        pontuacao = parseInt(palavras) * dificuldades.medio.multiplicador;
    }
    else if(dificuldades.dificil.ativo){
        pontuacao = parseInt(palavras) * dificuldades.dificil.multiplicador;
    }

    var colunaPalavras = $("<td>").text(pontuacao);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    $(this).parent().parent().remove();
}

function ObterNomeUsuario(){

    var nome = null;

    while(!nome){
        
        var nome = prompt("Insira seu nome para salver seu recorde: ");

        if(!nome){

            alert("Nome inválido, insira um nome válido");

        }
    }

    return nome;

}
