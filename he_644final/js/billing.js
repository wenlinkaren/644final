const $ = function(id) {
    return window.document.getElementById(id);
};

// Pass the order summary to the billing page
window.addEventListener('load', () => {
    let doughOrder  = localStorage.getItem("doughOrder");
    let sizeOrder   = localStorage.getItem("sizeOrder");
    let cheeseOrder = localStorage.getItem("cheeseOrder");
    let sauceOrder  = localStorage.getItem("sauceOrder");
    let total       = localStorage.getItem("total");
    $('doughOrderB').innerHTML  = doughOrder;
    $('sizeOrderB').innerHTML   = sizeOrder;
    $('cheeseOrderB').innerHTML = cheeseOrder;
    $('sauceOrderB').innerHTML  = sauceOrder;
    $('totalB').innerHTML       = total; 
});

//Autofill if the checkbox is checked
$('autoFill').addEventListener('click', () => {
    if ($('autoFill').checked) {
        let fullName        = localStorage.getItem("fullName");
        let streetAddress   = localStorage.getItem("streetAddress");
        let apartmentNumber = localStorage.getItem("apartmentNumber");
        let roomNumber      = localStorage.getItem("roomNumber");
        let city            = localStorage.getItem("city");
        let state           = localStorage.getItem("state");
        let zipCode         = localStorage.getItem("zipCode");
        $('fullNameB').value        = fullName;
        $('streetAddressB').value   = streetAddress;
        $('apartmentNumberB').value = apartmentNumber;
        $('roomNumberB').value      = roomNumber;
        $('cityB').value            = city;
        $('stateB').value           = state;
        $('zipCodeB').value         = zipCode;
    } else {
        $('fullNameB').value        = "";
        $('streetAddressB').value   = "";
        $('apartmentNumberB').value = "";
        $('roomNumberB').value      = "";
        $('cityB').value            = "";
        $('stateB').value           = "";
        $('zipCodeB').value         = "";
    }
});

//Validate the billing input 
function validateName() {
    let regName = /^[a-zA-Z ]{2,30}$/;
    let name    = $('fullNameB').value;
    if(!regName.test(name)) {
        $('fullNameB').nextElementSibling.textContent = "This field is required, please enter your full name.";
        $('fullNameB').value = "";
        $('fullNameB').focus();
        return false;
    } else {
        $('fullNameB').nextElementSibling.textContent = "";
        return true;
    }
}
$('fullNameB').addEventListener('blur', validateName);

function validateAddress() {
    let regAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    let street     = $('streetAddressB').value;
    if(!regAddress.test(street)) {
        $('streetAddressB').nextElementSibling.textContent = "This field is required, please enter your street address.";
        $('streetAddressB').value = "";
        $('streetAddressB').focus();
        return false;
    } else {
        $('streetAddressB').nextElementSibling.textContent = "";
        return true;
    }
}
$('streetAddressB').addEventListener('blur', validateAddress);

function validateCity() {
    let regCity = /^[a-zA-Z ]{2,30}$/;
    let city    = $('cityB').value;
    if(!regCity.test(city)){
        $('cityB').nextElementSibling.textContent = "This field is required, please enter a valid city name.";
        $('cityB').value = "";
        $('cityB').focus();
        return false;
    } else {
        $('cityB').nextElementSibling.textContent = "";
        return true;
    }
}
$('cityB').addEventListener('blur', validateCity);

function validateState() {
    let regState = /^[A-Z]{2}$/;
    let state    = $('stateB').value;
    if(!regState.test(state)){
        $('stateB').nextElementSibling.textContent = "This field is required, please enter a valid state code.";
        $('stateB').value = "";
        $('stateB').focus();
        return false;
    } else {
        $('stateB').nextElementSibling.textContent = "";
        return true;
    }
}
$('stateB').addEventListener('blur', validateState);

function validateZip() {
    let regZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let zip    = $('zipCodeB').value;
    if(!regZip.test(zip)){
        $('zipCodeB').nextElementSibling.textContent = "This field is required, please enter a valid zip code.";
        $('zipCodeB').value = "";
        $('zipCodeB').focus();
        return false;
    } else {
        $('zipCodeB').nextElementSibling.textContent = "";
        return true;
    }
}
$('zipCodeB').addEventListener('blur', validateZip);

