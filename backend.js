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

/**
 * Obtém os blocos do condominio
 * @returns {Array<string>} Lista de apartamentos
 */
function getApartmentBlocks() {
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
