// document.addEventListener("DOMContentLoaded", () => {
//   const mapElement = document.getElementById("map");

//   if (!mapElement) return;

//   const listing = JSON.parse(mapElement.dataset.listing);

//   const coords = listing.geometry.coordinates;

//   // Leaflet uses [lat, lng] not [lng, lat]
//   const lat = coords[1];
//   const lng = coords[0];

//   // Create map
//   const map = L.map("map").setView([lat, lng], 13);

//   // OpenStreetMap tiles
//   L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png", {
//     attribution: '&copy; OpenStreetMap contributors',
//   }).addTo(map);

//   // Marker
//   const marker = L.marker([lat, lng]).addTo(map);

//   // Popup
//   marker
//     .bindPopup(
//       `<div class="map-click">
//         <h4><b>${listing.title}</b></h4>
//         <p>Exact location will be provided after booking.</p>
//       </div>`
//     )
//     .openPopup();

//   // Optional controls
//   L.control.scale().addTo(map);
// // });
//  document.addEventListener("DOMContentLoaded", () => {
//   const mapElement = document.getElementById("map");

//   // ✅ This ensures map runs only on show.ejs
//   if (!mapElement) return;

//   const listing = JSON.parse(mapElement.dataset.listing);

//   const [lng, lat] = listing.geometry.coordinates;

//   const map = L.map("map").setView([lat, lng], 12);

//   L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
//     attribution: "&copy; OpenStreetMap contributors",
//   }).addTo(map);

//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(listing.title)
//     .openPopup();
// });


document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");

  // only run on show page
  if (!mapElement) return;

  const listing = JSON.parse(mapElement.dataset.listing);

  let lat, lng;

  // OLD FORMAT: geometry: [lng, lat]
  if (Array.isArray(listing.geometry)) {
    lng = listing.geometry[0];
    lat = listing.geometry[1];
  }

  // NEW FORMAT: geometry: { coordinates: [lng, lat] }
  else if (listing.geometry?.coordinates) {
    lng = listing.geometry.coordinates[0];
    lat = listing.geometry.coordinates[1];
  }

  // ALT FORMAT: { lat, lng }
  else if (listing.geometry?.lat && listing.geometry?.lng) {
    lat = listing.geometry.lat;
    lng = listing.geometry.lng;
  }

  else {
    console.log("No valid geometry");
    return;
  }

  const map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(listing.title)
    .openPopup();
});