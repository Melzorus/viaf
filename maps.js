// Créer la carte centrée sur la région Rhône-Alpes
const map = L.map('map').setView([45.5, 5.5], 8);

// Ajouter une couche de tuiles (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap France',
  maxZoom: 19
}).addTo(map);

// Exemple de via ferrata avec difficulté
const vias = [
  {
    nom: "Via Ferrata Reclavier",
    coords: [46.0775, 6.1125],
    parking: "Parking de pomier",
    acces: "15 min de marche",
    lien: "#",
    difficulte: "difficile"
  },
  {
    nom: "Via Ferrata Curalla",
    coords: [45.9386, 6.6955],
    parking: "Parking de pomier",
    acces: "15 min de marche",
    lien: "#",
    difficulte: "facile"
  },
];

// Fonction pour choisir la couleur selon la difficulté
function getMarkerColor(difficulte) {
  switch (difficulte) {
    case "facile": return "green"; // Facile -> Vert
    case "moyen": return "blue"; // Moyen -> bleu
    case "difficile": return "red"; // Difficile -> Rouge
    case "très difficile": return "black"; // Très difficile -> Noir
    default: return "gray"; // Par défaut (si aucune difficulté spécifiée)
  }
}

// Ajouter un marqueur pour chaque via ferrata et afficher un popup avec des informations
vias.forEach(via => {
  L.marker(via.coords, {
    icon: L.divIcon({
      className: 'via-marker',
      html: '<div style="background-color: ' + getMarkerColor(via.difficulte) + '; width: 20px; height: 20px; border-radius: 50%;"></div>'
    })
  }).addTo(map)
    .bindPopup(`
      <strong>${via.nom}</strong><br>
      ${via.parking}<br>
      ${via.acces}<br>
      <a href="${via.lien}" target="_blank">Détails</a><br>
      <strong>Difficulté: ${via.difficulte === "facile" ? "Facile" : via.difficulte === "moyen" ? "Moyenne" : via.difficulte === "difficile" ? "Difficile" : "Très difficile"}</strong>
    `);
});

// Ajouter une légende en bas à droite de la carte
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function() {
  const div = L.DomUtil.create('div', 'info legend');
  const difficulties = ['facile', 'moyen', 'difficile', 'très difficile'];
  const colors = ['green', 'blue', 'red', 'black'];

  // Boucle pour afficher chaque difficulté et sa couleur correspondante
  for (let i = 0; i < difficulties.length; i++) {
    div.innerHTML +=
      '<i style="background:' + colors[i] + '"></i> ' + (difficulties[i] === 'facile' ? 'Facile' : difficulties[i] === 'moyen' ? 'Moyenne' : difficulties[i] === 'difficile' ? 'Difficile' : 'Très difficile') + '<br>';
  }

  return div;
};

legend.addTo(map);


