# Exercícios — Closure

> **Lembrete:** closure é a capacidade de uma função acessar o seu **escopo léxico** (as variáveis do lugar onde ela foi *criada*), mesmo depois que a função externa já terminou de executar.
>
> Crie um arquivo `.js` para cada exercício (ex.: `ex01.js`) e rode com `node ex01.js`.
> Tente resolver sem olhar as dicas. Abra a dica só se travar.

---

## Nível 1 — Aquecimento

### Exercício 1 — Saudação personalizada

Crie uma função `criaSaudacao(saudacao)` que retorna outra função. A função retornada recebe um `nome` e retorna a frase completa.

```js
const bomDia = criaSaudacao('Bom dia')
const boaNoite = criaSaudacao('Boa noite')

console.log(bomDia('Gabriel'))   // Bom dia, Gabriel!
console.log(boaNoite('Maria'))   // Boa noite, Maria!
```

<details>
<summary>Dica</summary>

A função interna "lembra" do parâmetro `saudacao` da função externa.
</details>

---

### Exercício 2 — Multiplicador

Crie `criaMultiplicador(fator)` que retorna uma função que multiplica um número pelo `fator`.

```js
const dobro = criaMultiplicador(2)
const triplo = criaMultiplicador(3)

console.log(dobro(5))   // 10
console.log(triplo(5))  // 15
console.log(dobro(10))  // 20
```

**Pergunta para responder num comentário:** `dobro` e `triplo` compartilham o mesmo `fator`? Por quê?

---

### Exercício 3 — Prevendo a saída

Sem rodar o código, escreva num comentário o que vai aparecer no console. Depois rode e confira.

```js
function externa() {
    const mensagem = 'Estou no escopo da externa'

    function interna() {
        console.log(mensagem)
    }

    return interna
}

const minhaFuncao = externa()
minhaFuncao()
```

E este?

```js
const banda = 'Iron Maiden'

function mostraBanda() {
    console.log(banda)
}

function executa() {
    const banda = 'Metallica'
    mostraBanda()
}

executa()
```

<details>
<summary>Dica</summary>

Escopo **léxico** = onde a função foi **escrita**, não onde ela foi **chamada**.
</details>

---

## Nível 2 — Estado privado

### Exercício 4 — Contador

Crie `criaContador()` que retorna uma função. Cada vez que a função retornada é chamada, ela incrementa e retorna o valor do contador.

```js
const contador1 = criaContador()
const contador2 = criaContador()

console.log(contador1()) // 1
console.log(contador1()) // 2
console.log(contador1()) // 3
console.log(contador2()) // 1  -> closure independente!
```

**Desafio extra:** faça `criaContador(inicio)` aceitar um valor inicial (padrão `0`).

---

### Exercício 5 — Contador com vários métodos

Evolua o exercício anterior: `criaContador()` agora retorna um **objeto** com três funções.

```js
const c = criaContador()

c.incrementar()
c.incrementar()
c.incrementar()
c.decrementar()
console.log(c.valor())   // 2

console.log(c.contagem)  // undefined  -> a variável é privada!
```

<details>
<summary>Dica</summary>

Declare a variável dentro de `criaContador` e retorne `{ incrementar, decrementar, valor }`. As três funções compartilham o **mesmo** closure.
</details>

---

### Exercício 6 — Conta bancária

Crie `criaConta(titular, saldoInicial)` que retorna um objeto com:

- `depositar(valor)` — soma ao saldo. Não aceita valor menor ou igual a zero.
- `sacar(valor)` — subtrai do saldo. Se não tiver saldo suficiente, exibe `Saldo insuficiente`.
- `verSaldo()` — retorna uma string formatada.

O `saldo` **não pode** ser acessado nem alterado diretamente de fora.

```js
const conta = criaConta('Gabriel', 100)

conta.depositar(50)
conta.sacar(500)            // Saldo insuficiente
conta.sacar(30)
console.log(conta.verSaldo()) // Gabriel, seu saldo é R$ 120.00

conta.saldo = 1000000
console.log(conta.verSaldo()) // Gabriel, seu saldo é R$ 120.00  (nada mudou!)
```

<details>
<summary>Dica</summary>

Use `valor.toFixed(2)` para formatar com duas casas decimais.
</details>

---

### Exercício 7 — Setlist de show

Crie `criaSetlist(nomeDaBanda)` que retorna um objeto com:

- `adicionar(musica)` — adiciona uma música à lista.
- `remover(musica)` — remove uma música da lista.
- `tocar()` — exibe no console a banda e as músicas numeradas.
- `total()` — retorna quantas músicas tem.

