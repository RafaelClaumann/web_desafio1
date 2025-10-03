function fillParkingTableOnLoad() {
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

    const tdTeste = document.createElement("td")
    tdTeste.textContent = "teste";

    console.log("table_row_source: " + tableRow)
    const img =`<img src= "../assets/delete_trash_can.png" width="20" height="20" onclick="myFunction(this)" alt="">`
    tdTeste.innerHTML = img

    tableRow.appendChild(thBloco);
    tableRow.appendChild(tdApartamento);
    tableRow.appendChild(tdVaga);
    tableRow.appendChild(tdPlaca);
    tableRow.appendChild(tdTeste);

    tbody.appendChild(tableRow);
  });
}

let test = null;
function myFunction(tableRow) {
  test = tableRow.parentNode
  console.log("table_row_result: " + tableRow.parentNode)
  alert("Hello! I am an alert box!!");
}

function highlightOccupiedParkingSpots() {
  const tabela = document.getElementById("parking-table");
  const linhas = tabela.getElementsByTagName("tr");

  console.log(JSON.stringify(tabela));
  console.log(JSON.stringify(linhas));

  for (let i = 1; i < linhas.length; i++) {
    const cells = linhas[i].getElementsByTagName("td");
    const placa = cells[2]?.textContent.trim();

    if ("vazia" != placa) {
      linhas[i].classList.add("highlight");
      console.log(`apto ${cells[0].textContent?.trim()} / vaga: ${cells[1].textContent?.trim()} / placa ${cells[2].textContent?.trim()}`);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fillParkingTableOnLoad();
  highlightOccupiedParkingSpots();
});
