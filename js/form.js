function enableApartmentComboBox() {
  var apartmentComboBox = document.getElementById("apartamento");
  var parkingSpotComboBox = document.getElementById("vaga");

  apartmentComboBox.disabled = true;
  parkingSpotComboBox.disabled = true;

  if (document.getElementById("bloco").value) {
    apartmentComboBox.disabled = false;
    fillApartmentComboBox();
    parkingSpotComboBox.innerHTML = `<option value="">Selecione...</option>`;
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

        const spotStyle = vaga.vehicle == null ? "🟢" : "🔴";
        option.textContent = `${spotStyle} Vaga ${option.value}`;

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

  const apartmentFormValuesObject = getFormFieldsValues().apartment_values;
  const vehicleFormValuesObject = getFormFieldsValues().vehicle_values;

  if (isPlateAlreadyPresent(vehicleFormValuesObject.plate)) {
    showErrorModal(`A placa ${vehicleFormValuesObject.plate} já está cadastrada.`);
    return false;
  }

  var foundApartment = getApartment(apartmentFormValuesObject.block, apartmentFormValuesObject.number);
  var foundParkingSpot = getParkingSpot(apartmentFormValuesObject.block, apartmentFormValuesObject.number, apartmentFormValuesObject.parkingSpot);

  foundParkingSpot.vehicle = vehicleFormValuesObject;
  foundParkingSpot.ocupada = true;

  updateParkingSpotComboBoxOptionToOccupied(apartmentFormValuesObject.parkingSpot);

  saveApartmentBlocks();

  const output = document.getElementById("output");
  output.style.display = "block";
  output.textContent = JSON.stringify(foundApartment, null, 2);
}

function getFormFieldsValues() {
  return {
    apartment_values: {
      block: document.getElementById("bloco").value.trim(),
      number: parseInt(document.getElementById("apartamento").value),
      parkingSpot: parseInt(document.getElementById("vaga").value),
    },
    vehicle_values: {
      owner: document.getElementById("nome_proprietario").value.trim(),
      plate: document.getElementById("placa_veiculo").value.trim(),
      model: document.getElementById("modelo_veiculo").value.trim(),
      color: document.getElementById("cor_veiculo").value.trim(),
    },
  };
}

function updateParkingSpotComboBoxOptionToOccupied(parkingSpot) {
  const parkingSpotComboBox = document.getElementById("vaga");
  const parkingSpotComboBoxOptions = Array.from(parkingSpotComboBox.options);

  const selectedOption = parkingSpotComboBoxOptions.find((opt) =>
    opt.text.includes(`Vaga ${parkingSpot}`)
  );

  if (selectedOption) {
    selectedOption.text = `🔴 Vaga ${parkingSpot}`;
  }
}

function showErrorModal(msg) {
  const mensagem = document.getElementById("error_message");
  mensagem.textContent = msg;

  const modal = document.getElementById("form_error_modal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("form_error_modal");
  modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", fillBlocksComboBox);
