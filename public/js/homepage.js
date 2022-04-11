// On page load change dates from parcel to a more readable format and add the class for the status of parcel
window.addEventListener('load', function(){
    const datesEl = document.querySelectorAll('section>p:nth-child(3)')    //Get dates elements
    const parcelStatusEl = document.querySelectorAll('section>p:last-of-type>b') //Get parcel status elements
    const title = document.querySelector('h1').innerHTML    //Gets the title of the page to see on which page we are
    if (title === 'Delivered Parcels') return true  //If on delivered parcels, dont edit anything

    for (let i = 0; i < datesEl.length; i++) {   //Go through each parcel
        if (title === 'Your parcels') datesEl[i].innerHTML = 'Added on: ' + new Date(datesEl[i].innerHTML).toLocaleString()  //If in your parcels page format date
        else {  //If in courier homepage Convert the date into hours since now
            const hours = Math.floor(Math.abs(new Date() - new Date(datesEl[i].innerHTML)) / 36e5)
            datesEl[i].innerHTML = 'Hours since added: ' + (hours > 48 ? `<strong>${hours}</strong>` : hours)
        }
        if (parcelStatusEl.length) parcelStatusEl[i].classList.add(parcelStatusEl[i].innerHTML)    //Add class for parcel status
    }
}, false)