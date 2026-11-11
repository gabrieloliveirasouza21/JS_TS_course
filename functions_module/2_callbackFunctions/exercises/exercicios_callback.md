# Exercícios — Funções Callback

> **Lembrete:** callback é uma função passada como **argumento** para outra função, para ser executada **depois** (quando uma ação termina ou acontece).
>
> Crie um arquivo `.js` para cada exercício (ex.: `ex01.js`) e rode com `node ex01.js`.
> Tente resolver sem olhar as dicas. Abra a dica só se travar.

---

## Nível 1 — Callbacks síncronos

### Exercício 1 — Calculadora com callback

Crie a função `calcular(a, b, operacao)`, onde `operacao` é um callback que recebe `a` e `b` e retorna o resultado.

Crie também as funções `somar`, `subtrair`, `multiplicar` e `dividir`.

```js
console.log(calcular(10, 5, somar))        // 15
console.log(calcular(10, 5, subtrair))     // 5
console.log(calcular(10, 5, multiplicar))  // 50
console.log(calcular(10, 5, dividir))      // 2
```

**Desafio extra:** chame `calcular` passando uma função anônima que calcula a potência (`a ** b`), sem criar uma função nomeada.

---

### Exercício 2 — Passar a função vs. executar a função

Qual a diferença entre as duas linhas abaixo? Escreva num comentário e depois rode para confirmar.

```js
function digaOi() {
    console.log('Oi!')
    return 'retorno do digaOi'
}

function executa(callback) {
    console.log('Vou executar o callback...')
    callback()
}

executa(digaOi)    // linha A
executa(digaOi())  // linha B
```

<details>
<summary>Dica</summary>

Na linha B, os parênteses executam `digaOi` **antes** de chamar `executa`. O que é passado então como argumento?
</details>

---

### Exercício 3 — Repetir N vezes

Crie `repetir(vezes, callback)` que executa o callback `vezes` vezes, passando o número da vez atual (começando em 1).

```js
repetir(3, function (n) {
    console.log(`Execução número ${n}`)
})
// Execução número 1
// Execução número 2
// Execução número 3
```

---

### Exercício 4 — Recriando o forEach

Crie sua própria função `meuForEach(array, callback)`. O callback recebe `(elemento, indice, array)`, igual ao `forEach` original.

```js
const bandas = ['Angra', 'Sepultura', 'Krisiun']

meuForEach(bandas, function (banda, i) {
    console.log(`${i + 1}. ${banda}`)
})
// 1. Angra
// 2. Sepultura
// 3. Krisiun
```

**Não use** `forEach`, `map` ou `filter` dentro da sua função. Use `for`.

---

### Exercício 5 — Recriando map e filter

Agora crie `meuMap(array, callback)` e `meuFilter(array, callback)`.

- `meuMap` retorna um **novo** array com o retorno do callback para cada elemento.
- `meuFilter` retorna um **novo** array só com os elementos em que o callback retornou `true`.

```js
const numeros = [1, 2, 3, 4, 5, 6]

console.log(meuMap(numeros, n => n * 2))          // [2, 4, 6, 8, 10, 12]
console.log(meuFilter(numeros, n => n % 2 === 0)) // [2, 4, 6]
console.log(numeros)                              // [1, 2, 3, 4, 5, 6]  (original intacto)
```

---

## Nível 2 — Callbacks assíncronos com setTimeout

> Use a função `rand` da aula para gerar tempos aleatórios:
>
> ```js
> function rand(min = 1000, max = 3000) {
>     const num = Math.random() * (max - min) + min
>     return Math.floor(num)
> }
> ```

### Exercício 6 — Prevendo a ordem

Sem rodar, escreva num comentário a ordem em que as mensagens aparecem. Depois rode e confira.

```js
console.log('1 - início')

setTimeout(function () {
    console.log('2 - dentro do setTimeout')
}, 0)

console.log('3 - fim')
```

**Pergunta:** por que o `setTimeout` com `0` milissegundos não executa imediatamente?

<details>
<summary>Dica</summary>

Pesquise sobre **event loop** e **call stack**. O callback do `setTimeout` só roda depois que todo o código síncrono terminar.
</details>

---

### Exercício 7 — Passagem de som

Uma banda vai fazer a passagem de som antes do show. Cada etapa demora um tempo aleatório (use `rand()`).

Crie as funções `afinarGuitarras(callback)`, `testarBateria(callback)` e `testarVocal(callback)`. Cada uma exibe sua mensagem dentro de um `setTimeout` e depois chama o callback.

As etapas **precisam** acontecer nessa ordem, mesmo com tempos aleatórios:

```
Guitarras afinadas
Bateria testada
Vocal testado
Tudo pronto! Abram os portões!
```

1. Faça primeiro rodando as três funções em sequência **sem callback** e veja a ordem bagunçar.
2. Depois corrija usando callbacks aninhados (funções anônimas).
3. Por fim, refatore usando **funções nomeadas** (como no final da aula), para fugir do *callback hell*.

