let secreto = sortear();
let tentativas = 0;
const MAX_TENTATIVAS = 7;

const form = document.getElementById("form");
const chute = document.getElementById("chute");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("tentativas");
const btnChutar = document.getElementById("btn-chutar");
const btnNovo = document.getElementById("btn-novo");

document.getElementById("max").textContent = MAX_TENTATIVAS;

function sortear() {
  return Math.floor(Math.random() * 101);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = Number(chute.value);

  if (!Number.isInteger(valor) || valor < 0 || valor > 100) {
    mensagem.textContent = "Digite um número inteiro de 0 a 100.";
    return;
  }

  tentativas++;
  contador.textContent = tentativas;

  if (valor === secreto) {
    mensagem.textContent = `Acertou em ${tentativas} tentativa(s)! 🐆`;
    chute.disabled = true;
    btnChutar.disabled = true;
    btnNovo.hidden = false;
  } else if (tentativas >= MAX_TENTATIVAS) {
    mensagem.textContent = `Fim de jogo! O número era ${secreto} 😿`;
    chute.disabled = true;
    btnChutar.disabled = true;
    btnNovo.hidden = false;
  } else {
    mensagem.textContent = valor < secreto ? "É maior! ⬆️" : "É menor! ⬇️";
  }
  chute.value = "";
  chute.focus();
});

btnNovo.addEventListener("click", () => {
  dicasUsadas = 0;
  secreto = sortear();
  tentativas = 0;
  contador.textContent = 0;
  mensagem.textContent = "";
  chute.disabled = false;
  btnChutar.disabled = false;
  btnNovo.hidden = true;
  chute.focus();
});

// ---- Dicas (pop-up) ----
let dicasUsadas = 0;
const popup = document.getElementById("popup");
const textoDica = document.getElementById("texto-dica");

function ehPrimo(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

function listaDeDicas() {
  return [
    `O número é ${secreto % 2 === 0 ? "par" : "ímpar"}.`,
    `O número está entre ${secreto < 50 ? "0 e 49" : "50 e 100"}.`,
    `O número ${secreto % 5 === 0 ? "é" : "não é"} divisível por 5.`,
    `O número ${secreto % 3 === 0 ? "é" : "não é"} divisível por 3.`,
    `O número ${ehPrimo(secreto) ? "é" : "não é"} primo.`,
    `O número tem ${String(secreto).length} dígito(s).`,
  ];
}

document.getElementById("btn-dica").addEventListener("click", () => {
  const dicas = listaDeDicas();
  textoDica.textContent =
    dicasUsadas < dicas.length ? dicas[dicasUsadas++] : "Acabaram as dicas! Agora é com você 🐆";
  popup.showModal();
});

document.getElementById("btn-fechar").addEventListener("click", () => popup.close());
