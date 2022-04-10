//This function gets and returns the user location
//https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
function getUserCoordinatesPromise() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getUserCoordinates() {
  try {
    return await getUserCoordinatesPromise()
  } catch (err) {
    alert("You didn't allowed your location, so you cannot deliver a package. please allow the permission and reload the page") 
    return false
  }
}

window.addEventListener('load', async function() {
    const userLocation = await getUserCoordinates()
    if (userLocation) {
        document.getElementsByName('locationReceivedLat')[0].value = userLocation.coords.latitude
        document.getElementsByName('locationReceivedLng')[0].value = userLocation.coords.longitude
    }
}, false)