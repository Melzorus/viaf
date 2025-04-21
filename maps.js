// Créer la carte centrée sur la région Rhône-Alpes (tu pourras changer plus tard)
const map = L.map('map').setView([45.5, 5.5], 8);

// Ajouter une couche de tuiles (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap France',
  maxZoom: 19
}).addTo(map);

// Exemple de via ferrata (tu peux en ajouter d'autres)
const vias = [
  {
    nom: "Via Ferrata du Diable",
    coords: [45.775, 6.383],
    parking: "Parking à 200m",
    acces: "10 min de marche",
    lien: "#"
  },
  {
    nom: "Via Ferata Reclavier",
    coords: [46.0796, 6.1072],
    parking: "Parking de pomier",
    acces: "15 min de marche",
    lien: "#"
  },
   {
    nom: "Via Ferata Curalla",
    coords: [45.9386, 6.6955],
    parking: "Parking de pomier",
    acces: "15 min de marche",
    lien: "#"
  },
];

// Ajouter un marqueur pour chaque via ferrata et afficher un popup avec des informations
vias.forEach(via => {
  L.marker(via.coords).addTo(map)
    .bindPopup(`
      <strong>${via.nom}</strong><br>
      ${via.parking}<br>
      ${via.acces}<br>
      <a href="${via.lien}" target="_blank">Détails</a>
    `);
});
