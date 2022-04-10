//This function gets and returns the user location
//https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
function getUserCoordinatesPromise() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getUserCoordinates() {
  try {
    return await getUserCoordinatesPromise()  //Tries to get the user coordinates
  } catch (err) { //If error then user didnt accepted location
    alert("You didn't allowed your location, so the parcels will not show in order of distance") 
    return false
  }
}

//Get available parcels
async function getAvailableParcels(userLocation) { 
  let response = ''
  if (userLocation == false)  //If location not enabled, then get parcels by date
    response = await fetch(`/getAvailableParcelsApi/`)
  else //If location enabled, then get parcels by distance
    response = await fetch(`/getAvailableParcelsApi/${userLocation.coords.latitude}/${userLocation.coords.longitude}`)

  let data = await response.json()  //Converts the response into a usable object
  return data   //returns it
}

function showParcels(parcels) { //Writes the html of each parcel
  if (!parcels.length) document.getElementsByTagName('main')[0].innerHTML += `<h1>No parcels available</h1>`  //If there is no parcels, show message

  for (parcel of parcels) {
    const hoursSinceStarted = 'Hours since added: ' + Math.floor(Math.abs(new Date() - new Date(parcel.dateAndTimeAdded)) / 36e5) //Get the hours since added

    //Writes the html of each parcel
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

window.addEventListener('load', async function() {  //On load function
    const userLocation = await getUserCoordinates() //Get the coordinates from user
    const parcels = await getAvailableParcels(userLocation) //Get the available parcels
    showParcels(parcels)  //Writes the parcels
}, false)