//This function gets and returns the user location
//https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
function getUserCoordinatesPromise() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getUserCoordinates() {
  try {
    return await getUserCoordinatesPromise() //Tries to get the user coordinates
  } catch (err) { //If error then it means that the user didnt accepted location
    alert("You didn't allowed your location, so you cannot deliver a package. please allow the permission and reload the page") 
    return false
  }
}

window.addEventListener('load', async function() {
    const userLocation = await getUserCoordinates() //Tries to get the location
    if (userLocation) { //If location received, save them to the inputs
        document.getElementsByName('locationReceivedLat')[0].value = userLocation.coords.latitude
        document.getElementsByName('locationReceivedLng')[0].value = userLocation.coords.longitude
    }
}, false)