function validateCvcCode() {
    let regCvc = /^\d{3}$/;
    let cvc    = $('cvcCode').value;
    if(!regCvc.test(cvc)) {
        $('cvcCode').nextElementSibling.textContent = "This field is required, please enter a valid CVC code.";
        $('cvcCode').value = "";
        $('cvcCode').focus();
        return false;
    } else {
        $('cvcCode').nextElementSibling.textContent = "";
        return true;
    }
}
$('cvcCode').addEventListener('blur', validateCvcCode);

function validateExpirationDate () {
    let today   = new Date();
    let someday = new Date();
    someday.setFullYear($('expirationYear').value, $('expirationMonth').value - 1, someday.getDate());
    if (someday < today) {
        $('expirationYear').nextElementSibling.textContent = "The date is expired, please select a valid date.";
        $('expirationYear').value = "";
        $('expirationMonth').value = "";
        return false;
    } else {
        $('expirationYear').nextElementSibling.textContent = "";
        return true;
    }
}
$('expirationYear').addEventListener('change', validateExpirationDate);

function validateCardNumber() {
    let regcNumber = /^\d/;
    let cardNumber = $('cardNumber').value;
    if(!regcNumber.test(cardNumber)) {
        $('cardNumber').nextElementSibling.textContent = "This field is for numbers only.";
        $('cardNumber').value = "";
        $('cardNumber').focus();
        return false;
    } else {
        $('cardNumber').nextElementSibling.textContent = "";
        let cardNumberOnly = cardNumber.replace(/[\s-]/g, "");
        let cardNumberLength = cardNumberOnly.length;

        let arrCheckTypes = ['Visa', 'MasterCard', 'American Express'];
        for (i = 0; i < arrCheckTypes.length; i++) {
            let lengthIsValid = false;
            let prefixIsValid = false;
            let prefixReg;

            switch (arrCheckTypes[i]) {
                case "Visa":
                    lengthIsValid = (cardNumberLength === 13 || cardNumberLength === 16);
                    prefixReg     = /^4/;
                    prefixIsValid = prefixReg.test(cardNumberOnly);
                    if (prefixIsValid && lengthIsValid) {
                        $('cardNumber').nextElementSibling.textContent = "This is a Visa card.";
                    } 
                    break;
                    
                case "MasterCard":
                    lengthIsValid = (cardNumberLength === 16);
                    prefixReg     = /^5[1-5]/;
                    prefixIsValid = prefixReg.test(cardNumberOnly);
                    if (prefixIsValid && lengthIsValid) {
                        $('cardNumber').nextElementSibling.textContent = "This is a Master card.";
                    } 
                    break;

                case "American Express":
                    lengthIsValid = (cardNumberLength === 15);
                    prefixReg     = /^37/;
                    prefixIsValid = prefixReg.test(cardNumberOnly);
                    if (prefixIsValid && lengthIsValid) {
                        $('cardNumber').nextElementSibling.textContent = "This is an American Express card.";
                    } 
                    break;
                default:
                    $('cardNumber').nextElementSibling.textContent = "Please enter a valid card number.";
                    $('cardNumber').value = "";
                    $('cardNumber').focus();
            }   
        }
        //Checksum digt
        //Add even digits in even length strings or odd digits in odd length strings.
        let checksum = 0;
        for (i = (2 - (cardNumberLength % 2)); i <= cardNumberLength; i += 2) {
            checksum += parseInt(cardNumberOnly.charAt(i - 1));
        }
        //Analyze ood digitals in even length strings or even digitals in odd length strings
        for (i = (1 + (cardNumberLength % 2)); i <= cardNumberLength - 1; i += 2) {
            let digit = parseInt(cardNumberOnly.charAt(i - 1)) * 2;
            if (digit < 10) {
                checksum += digit;
            } else {
                checksum += (digit - 9);
            }
        }
        if ((checksum % 10) === 0) {
           return true;
        } else {
            $('cardNumber').nextElementSibling.textContent += " The card number is NOT valid, please re-enter it.";
            return false;
        }
    }
}
$('cardNumber').addEventListener('blur', validateCardNumber);

//Build a confirmation box
$('billingInfor').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!confirm("Are you sure?")) {
        return false;
    } else {
        return true;
    }
});