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

  const blocks = getApartmentBlocks();
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
  const apartments = getApartmentsByBlock(selectedBlock)

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

  const apartments = getApartmentsByBlock(selectedBlock)

  apartments
    .filter((apt) => apt.numero_apto == selectedApartment)
    .forEach((apt) => {
      apt.vagas.forEach(vaga => {
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

document.addEventListener("DOMContentLoaded", fillBlocksComboBox);
