
const imageUrl = 'imagenes/mapa.png';
const imageWidth = 1200;
const imageHeight = 800;

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 2,
  zoomControl: true,
});

const bounds = [[0, 0], [imageHeight, imageWidth]];
L.imageOverlay(imageUrl, bounds).addTo(map);

map.fitBounds(bounds);

// Mostrar coordenadas al hacer clic en el mapa
map.on('click', function(e) {
  const x = Math.round(e.latlng.lng);
  const y = Math.round(e.latlng.lat);
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`Coordenadas: { x: ${x}, y: ${y} }<br><button onclick=\"navigator.clipboard.writeText('{ x: ${x}, y: ${y} }')\">Copiar</button>`)
    .openOn(map);
});

fetch('json/mapa.json')
  .then(response => response.json())
  .then(lugares => {
 
    const lugaresCoords = window.lugaresCoords || {};
    lugares.forEach(lugar => {
      const coords = lugaresCoords[lugar.Número];
      if (coords) {
        L.marker([coords.y, coords.x]).addTo(map)
          .bindPopup(lugar.Lugar_espanol);
      }
    });
  });


document.querySelectorAll('.direccion').forEach(el => {
  el.addEventListener('click', () => {
    const x = Number(el.dataset.y);
    const y = Number(el.dataset.x);

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