---

### Exercício 8 — Callback com dados

Crie `buscarUsuario(id, callback)` que simula uma consulta ao banco: espera `rand(500, 1500)` ms e chama o callback **passando o usuário encontrado**.

```js
const usuarios = [
    { id: 1, nome: 'Gabriel', banda: 'Iron Maiden' },
    { id: 2, nome: 'Ana', banda: 'Nightwish' },
]

buscarUsuario(2, function (usuario) {
    console.log(`${usuario.nome} curte ${usuario.banda}`)
})
// (depois de um tempo) Ana curte Nightwish
```

---

### Exercício 9 — Padrão erro primeiro (error-first callback)

No Node.js é comum o callback receber `(erro, resultado)`. Se deu erro, `erro` vem preenchido e `resultado` vem `null`. Se deu certo, `erro` vem `null`.

Altere `buscarUsuario` do exercício anterior para seguir esse padrão. Se o id não existir, retorne o erro `Usuário não encontrado`.

```js
buscarUsuario(1, function (erro, usuario) {
    if (erro) return console.log('Erro:', erro)
    console.log('Achei:', usuario.nome)
})
// Achei: Gabriel

buscarUsuario(99, function (erro, usuario) {
    if (erro) return console.log('Erro:', erro)
    console.log('Achei:', usuario.nome)
})
// Erro: Usuário não encontrado
```

---

## Nível 3 — Juntando tudo

### Exercício 10 — Encadeando dados

Usando o padrão erro-primeiro, crie três funções assíncronas (cada uma com `setTimeout` e `rand()`):

- `buscarBanda(nome, callback)` — retorna `{ nome, idAlbumMaisFamoso }`
- `buscarAlbum(idAlbum, callback)` — retorna `{ titulo, ano, idMusicaPrincipal }`
- `buscarMusica(idMusica, callback)` — retorna `{ titulo, duracao }`

Cada função depende do resultado da anterior. No final, exiba:

```
Banda: Angra
Álbum mais famoso: Holy Land (1996)
Música principal: Carolina IV - 10:36
```

Monte seus próprios "bancos de dados" com arrays de objetos. Trate o erro em **cada** etapa.

**Reflexão:** observe como o código fica para a direita (pirâmide). Isso é o *callback hell*. Anote o que te incomoda nesse formato. É exatamente o problema que **Promises** e **async/await** resolvem (você vai ver mais à frente no curso).

---

### Exercício 11 — Executar todos e avisar no final

Crie `executarTodos(tarefas, callbackFinal)`.

- `tarefas` é um array de funções. Cada uma recebe um callback `pronto` e o chama quando termina.
- As tarefas rodam **ao mesmo tempo** (não uma depois da outra).
- `callbackFinal` só deve ser chamado quando **todas** terminarem.

```js
function tarefa(nome) {
    return function (pronto) {
        setTimeout(function () {
            console.log(`${nome} concluída`)
            pronto()
        }, rand())
    }
}

executarTodos([tarefa('Montar palco'), tarefa('Ligar luzes'), tarefa('Testar PA')], function () {
    console.log('Todas as tarefas concluídas!')
})
// As três mensagens aparecem em ordem aleatória,
// e "Todas as tarefas concluídas!" sempre por último.
```

<details>
<summary>Dica</summary>

Use um contador de tarefas concluídas (olha o **closure** aparecendo aqui!). Quando o contador chegar em `tarefas.length`, chame o `callbackFinal`.
</details>

---

## Desafio final — Debounce

Quando o usuário digita numa barra de busca, não queremos pesquisar a cada tecla. Queremos esperar ele **parar de digitar** por um tempo.

Crie `debounce(callback, espera)` que retorna uma nova função. Toda vez que essa nova função é chamada, ela **cancela** a chamada agendada anterior e agenda uma nova. O callback só roda se passar `espera` ms sem nenhuma nova chamada.

```js
const buscar = debounce(function (termo) {
    console.log(`Buscando por: ${termo}`)
}, 500)

buscar('m')
buscar('me')
buscar('met')
buscar('meta')
buscar('metal')
// Depois de 500ms, aparece só:
// Buscando por: metal
```

<details>
<summary>Dica</summary>

Pesquise `clearTimeout`. Guarde o retorno do `setTimeout` numa variável dentro do closure. Esse exercício une **callback + closure**.
</details>

---

## Checklist de fixação

Depois de resolver tudo, tente responder com suas palavras (num comentário ou caderno):

- [ ] O que é uma função callback?
- [ ] Qual a diferença entre passar `funcao` e `funcao()` como argumento?
- [ ] Callback é sempre assíncrono? Dê um exemplo de callback síncrono.
- [ ] Por que usar callbacks para garantir a ordem de execução de tarefas assíncronas?
- [ ] O que é *callback hell* e como as funções nomeadas ajudam a reduzir o problema?
- [ ] O que é o padrão *error-first*?
