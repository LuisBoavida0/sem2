getFullAddress = (btn, receiverName, saveLocation = false) => {  //Gets the info from the postcode (Using google maps api)
    //Fetched the address with the postcode
    fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAcVD7SuDFqDU6J7OQtZl-T87HIzR74wR4&components=postal_code:' + btn.previousElementSibling.value)
    .then(response => response.json())  //Converts the response to json
    .then(data => {
        document.getElementsByName(receiverName)[0].innerHTML = data.results[0].formatted_address   //Writes the address on the label
        if (saveLocation) { //If it is to save the location then store the lat and lng
            document.getElementsByName('destinationLat')[0].value = data.results[0].geometry.location.lat
            document.getElementsByName('destinationLng')[0].value = data.results[0].geometry.location.lng
        }
    }).catch(err => {
       alert('address not found')   //If there is an error than it means that the address was not found
    })
}

form_combine_address = () => {  //Before form submit, this function is called to join the address info into one value
    let textArea = document.getElementsByName('senderAddressLabel')[0]  //Gets the address label
    let houseNumber = document.getElementsByName('senderHouseNumber')[0]      //Gets the house number
    let fullAddress = document.getElementsByName('senderAddress')[0]      //Gets the input hidden that will have the entire value
    fullAddress.value = houseNumber.value + ', ' + textArea.textContent //Joins the info

    //The same but for the destination info
    textArea = document.getElementsByName('destinationAddressLabel')[0]
    houseNumber = document.getElementsByName('destinationHouseNumber')[0]
    fullAddress = document.getElementsByName('destinationAddress')[0]
    fullAddress.value = houseNumber.value + ', ' + textArea.textContent

    return true //Return true to allow the form submition
}

showRange = (range, val) => range.innerHTML = val   //Writes the range of the input range