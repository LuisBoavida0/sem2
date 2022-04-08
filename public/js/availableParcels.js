//These two functions gets and returns the user location
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
    alert("You didn't allowed your location, so the parcels will not show in order of distance") 
    return false
  }
}

//Get available parcels
async function getAvailableParcels(userLocation) { 
  let response = ''
  if (userLocation == false)
    response = await fetch(`/getAvailableParcelsApi/`)
  else 
    response = await fetch(`/getAvailableParcelsApi/${userLocation.coords.latitude}/${userLocation.coords.longitude}`)    //fetches the parcels

  let data = await response.json()
  return data   //returns it
}

//NOT NEEDED I THIKN
async function getCoordinates(address) { 
  let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAcVD7SuDFqDU6J7OQtZl-T87HIzR74wR4&address=' + address)    //fetches the address
  let data = await response.json()
  return data.results[0].geometry.location   //returns it
}

function showParcels(parcels) {
  if (!parcels.length) document.getElementsByTagName('main')[0].innerHTML += `<h1>No parcels available</h1>`

  for (parcel of parcels) {
    const hoursSinceStarted = 'Hours since added: ' + Math.floor(Math.abs(new Date() - new Date(parcel.dateAndTimeAdded)) / 36e5)

    document.getElementsByTagName('main')[0].innerHTML += `
      <section>
        <h2>${parcel.parcelName}</h2>
        <p>Destination: ${parcel.destinationAddress}</p>
        <p>${hoursSinceStarted}</p>
        <p>Weight: ${parcel.kgs} kgs</p>
        <form action="/manageParcel" method="post">
          <input type='hidden' name='trackingNumber' value='${parcel.trackingNumber}'>
          <input type='submit' value='Assign'>
        </form>
      </section>
    `
  }
}

window.addEventListener('load', async function() {
    const userLocation = await getUserCoordinates()
    const parcels = await getAvailableParcels(userLocation)
    showParcels(parcels)
}, false)