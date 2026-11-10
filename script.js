let secreto = sortear();
let tentativas = 0;

const form = document.getElementById("form");
const chute = document.getElementById("chute");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("tentativas");
const btnChutar = document.getElementById("btn-chutar");
const btnNovo = document.getElementById("btn-novo");

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
  } else {
    mensagem.textContent = valor < secreto ? "É maior! ⬆️" : "É menor! ⬇️";
  }
  chute.value = "";
  chute.focus();
});

btnNovo.addEventListener("click", () => {
  secreto = sortear();
  tentativas = 0;
  contador.textContent = 0;
  mensagem.textContent = "";
  chute.disabled = false;
  btnChutar.disabled = false;
  btnNovo.hidden = true;
  chute.focus();
});
