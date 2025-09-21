function enableApartmentComboBox() {
  var aprtmentComboBox = document.getElementById("apartamento");
  var parkingSpotComboBox = document.getElementById("vaga");

  aprtmentComboBox.disabled = true;
  parkingSpotComboBox.disabled = true;

  if (document.getElementById("bloco").value) {
    aprtmentComboBox.disabled = false;
    fillApartmentComboBox();
    return;
  }
}

function enableParkingSpotComboBox() {
  var parkingSpotComboBox = document.getElementById("vaga");
  parkingSpotComboBox.disabled = true;

  if (document.getElementById("apartamento").value) {
    parkingSpotComboBox.disabled = false;
    fillParkingSpotComboBox();
    return;
  }
}

function fillBlocksComboBox() {
  const comboBoxBlockId = "bloco";
  clearComboBox(comboBoxBlockId);

  const blocks = getBlocks();
  blocks.forEach((blocoKey) => {
    const option = document.createElement("option");
    option.value = blocoKey;
    option.textContent = "Bloco " + blocoKey;

    document.getElementById(comboBoxBlockId).appendChild(option);
  });
}

function fillApartmentComboBox() {
  const comboBoxApartmentId = "apartamento";
  clearComboBox(comboBoxApartmentId);

  const selectedBlock = document.getElementById("bloco").value;
  const apartments = getApartmentsByBlock(selectedBlock);

  apartments.forEach((apartment) => {
    const option = document.createElement("option");
    option.value = apartment.numero_apto;
    option.textContent = "Apartamento " + option.value;

    document.getElementById(comboBoxApartmentId).appendChild(option);
  });
}

function fillParkingSpotComboBox() {
  const comboBoxParkingSpotId = "vaga";
  clearComboBox(comboBoxParkingSpotId);

  const selectedBlock = document.getElementById("bloco").value;
  const selectedApartment = document.getElementById("apartamento").value;

  const apartments = getApartmentsByBlock(selectedBlock);

  apartments
    .filter((apt) => apt.numero_apto == selectedApartment)
    .forEach((apt) => {
      apt.vagas.forEach((vaga) => {
        const option = document.createElement("option");
        option.value = vaga.numero;
        option.textContent = "Vaga " + option.value;

        document.getElementById(comboBoxParkingSpotId).appendChild(option);
      });
    });
}

function clearComboBox(idComboBox) {
  var comboBox = document.getElementById(idComboBox);
  while (comboBox.options.length > 1) {
    comboBox.remove(1);
  }
}

function enviarFormulario(event) {
  event.preventDefault();

  const cliente = {
    proprietario: document.getElementById("nome_proprietario").value,
    placa: placa.document.getElementById("placa_veiculo"),
    modelo: document.getElementById("modelo_veiculo").value,
    cor: cor.document.getElementById("cor_veiculo"),
  };

  const dados = {
    bloco: document.getElementById("bloco").value,
    apartamento: document.getElementById("apartamento").value,
    vaga: vagaSelect.document.getElementById("vaga"),
  };

  var apartment = getApartment(dados.bloco, dados.apartamento);
  var parkingSpot = getParkingSpot(dados.bloco, dados.apartamento, dados.vaga);

  parkingSpot.vehicle = cliente;

  console.log("apartment: " + JSON.stringify(apartment));
  console.log("parkingSpot: " + JSON.stringify(parkingSpot));
  console.log("parkingSpot.vehicle: " + JSON.stringify(parkingSpot.vehicle));

  alert(
    `
      Detalhes da Vaga

      Bloco: ${dados.bloco}
      Apartamento: ${dados.apartamento}
      Vaga: ${dados.vaga}

      Proprietário: ${cliente.proprietario}
      Placa: ${cliente.placa}
      Modelo: ${cliente.modelo}
      Cor: ${cliente.cor}
    `
  );
}

document.addEventListener("DOMContentLoaded", fillBlocksComboBox);
