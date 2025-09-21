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

  const vehicleData = {
    owner: document.getElementById("nome_proprietario").value,
    plate: document.getElementById("placa_veiculo").value,
    model: document.getElementById("modelo_veiculo").value,
    color: document.getElementById("cor_veiculo").value,
  };

  const apartmentData = {
    block: document.getElementById("bloco").value,
    number: parseInt(document.getElementById("apartamento").value),
    parkingSpot: parseInt(document.getElementById("vaga").value),
  };

  var foundApartment = getApartment(apartmentData.block, apartmentData.number);
  var foundParkingSpot = getParkingSpot(apartmentData.block, apartmentData.number, apartmentData.parkingSpot);

  foundParkingSpot.vehicle = vehicleData;
  foundParkingSpot.ocupada = true;

  const output = document.getElementById("output");
  output.style.display = "block";
  output.textContent = JSON.stringify(foundApartment, null, 2);
}

document.addEventListener("DOMContentLoaded", fillBlocksComboBox);
