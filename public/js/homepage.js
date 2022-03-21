// On page load change dates from parcel to a more readable format and add the class for the status of parcel
window.addEventListener('load', function(){
    const datesEl = document.querySelectorAll('main>section>p:nth-child(3)')    //Get dates elements
    const parcelStatusEl = document.querySelectorAll('main>section>p:last-of-type') //Get parcel status elements

    for (let i = 0; i < parcelStatusEl.length; i++) {   //Go through each parcel
        datesEl[i].innerHTML = new Date(datesEl[i].innerHTML).toLocaleString()  //Format date
        parcelStatusEl[i].classList.add(parcelStatusEl[i].innerHTML)    //Add class for parcel status
    }
}, false)