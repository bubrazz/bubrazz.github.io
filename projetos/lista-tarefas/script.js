function liberarTarefas() {
  document.getElementById("autorizacao").style.display = "none";
  document.getElementById("painel").style.display = "block";
  carregarTarefas();
}

function negarPermissao() {
  document.getElementById("autorizacao").style.display = "none";
  const msg = document.getElementById("mensagemRecado");
  msg.innerText = "Então nada de tarefas por enquanto, marujo curioso!";
  msg.style.display = "block";
}

// Salvar no localStorage
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

// Adicionar tarefa na tela com animação
function adicionarTarefaNaTela(texto, concluida = false) {
  const lista = document.getElementById("lista");
  const item = document.createElement("li");
  item.className = "tarefa animated";
  if (concluida) item.classList.add("concluida");

  const span = document.createElement("span");
  span.innerText = texto;

  const btnConcluir = document.createElement("button");
  btnConcluir.innerText = "✔";
  btnConcluir.onclick = () => {
    item.classList.toggle("concluida");
    salvarTarefas();
  };

  const btnExcluir = document.createElement("button");
  btnExcluir.innerText = "✘";
  btnExcluir.onclick = () => {
    item.classList.add("removendo");
    setTimeout(() => {
      item.remove();
      salvarTarefas();
    }, 300);
  };

  item.appendChild(span);
  item.appendChild(btnConcluir);
  item.appendChild(btnExcluir);
  lista.appendChild(item);
  salvarTarefas();
}

// Enviar tarefa
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formTarefa");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = document.getElementById("novaTarefa");
      const texto = input.value.trim();
      if (texto) {
        adicionarTarefaNaTela(texto);
        input.value = "";
      }
    });
  }

  // Tema claro/escuro
  const temaBtn = document.getElementById("temaToggle");
  if (temaBtn) {
    temaBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});

// Carregar do localStorage
function carregarTarefas() {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasSalvas.forEach(t => adicionarTarefaNaTela(t.texto, t.concluida));
}

// Exportar .txt
function exportarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let conteudo = "Minhas Tarefas:\n\n";
  tarefas.forEach((t, i) => {
    conteudo += `${i + 1}. ${t.texto} ${t.concluida ? "(concluída)" : ""}\n`;
  });

  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tarefas_do_bub.txt";
  link.click();
}
