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

let _apartmentBlocksCache = null;

function _initApartmentBlocks() {
  if (!localStorage.getItem("apartmentBlocks")) {
    localStorage.setItem("apartmentBlocks", JSON.stringify(apartmentBlocks));
  }
}

function _getApartmentBlocks() {
  if (!_apartmentBlocksCache) {
    const stored = localStorage.getItem("apartmentBlocks");
    _apartmentBlocksCache = stored ? JSON.parse(stored) : {};
  }
  return _apartmentBlocksCache;
}

function saveApartmentBlocks() {
  if (_apartmentBlocksCache) {
    localStorage.setItem("apartmentBlocks", JSON.stringify(_apartmentBlocksCache));
  }
}

/**
 * Obtém os blocos do condominio
 * @returns {Array<string>} Lista de apartamentos
 */
function getBlocks() {
  const _apartmentBlocks = _getApartmentBlocks();
  return Object.keys(_apartmentBlocks) || [];
}

/**
 * Obtém apartamentos de um bloco
 * @param {string} bloco - Letra do bloco (A, B, C...)
 * @returns {Array<Object>} Lista de apartamentos
 */
function getApartmentsByBlock(block) {
  const _apartmentBlocks = _getApartmentBlocks();
  return _apartmentBlocks[block] || [];
}

/**
 * Obtém um apartamento específico de um bloco
 * @param {string} bloco - Letra do bloco (A, B, C...)
 * @param {number} apartmentNumber - Número do apartamento
 * @returns {Object|null} Apartamento encontrado ou null se não existir
 */
function getApartment(block, apartmentNumber) {
  const _apartmentBlocks = _getApartmentBlocks();
  return _apartmentBlocks[block].find(
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
