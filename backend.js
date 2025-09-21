var apartmentBlocks = {
  A: [
    {
      numero_apto: 101,
      vagas: [
        { 
            numero: 111,
            ocupada: true,
            vehicle: {
                owner: "Rafael Claumann Bernardes",
                plate: "MKU4J39",
                model: "New Fiesta",
                color: "Branca"
            }
        },
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
    console.log("Iniciando < apartmentBlocks > no < localStorage >");
  }
}

function _getApartmentBlocks() {
  if (!_apartmentBlocksCache) {
    const stored = localStorage.getItem("apartmentBlocks");
    _apartmentBlocksCache = stored ? JSON.parse(stored) : {};
    console.log("Preenchendo < apartmentBlocks > no < _apartmentBlocksCache >");
  }
  return _apartmentBlocksCache;
}

function saveApartmentBlocks() {
  if (_apartmentBlocksCache) {
    localStorage.setItem(
      "apartmentBlocks",
      JSON.stringify(_apartmentBlocksCache)
    );
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

function test() {
  const _apartmentBlocks = _getApartmentBlocks();

  const block = Object.keys(apartmentBlocks).find(key => apartmentBlocks[key].includes(apartment));


  Object.values(allParkingSpots).flatMap(spot => spot.vehicle)

  allParkingSpot.flatMap(spot => spot.vehicle).filter(spot => spot != null)


// todos os apartamentos em lista
let allApartments = Object.values(apartmentBlocks).flatMap(apartments => apartments);
let allParkingSpots = allApartments.flatMap(apartment => apartment.vagas);
let allSpotsNumbers = allParkingSpots.flatMap(spot => spot.numero)
let allSpotsVehicles = allParkingSpots.flatMap(spot => spot.vehicle).filter(vehicle => vehicle != null)

Object.entries(apartmentBlocks).flatMap(([block, apartments]) => (
    {
        block: block,
        apartment: apartments.flatMap(apto => {{
            
        }})
    }
))

allApartments
    .flatMap(apartment => apartment)

allApartments.flatMap(apartment => apartment.vagas.flatMap(spots => ({
    apartment: apartment.numero_apto,
    spot_numero: spots.numero,
    spot_plate: spots.vehicle
})));

Object.values(apartmentBlocks)
    .flatMap(apartments => apartments)
    .flatMap(apartment => ({
        bloco: Object.keys(apartmentBlocks).find(key => apartmentBlocks[key].includes)
    }))

const allParkingSpotss = Object.values(apartmentBlocks)
  .flatMap(apartments => 
    apartments.flatMap(apartment => 
      apartment.vagas.map(vaga => ({
        ...vaga,
        apartamento: apartment.numero_apto,
        bloco: Object.keys(apartmentBlocks).find(key => apartmentBlocks[key].includes(apartment))
      }))
    )
  );

console.log(allParkingSpots);



}
document.addEventListener("DOMContentLoaded", _initApartmentBlocks);
