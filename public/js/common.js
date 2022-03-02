//Gets error and message and deletes it on the url
window.onload = () => {
    let url = (new URL(location.href))  //Gets URL

    let err = url.searchParams.get('err')   //Gets err message
    url.searchParams.delete('err')  //Deletes err message
    
    if (err) {  //If there is an error, shows it
        let main = document.querySelector('main')
        main.innerHTML = main.innerHTML + `<p>${err}</p>`
    }
    history.pushState("", "", url.href)
}