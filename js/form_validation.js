const placa = document.getElementById("placa_veiculo");

placa.addEventListener("input", function () {
  if (placa.validity.patternMismatch) {
    placa.setCustomValidity("Formato inválido! Use AAA-1111 ou AAA1A11.");
  } else {
    placa.setCustomValidity(""); // limpa o erro
  }
});
