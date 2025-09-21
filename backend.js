var apartmentBlocks = {
  A: [
    {
      numero_apto: 101,
      vagas: [
        { numero: 111, ocupada: false },
        { numero: 222, ocupada: false },
      ],
    },
    { numero_apto: 103, vagas: [{ numero: 333, ocupada: false }] },
    { numero_apto: 104, vagas: [{ numero: 444, ocupada: false }] },
  ],
  B: [
    { numero_apto: 404, vagas: [{ numero: 4, ocupada: false }] },
    { numero_apto: 422, vagas: [{ numero: 2, ocupada: false }] },
    { numero_apto: 409, vagas: [{ numero: 9, ocupada: false }] },
    { numero_apto: 405, vagas: [] },
  ],
};

function _initApartmentBlocks() {
  if (!localStorage.getItem("apartmentBlocks")) {
    localStorage.setItem("apartmentBlocks", JSON.stringify(apartmentBlocks));
  }
}

/**
 * Obtém os blocos do condominio
 * @returns {Array<string>} Lista de apartamentos
 */
function getBlocks() {
  return Object.keys(apartmentBlocks) || [];
}

/**
 * Obtém apartamentos de um bloco
 * @param {string} bloco - Letra do bloco (A, B, C...)
 * @returns {Array<Object>} Lista de apartamentos
 */
function getApartmentsByBlock(block) {
  return apartmentBlocks[block] || [];
}

/**
 * Obtém um apartamento específico de um bloco
 * @param {string} bloco - Letra do bloco (A, B, C...)
 * @param {number} apartmentNumber - Número do apartamento
 * @returns {Object|null} Apartamento encontrado ou null se não existir
 */
function getApartment(block, apartmentNumber) {
  return apartmentBlocks[block].find(
    (apto) => apto.numero_apto == apartmentNumber
  );
}

/**
 * Obtém uma vaga de estacionamento específica dentro de um apartamento
 * @param {string} bloco - Letra do bloco (A, B, C...)
 * @param {number} apartmentNumber - Número do apartamento
 * @param {number} spotNumber - Número da vaga
 * @returns {Object|null} Vaga encontrada ou null se não existir
 */
function getParkingSpot(block, apartmentNumber, spotNumber) {
  const apartment = getApartment(block, apartmentNumber);
  return apartment.vagas.find((vaga) => vaga.numero == spotNumber) || null;
}

document.addEventListener("DOMContentLoaded", _initApartmentBlocks);
