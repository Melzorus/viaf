la carte ne s'affiche plus : // Créer la carte centrée sur la région Rhône-Alpes
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
    difficulte: "moyen"
  },
  {
    nom: "Via Ferrata Curalla",
    coords: [45.9418 , 6.6967],
    parking: "Parking de la via curalla",
    acces: "15 à 20 min de marche",
    lien: "#",
    difficulte: "moyen"
  },
   {
    nom: "Via Ferrata du Parc thermal",
    coords: [45.9386, 6.6955],
    parking: "Parking du parc thermal",
    acces: "10 min de marche",
    lien: "#",
    difficulte: "très difficile"
  },
    },
   {
    nom: "Via Ferrata du Mont",
    coords: [46.057754 , 6.760885],
    parking: "Parking gorges des tines",
    acces: "10 à 15 min de marche",
    lien: "#",
    difficulte: "moyen"
  },
    {
    nom: "Via Ferrata de la cascades des Nants",
    coords: [46.25179, 6.53186],
    parking: "Parking accroparc de Bellavallis",
    acces: "5 min de marche",
    lien: "#",
    difficulte: "facile"
  },
  {
    nom: "Via ferrata du saix du tour",
    coords: [46.19166273714018, 6.778802498353414],
    parking: "Parking Avoriaz",
    acces: "5 min de marche",
    lien: "#",
    difficulte: "moyen"
  },
  {
    nom: "Via Ferrata Yves Pollet-Villard",
    coords: [45.88275, 6.45146],
    parking: "Parking Via Ferrata et Rocher d'escalade",
    acces: "20 min de marche",
    lien: "#",
    difficulte: "difficile"
  },
   {
    nom: "Via Ferrata - La Roche à l'Agathe",
    coords: [45.88479504098867, 6.322294602427055],
    parking: "Parking avenue du vieux pont",
    acces: "15 min de marche",
    lien: "#",
    difficulte: "difficile"
  },
  {
    nom: "Via ferrata La Tour du Jallouvre",
    coords: [45.98587371996527, 6.457682765406178],
    parking: "Parking via ferrata La Tour du Jallouvre",
    acces: "20 min de marche",
    lien: "#",
    difficulte: "difficile"
  },
];

// Fonction pour choisir la couleur selon la difficulté
function getMarkerColor(difficulte) {
  const d = difficulte.trim().toLowerCase();
  switch (d) {
    case "facile": return "green";        // Facile -> Vert
    case "moyen": return "blue";          // Moyen -> Bleu
    case "difficile": return "red";       // Difficile -> Rouge
    case "très difficile": return "black"; // Très difficile -> Noir
    default: return "gray";               // Par défaut
  }
}

// Ajouter un marqueur pour chaque via ferrata et afficher un popup avec des informations
vias.forEach(via => {
  const diff = via.difficulte.trim().toLowerCase();
  const diffLabel = diff === "facile" ? "Facile" :
                    diff === "moyen" ? "Moyenne" :
                    diff === "difficile" ? "Difficile" :
                    "Très difficile";

  L.marker(via.coords, {
    icon: L.divIcon({
      className: 'via-marker',
      html: <div style="background-color: ${getMarkerColor(via.difficulte)}; width: 20px; height: 20px; border-radius: 50%;"></div>
    })
  }).addTo(map)
    .bindPopup(
      <strong>${via.nom}</strong><br>
      ${via.parking}<br>
      ${via.acces}<br>
      <a href="${via.lien}" target="_blank">Détails</a><br>
      <strong>Difficulté: ${diffLabel}</strong>
    );
});

// Ajouter une légende en bas à droite de la carte
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'info legend');
  const difficulties = ['facile', 'moyen', 'difficile', 'très difficile'];
  const colors = ['green', 'blue', 'red', 'black'];
  const labels = ['Facile', 'Moyenne', 'Difficile', 'Très difficile'];

  for (let i = 0; i < difficulties.length; i++) {
    div.innerHTML += 
      <i style="background:${colors[i]}; width: 15px; height: 15px; display: inline-block; border-radius: 50%; margin-right: 5px;"></i> ${labels[i]}<br>
    ;
  }

  return div;
};

legend.addTo(map);

