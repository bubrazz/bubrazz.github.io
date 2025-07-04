// Quando a página carrega, busca as tarefas salvas
document.addEventListener("DOMContentLoaded", () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasSalvas.forEach(tarefa => adicionarTarefaNaTela(tarefa.texto, tarefa.concluida));
});

// Salva no localStorage
function salvarTarefas() {
  const tarefas = [];
  document.querySelectorAll(".tarefa").forEach(item => {
    tarefas.push({
      texto: item.querySelector("span").innerText,
      concluida: item.classList.contains("concluida")
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cria tarefa visualmente
function adicionarTarefaNaTela(texto, concluida = false) {
  const lista = document.getElementById("lista");
  const item = document.createElement("div");
  item.className = "tarefa";
  if (concluida) item.classList.add("concluida");

  const span = document.createElement("span");
  span.innerText = texto;

  const btnConcluir = document.createElement("button");
  btnConcluir.innerText = "✔";
  btnConcluir.className = "concluir";
  btnConcluir.onclick = () => {
    item.classList.toggle("concluida");
    salvarTarefas();
  };

  const btnExcluir = document.createElement("button");
  btnExcluir.innerText = "✘";
  btnExcluir.className = "excluir";
  btnExcluir.onclick = () => {
    item.remove();
    salvarTarefas();
  };

  item.appendChild(span);
  item.appendChild(btnConcluir);
  item.appendChild(btnExcluir);
  lista.appendChild(item);
  salvarTarefas();
}

// Quando envia nova tarefa
document.getElementById("formTarefa").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();
  if (texto) {
    adicionarTarefaNaTela(texto);
    input.value = "";
  }
});
