// Quando a página carrega, busca as tarefas salvas
document.addEventListener("DOMContentLoaded", () => {
  aplicarTemaSalvo();
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
  const item = document.createElement("li");
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
  btnExcluir.innerText = "✖";
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

// Adiciona nova tarefa
document.getElementById("formTarefa").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();
  if (texto) {
    adicionarTarefaNaTela(texto);
    input.value = "";
  }
});

// Alternar entre claro e escuro
function alternarTema() {
  document.body.classList.toggle("dark-mode");
  const modoAtual = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("tema", modoAtual);
}

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Exportar tarefas
function exportarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  if (tarefas.length === 0) {
    alert("Nenhuma tarefa para exportar.");
    return;
  }
  const texto = tarefas.map(t => `${t.concluida ? "[x]" : "[ ]"} ${t.texto}`).join("\n");
  const blob = new Blob([texto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "tarefas.txt";
  link.click();
}
