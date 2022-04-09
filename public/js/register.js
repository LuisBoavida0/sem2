function check(input, other) {  //Checks if passwords are the same
    if (input.value != document.getElementsByName(other)[0].value) {    //If different, send error as a input validity
        input.setCustomValidity('Password Must be Matching.')
        document.getElementsByName(other)[0].setCustomValidity('Password Must be Matching.')
    } else { // input is valid reset the error message
        input.setCustomValidity('')
        document.getElementsByName(other)[0].setCustomValidity('')
    }
}