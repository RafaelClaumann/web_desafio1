const apartmentBlocks = {
  A: [
    { numero_apto: 101, numero_vaga: 111, ocupada: true },
    { numero_apto: 101, numero_vaga: 222, ocupada: false },
    { numero_apto: 103, numero_vaga: 333, ocupada: false },
    { numero_apto: 104, numero_vaga: 444, ocupada: false },
  ],
  B: [
    { numero_apto: 404, numero_vaga: 4, ocupada: false },
    { numero_apto: 422, numero_vaga: 2, ocupada: false },
    { numero_apto: 409, numero_vaga: 9, ocupada: false },
  ],
};

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

  Object.keys(apartmentBlocks).forEach((blocoKey) => {
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
  const apartmentNumbers = apartmentBlocks[selectedBlock].map(
    (apto) => apto.numero_apto
  );
  const uniqueApartmentsNumbers = [...new Set(apartmentNumbers)];

  uniqueApartmentsNumbers.forEach((apt_number) => {
    const option = document.createElement("option");
    option.value = apt_number;
    option.textContent = "Apartamento " + option.value;

    document.getElementById(comboBoxApartmentId).appendChild(option);
  });
}

function fillParkingSpotComboBox() {
  const comboBoxParkingSpotId = "vaga";
  clearComboBox(comboBoxParkingSpotId);

  const selectdBlock = document.getElementById("bloco").value;
  const selectedApartment = document.getElementById("apartamento").value;

  apartmentBlocks[selectdBlock]
    .filter((apt) => apt.numero_apto == selectedApartment)
    .forEach((apt) => {
      const option = document.createElement("option");
      option.value = apt.numero_vaga;
      option.textContent = "Vaga " + option.value;

      document.getElementById(comboBoxParkingSpotId).appendChild(option);
    });
}

function clearComboBox(idComboBox) {
  var comboBox = document.getElementById(idComboBox);
  while (comboBox.options.length > 1) {
    comboBox.remove(1);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fillBlocksComboBox();
  // outras inicializações...
});
