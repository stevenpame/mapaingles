
const lugaresCoords = {
  1: { x: 503, y: 694 },
  2: { x: 493, y: 697 },
  3: { x: 485, y: 684 },
  4: {  x: 471, y: 671 },
  5: { x: 427, y: 673 },
  6: { x: 393, y: 642 },
  7: { x: 406, y: 626 },
  8:{ x: 368, y: 635 } ,
  9: { x: 354, y: 653 },
  10: { x: 361, y: 617 },
  11: { x: 343, y: 621 },
  12: { x: 349, y: 605 },
  13: { x: 331, y: 610 },
  14: { x: 341, y: 597 },
  15: { x: 343, y: 572 },
  16: { x: 310, y: 578 },
  17: { x: 329, y: 589 },
  18: { x: 319, y: 604 },
  19: { x: 297, y: 613 },
  20: { x: 328, y: 557 },
  21: { x: 316, y: 541 },
  22: { x: 309, y: 530 },
  23: { x: 292, y: 531 },
  24: { x: 279, y: 551 },
  25: { x: 271, y: 564 },
  26: { x: 220, y: 581 },
  27: { x: 261, y: 526 },
  28: { x: 271, y: 510 },
  29: { x: 280, y: 500 },
  30: { x: 297, y: 482 },
  31: { x: 308, y: 442 },
  32: { x: 339, y: 420 },
  33: { x: 366, y: 382 },
  34: { x: 372, y: 481 },
  35: { x: 366, y: 502 },
  36: { x: 350, y: 520 },
  37: { x: 337, y: 535 },
  38: { x: 394, y: 504 },
  39: { x: 386, y: 512 },
  40: { x: 376, y: 527 },
  41: { x: 367, y: 537 },
  42: { x: 359, y: 557 },
  43: { x: 457, y: 510 },
  44: { x: 451, y: 452 },
  45: { x: 507, y: 557 },
  46: { x: 532, y: 488 },
  47: { x: 543, y: 581 },
  48: { x: 551, y: 618 },
  49: { x: 615, y: 593 },
  50: { x: 527, y: 455 },
  51: { x: 524, y: 447 },
  52: { x: 522, y: 426 },
  53: { x: 575, y: 416 },
  54: { x: 589, y: 458 },
  55: { x: 572, y: 459 },
  56: { x: 541, y: 390 },
  57: { x: 529, y: 328 },
  58: { x: 429, y: 329 },
  59: { x: 465, y: 315 },
  60: { x: 446, y: 321 },
  61: { x: 468, y: 292 },
  62: { x: 466, y: 281 },
  63: { x: 411, y: 303 },
  64: { x: 388, y: 344 },
  65: { x: 281, y: 404 },
  66: { x: 232, y: 382 },
  67: { x: 253, y: 436 },
  68: { x: 175, y: 553 },
  69: { x: 156, y: 496 },
  70: { x: 143, y: 487 },
  71: { x: 622, y: 346 },
  72: { x: 679, y: 457 },
  73: { x: 0, y: 0 },
  74: { x: 0, y: 0 },
  75: { x: 0, y: 0 },
  76: { x: 0, y: 0 },
  77: { x: 0, y: 0 },
  78: { x: 0, y: 0 },
  79: { x: 0, y: 0 },
  80: { x: 0, y: 0 },
  81: { x: 0, y: 0 },
  82: { x: 0, y: 0 },
  83: { x: 0, y: 0 },
  84: { x: 0, y: 0 },
  85: { x: 0, y: 0 },
  86: { x: 0, y: 0 },
  87: { x: 0, y: 0 },
  88: { x: 0, y: 0 },
  89: { x: 0, y: 0 },
  90: { x: 0, y: 0 },
  91: { x: 0, y: 0 },
  92: { x: 0, y: 0 },
  93: { x: 0, y: 0 },
  94: { x: 0, y: 0 },
  95: { x: 0, y: 0 },
  96: { x: 0, y: 0 },
  97: { x: 0, y: 0 },
  98: { x: 0, y: 0 },
  99: { x: 0, y: 0 },
  100: { x: 0, y: 0 },
  101: { x: 0, y: 0 },
  102: { x: 0, y: 0 },
  103: { x: 0, y: 0 },
  104: { x: 0, y: 0 },
  105: { x: 0, y: 0 }
};



fetch('json/mapa.json')
  .then(response => response.json())
  .then(lugares => {
    const lista = document.getElementById('lista-lugares');
    const buscador = document.getElementById('buscador-lugar');
    if (!lista) return;

    function renderLista(filtro = '') {
      lista.innerHTML = '';
      lugares
        .filter(lugar => lugar.Lugar_espanol.toLowerCase().includes(filtro.toLowerCase()))
        .sort((a, b) => a.Número - b.Número)
        .forEach(lugar => {
          const coords = lugaresCoords[lugar.Número] || { x: 0, y: 0 };
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex align-items-center gap-2';
          li.innerHTML = `<span class="direccion flex-grow-1" data-zoom="3" data-x="${coords.x}" data-y="${coords.y}"><i class="bi bi-geo-alt-fill me-2 text-primary"></i><strong>${lugar.Número}.</strong> ${lugar.Lugar_espanol}</span>`;
          lista.appendChild(li);
        });
      asignarEventos();
    }

    function asignarEventos() {
      document.querySelectorAll('.direccion').forEach(el => {
        el.addEventListener('click', () => {
          const x = Number(el.dataset.y);
          const y = Number(el.dataset.x);
          const zoom = Number(el.dataset.zoom);
          map.setView([x, y], zoom);
          if (window._lastMarker) {
            map.removeLayer(window._lastMarker);
          }
          let nombre = el.innerText.trim();
          if (nombre.indexOf(' ') > 0) {
            nombre = nombre.split(' ').slice(1).join(' ');
          }
          const marker = L.marker([x, y]).addTo(map)
            .bindPopup(nombre)
            .openPopup();
          window._lastMarker = marker;
        });
      });
    }

    if (buscador) {
      buscador.addEventListener('input', e => {
        renderLista(e.target.value);
      });
    }

    renderLista();
  });
