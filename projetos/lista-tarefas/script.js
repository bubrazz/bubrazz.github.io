function adicionarTarefa() {
  const input = document.getElementById("nova-tarefa");
  const texto = input.value.trim();

  if (texto === "") return;

  const lista = document.getElementById("lista");

  const li = document.createElement("li");
  li.textContent = texto;

  const btnConcluir = document.createElement("button");
  btnConcluir.textContent = "✔";
  btnConcluir.className = "concluir";
  btnConcluir.onclick = function () {
    li.classList.toggle("concluida");
  };

  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "✖";
  btnExcluir.onclick = function () {
    lista.removeChild(li);
  };

  li.appendChild(btnConcluir);
  li.appendChild(btnExcluir);
  lista.appendChild(li);

  input.value = "";
  input.focus();
}
