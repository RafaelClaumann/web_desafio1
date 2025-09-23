var tbody = document.querySelector("#parking-table tbody");

const parkingSpots = getParkingSpotsWithBlockAndApartment();
parkingSpots.forEach((parkingSpot) => {
  const tableRow = document.createElement("tr");

  const thBloco = document.createElement("th");
  thBloco.scope = "row";
  thBloco.textContent = parkingSpot.bloco;

  const tdApartamento = document.createElement("td");
  tdApartamento.textContent = parkingSpot.apartamento;

  const tdVaga = document.createElement("td");
  tdVaga.textContent = parkingSpot.numero;

  const tdPlaca = document.createElement("td");
  tdPlaca.textContent = parkingSpot.vehicle?.plate || "vazia";

  tableRow.appendChild(thBloco);
  tableRow.appendChild(tdApartamento);
  tableRow.appendChild(tdVaga);
  tableRow.appendChild(tdPlaca);

  tbody.appendChild(tableRow);
});
