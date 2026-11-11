/*
aula de clojure 
funcao que cria outra funcao
clojure é a habilidade que a função tem de acessar o seu escopo léxico
o clojure da fuénção anonima (que é retornada)  o escopo da retornaFuncao
ou seja, nessa caso, a const nome
clojure não precisa ser unico
posso ter const funcao = retornaFuncao() e const funcao2 = retornaFuncao()
cada uma tem um clojure 
*/

function retornaFuncao(){
    const nome = 'Gabriel'
    return function(){
        return nome
    }
}

const funcao = retornaFuncao()
console.log(funcao())