```js
const show = criaSetlist('Sepultura')
show.adicionar('Roots Bloody Roots')
show.adicionar('Refuse/Resist')
show.adicionar('Territory')
show.remover('Refuse/Resist')
show.tocar()
// Setlist do Sepultura:
// 1. Roots Bloody Roots
// 2. Territory

console.log(show.total()) // 2
```

**Desafio extra:** `tocar()` não deve permitir que alguém de fora altere o array interno. Pesquise como devolver uma **cópia** do array (`[...array]` ou `array.slice()`) e crie um método `listar()` que retorne essa cópia.

---

## Nível 3 — Pegadinhas e usos reais

### Exercício 8 — A pegadinha do `var` no loop

Rode este código e observe a saída:

```js
const funcoes = []

for (var i = 0; i < 3; i++) {
    funcoes.push(function () {
        return i
    })
}

console.log(funcoes[0]()) // ?
console.log(funcoes[1]()) // ?
console.log(funcoes[2]()) // ?
```

1. Escreva num comentário **por que** a saída é essa.
2. Corrija trocando `var` por `let` e explique a diferença.
3. Corrija **mantendo o `var`**, usando uma função que cria um novo escopo para cada volta do loop.

<details>
<summary>Dica</summary>

`var` tem escopo de **função**, não de bloco. Só existe **um** `i` para todas as funções. Já `let` cria um `i` novo a cada iteração.
Para o item 3: crie uma função que recebe `i` como parâmetro e retorna outra função.
</details>

---

### Exercício 9 — Executar só uma vez

Crie `umaVez(fn)` que recebe uma função e retorna uma nova função que só executa `fn` **na primeira chamada**. Nas chamadas seguintes, retorna o mesmo resultado da primeira vez.

```js
function iniciarSistema() {
    console.log('Sistema iniciado!')
    return 'OK'
}

const iniciar = umaVez(iniciarSistema)

console.log(iniciar()) // Sistema iniciado!  /  OK
console.log(iniciar()) // OK   (não exibe "Sistema iniciado!" de novo)
console.log(iniciar()) // OK
```

<details>
<summary>Dica</summary>

Guarde no closure duas variáveis: uma flag `jaExecutou` e o `resultado`.
</details>

---

### Exercício 10 — Gerador de IDs

Crie `criaGeradorDeId(prefixo)` que retorna uma função. Cada chamada gera um ID único e sequencial com o prefixo.

```js
const idUsuario = criaGeradorDeId('USER')
const idPedido = criaGeradorDeId('PED')

console.log(idUsuario()) // USER-001
console.log(idUsuario()) // USER-002
console.log(idPedido())  // PED-001
console.log(idUsuario()) // USER-003
```

<details>
<summary>Dica</summary>

Pesquise `String(numero).padStart(3, '0')`.
</details>

---

### Exercício 11 — Memoização (cache)

Crie `memoizar(fn)` que recebe uma função de **um argumento** e retorna uma versão dela com cache. Se a função já foi chamada com aquele argumento, devolve o valor salvo sem calcular de novo.

```js
function quadradoLento(n) {
    console.log(`Calculando ${n}...`)
    return n * n
}

const quadrado = memoizar(quadradoLento)

console.log(quadrado(4)) // Calculando 4...  /  16
console.log(quadrado(4)) // 16   (veio do cache, sem "Calculando")
console.log(quadrado(5)) // Calculando 5...  /  25
```

<details>
<summary>Dica</summary>

Use um objeto `{}` como cache dentro do closure. Verifique se a chave existe com `n in cache`.
</details>

---

## Desafio final — Limitador de tentativas

Crie `criaLogin(senhaCorreta, maxTentativas)` que retorna uma função `tentar(senha)`.

- Senha certa: exibe `Acesso liberado` e zera as tentativas.
- Senha errada: exibe `Senha incorreta. Restam X tentativas`.
- Ao estourar o limite: exibe `Conta bloqueada` e **nunca mais** libera, nem com a senha certa.

```js
const login = criaLogin('metal123', 3)

login('abc')       // Senha incorreta. Restam 2 tentativas
login('xyz')       // Senha incorreta. Restam 1 tentativas
login('metal123')  // Acesso liberado

const login2 = criaLogin('rock', 2)
login2('a')        // Senha incorreta. Restam 1 tentativas
login2('b')        // Conta bloqueada
login2('rock')     // Conta bloqueada
```

---

## Checklist de fixação

Depois de resolver tudo, tente responder com suas palavras (num comentário ou caderno):

- [ ] O que é escopo léxico?
- [ ] Por que a variável da função externa não "morre" quando ela termina de executar?
- [ ] Duas chamadas de `criaContador()` geram closures iguais ou independentes?
- [ ] Como o closure permite criar variáveis **privadas** em JS?
- [ ] Qual a diferença entre `var` e `let` dentro de um loop com closures?
