
const button = document.getElementById("share");
const status = document.getElementById("status");
const result = document.getElementById("result");
const coordinates = document.getElementById("coordinates");
const map = document.getElementById("map");

button.addEventListener("click", () => {
  result.hidden = true;

  if (!navigator.geolocation) {
    status.textContent = "Location is not supported by this browser.";
    return;
  }

  status.textContent = "Please respond to the browser permission request.";
  button.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      coordinates.textContent =
        `Latitude: ${lat.toFixed(5)}, Longitude: ${lon.toFixed(5)}`;

      map.href = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;

      result.hidden = false;
      status.textContent = "Location displayed on this device only.";
      button.disabled = false;
    },
    () => {
      status.textContent = "Location permission denied or unavailable.";
      button.disabled = false;
    },
    { enableHighAccuracy: false, timeout: 15000 }
  );
});
