getFullAddress = (btn, receiverName) => {  //Gets the info from the postcode (Using google maps api)
    fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAcVD7SuDFqDU6J7OQtZl-T87HIzR74wR4&components=postal_code:' + btn.previousElementSibling.value)
    .then(response => response.json())
    .then(data => {
        document.getElementsByName(receiverName)[0].innerHTML = data.results[0].formatted_address        
    }).catch(err => {
       alert('address not found')
    })
}

form_combine_address = () => {
    let textArea = document.getElementsByName('senderAddress')[0]
    let houseNumber = document.getElementsByName('senderHouseNumber')[0]
    textArea.textContent = houseNumber.value + ', ' + textArea.textContent

    textArea = document.getElementsByName('destinationAddress')[0]
    houseNumber = document.getElementsByName('destinationHouseNumber')[0]
    textArea.textContent = houseNumber.value + ', ' + textArea.textContent
    return true
}

showRange = (range, val) => range.innerHTML = val   //Writes the range of the input range