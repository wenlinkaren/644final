//Part1 - Delivery Location
const $ = function(id) {
    return window.document.getElementById(id);
};

//Add text box when user selected Others in Address Type
function CheckAddressType(val) {
    if (val === "Other")
        $('address').style.display = 'block';
    else
        $('address').style.display = 'none';
}

//Validate the delivery inputs 
function validateName() {
    let regName = /^[a-zA-Z ]{2,30}$/;
    let name    = $('fullName').value;
    if(!regName.test(name)) {
        $('fullName').nextElementSibling.textContent = "This field is required, please enter your full name.";
        $('fullName').value = "";
        $('fullName').focus();
        return false;
    } else {
        $('fullName').nextElementSibling.textContent = "";
        return true;
    }
}
$('fullName').addEventListener('blur', validateName);

function validateAddress() {
    let regAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    let street     = $('streetAddress').value;
    if(!regAddress.test(street)) {
        $('streetAddress').nextElementSibling.textContent = "This field is required, please enter your street address.";
        $('streetAddress').value = "";
        $('streetAddress').focus();
        return false;
    } else {
        $('streetAddress').nextElementSibling.textContent = "";
        return true;
    }
}
$('streetAddress').addEventListener('blur', validateAddress);

function validateCity() {
    let regCity = /^[a-zA-Z ]{2,30}$/;
    let city    = $('city').value;
    if(!regCity.test(city)) {
        $('city').nextElementSibling.textContent = "This field is required, please enter a valid city name.";
        $('city').value = "";
        $('city').focus();
        return false;
    } else {
        $('city').nextElementSibling.textContent = "";
        return true;
    }
}
$('city').addEventListener('blur', validateCity);

function validateState() {
    let regState = /^[A-Z]{2}$/;
    let state    = $('state').value;
    if(!regState.test(state)) {
        $('state').nextElementSibling.textContent = "This field is required, please enter a valid state code.";
        $('state').value = "";
        $('state').focus();
        return false;
    } else {
        $('state').nextElementSibling.textContent = "";
        return true;
    }
}
$('state').addEventListener('blur', validateState);

function validateZip() {
    let regZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    let zip    = $('zipCode').value;
    if(!regZip.test(zip)) {
        $('zipCode').nextElementSibling.textContent = "This field is required, please enter a valid zip code.";
        $('zipCode').value = "";
        $('zipCode').focus();
        return false;
    } else {
        $('zipCode').nextElementSibling.textContent = "";
        return true;
    }
}
$('zipCode').addEventListener('blur', validateZip);

function validatePhone() {
    let regPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let phone = $('phone').value;
    if(!regPhone .test(phone)) {
        $('phone').nextElementSibling.textContent = "This field is required, please enter a valid phone number.";
        $('phone').value = "";
        $('phone').focus();
        return false;
    } else {
        $('phone').nextElementSibling.textContent = "";
        return true;
    }
}
$('phone').addEventListener('blur', validatePhone);

function validateEmail() {
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let email = $('email').value;
    if(!regEmail .test(email)) {
        $('email').nextElementSibling.textContent = "This field is required, please enter a valid email.";
        $('email').value = "";
        $('email').focus();
        return false;
    } else {
        $('email').nextElementSibling.textContent = "";
        return true;
    }
}
$('email').addEventListener('blur', validateEmail);

//Part 2 - Build a pizza
const Pizza = {
    dough: {
        HandTossed:  [["Small", "9.99"], ["Medium", "12.99"], ["Large", "14.99"]],
        ThinCrust:   [["Medium", "11.99"], ["Large", "13.99"]],
        NewYorkStyle:[["Large", "16.99"], ["Extra large", "19.99"]],
        GlutenFree:  [["Small", "10.99"]]
    },
    cheese:  [["Light", "0"], ["Normal (default)", "0"], ["Extra", "2.99"], ["Double", "3.99"]],
    sauce:  [["Regular Tomato", "0"], ["Hearty Tomato", "0.99"], ["BBQ Sauce", "1.99"]],
    toppings:[["pepperoni", "0.99"],
              ["sausage", "0.99"],
              ["ham", "0.99"],
              ["bacon", "0.99"],
              ["salami", "0.99"],
              ["peppers", "0.99"],
              ["olives", "0.99"],
              ["jalapenos", "0.99"],
              ["mushrooms", "0.99"],
              ["pineapple", "0.99"],
              ["onion", "0.99"]],
    
    setCheese() {
        $('cheeseOptions').innerHTML = "";
        for (let i = 0; i < Pizza.cheese.length; i +=1) {
            $('cheeseOptions').innerHTML +=
            `<option value = "${Pizza.cheese[i][0]} ($${Pizza.cheese[i][1]})">${Pizza.cheese[i][0]} ($${Pizza.cheese[i][1]})</option>`
        }
    },
    setSauce() {
        $('sauceOptions').innerHTML = "";
        for (let i = 0; i < Pizza.sauce.length; i +=1) {
            $('sauceOptions').innerHTML +=
            `<option value = "${Pizza.sauce[i][0]} ($${Pizza.sauce[i][1]})">${Pizza.sauce[i][0]} ($${Pizza.sauce[i][1]})</option>`
        }
    },
    setTopping() {
        $('toppings').innerHTML = "";
        for (let i = 0; i < Pizza.toppings.length; i +=1) {
            $('toppings').innerHTML +=
            `<label style="font-weight: 500;padding-right: 5px;">
            <input type="checkbox" name="toppings" value="${Pizza.toppings[i][0]}" onclick="getToppings()"/>${Pizza.toppings[i][0]}
            </label>`    
        }
    }
}

//create drop down lists of incerdients for each doung type 
$('handTossed').addEventListener('click', () => {
    $('sizeBox').style.display = 'block';
    $('sizeAndCost').innerHTML = "";
    for (let i = 0; i < Pizza.dough.HandTossed.length; i += 1) {
        $('sizeAndCost').innerHTML += 
         `<option value = "${Pizza.dough.HandTossed[i][0]} ($${Pizza.dough.HandTossed[i][1]})">${Pizza.dough.HandTossed[i][0]} ($${Pizza.dough.HandTossed[i][1]})</option>`    
    }
    Pizza.setCheese();
    Pizza.setSauce();
    Pizza.setTopping();
    $('doughOrder').innerHTML  = 'Dough Type: Hand Tossed';
    $('sizeOrder').innerHTML   = `Size and cost: ${Pizza.dough.HandTossed[0][0]} ($${Pizza.dough.HandTossed[0][1]})`;
    $('cheeseOrder').innerHTML = `Cheese options: ${Pizza.cheese[0][0]} ($${Pizza.cheese[0][1]})`;
    $('sauceOrder').innerHTML  = `Sauce options: ${Pizza.sauce[0][0]} ($${Pizza.sauce[0][1]})`;
    $('total').innerHTML       = 'Total: $9.99';
});

$('thinCrust').addEventListener('click', () => {
    $('sizeBox').style.display = 'block';
    $('sizeAndCost').innerHTML = "";
    for (let i = 0; i < Pizza.dough.ThinCrust.length; i += 1) { 
        $('sizeAndCost').innerHTML += 
        `<option value = "${Pizza.dough.ThinCrust[i][0]} ($${Pizza.dough.ThinCrust[i][1]})">${Pizza.dough.ThinCrust[i][0]} ($${Pizza.dough.ThinCrust[i][1]})</option>`
    }
    Pizza.setCheese();
    Pizza.setSauce();
    Pizza.setTopping();
    $('doughOrder').innerHTML  = 'Dough Type: Thin Crust';
    $('sizeOrder').innerHTML   = `Size and cost: ${Pizza.dough.ThinCrust[0][0]} ($${Pizza.dough.ThinCrust[0][1]})`;
    $('cheeseOrder').innerHTML = `Cheese options: ${Pizza.cheese[0][0]} ($${Pizza.cheese[0][1]})`;
    $('sauceOrder').innerHTML  = `Sauce options: ${Pizza.sauce[0][0]} ($${Pizza.sauce[0][1]})`;
    $('total').innerHTML       = 'Total: $11.99';
});

$('newYorkStyle').addEventListener('click', () => { 
    $('sizeBox').style.display = 'block';
    $('sizeAndCost').innerHTML = "";
    for (let i = 0; i < Pizza.dough.NewYorkStyle.length; i += 1) { 
        $('sizeAndCost').innerHTML += 
        `<option value = "${Pizza.dough.NewYorkStyle[i][0]} ($${Pizza.dough.NewYorkStyle[i][1]})">${Pizza.dough.NewYorkStyle[i][0]} ($${Pizza.dough.NewYorkStyle[i][1]})</option>`
    }
    Pizza.setCheese();
    Pizza.setSauce();
    Pizza.setTopping();
    $('doughOrder').innerHTML  = 'Dough Type: New York Style';
    $('sizeOrder').innerHTML   = `Size and cost: ${Pizza.dough.NewYorkStyle[0][0]} ($${Pizza.dough.NewYorkStyle[0][1]})`;
    $('cheeseOrder').innerHTML = `Cheese options: ${Pizza.cheese[0][0]} ($${Pizza.cheese[0][1]})`;
    $('sauceOrder').innerHTML  = `Sauce options: ${Pizza.sauce[0][0]} ($${Pizza.sauce[0][1]})`;
    $('total').innerHTML       = 'Total: $16.99';
});

$('glutenFree').addEventListener('click', () => {
    $('sizeBox').style.display = 'block';
    $('sizeAndCost').innerHTML = "";
    for (let i = 0; i < Pizza.dough.GlutenFree.length; i += 1) { 
        $('sizeAndCost').innerHTML += 
        `<option value = "${Pizza.dough.GlutenFree[i][0]} $${Pizza.dough.GlutenFree[i][1]}">${Pizza.dough.GlutenFree[i][0]} ($${Pizza.dough.GlutenFree[i][1]})</option>`
    }
    Pizza.setCheese();
    Pizza.setSauce();
    Pizza.setTopping();
    $('doughOrder').innerHTML  = 'Dough Type: Gluten Free';
    $('sizeOrder').innerHTML   = `Size and cost: ${Pizza.dough.GlutenFree[0][0]} ($${Pizza.dough.GlutenFree[0][1]})`;
    $('cheeseOrder').innerHTML = `Cheese options: ${Pizza.cheese[0][0]} ($${Pizza.cheese[0][1]})`;
    $('sauceOrder').innerHTML  = `Sauce options: ${Pizza.sauce[0][0]} ($${Pizza.sauce[0][1]})`;
    $('total').innerHTML       = 'Total: $10.99';
});

//Select the order options
$('sizeAndCost').addEventListener('change', () => {
    let sizeOrder            = $('sizeAndCost').value; 
    let sizeOrderArr         = sizeOrder.split("$");
    $('sizeOrder').innerHTML = `Size and cost: ${sizeOrder}`;
    let sizeTotal            = Number(parseFloat(sizeOrderArr[1]));
    $('sizeTotal').innerHTML = sizeTotal; 
    let total                = sizeTotal + Number(parseFloat($('cheeseTotal').innerText)) + Number(parseFloat($('sauceTotal').innerText)) + Number(parseFloat($('toppingsTotal').innerText));
    $('total').innerHTML     = `Total: $${total.toFixed(2)}`;
});

$('cheeseOptions').addEventListener('change', () => {
    let cheeseOrder            = $('cheeseOptions').value
    let cheeseOrderArr         = cheeseOrder.split("$"); 
    $('cheeseOrder').innerHTML = `Cheese options: ${cheeseOrder}`;
    let cheeseTotal            = Number(parseFloat(cheeseOrderArr[1]));
    $('cheeseTotal').innerHTML = cheeseTotal; 
    let total                  = Number(parseFloat($('sizeTotal').innerText)) + cheeseTotal + Number(parseFloat($('sauceTotal').innerText)) + Number(parseFloat($('toppingsTotal').innerText));
    $('total').innerHTML       = `Total: $${total.toFixed(2)}`;
});

$('sauceOptions').addEventListener('change', () => {
    let sauceOrder            = $('sauceOptions').value 
    let sauceOrderArr         = sauceOrder.split("$"); 
    $('sauceOrder').innerHTML = `Sauce options: ${sauceOrder}`;
    let sauceTotal            = Number(parseFloat(sauceOrderArr[1]));
    $('sauceTotal').innerHTML = sauceTotal; 
    let total                 = Number(parseFloat($('sizeTotal').innerText)) + Number(parseFloat($('cheeseTotal').innerText)) + sauceTotal + Number(parseFloat($('toppingsTotal').innerText));
    $('total').innerHTML      = `Total: $${total.toFixed(2)}`;
});

//Create a handler for checkbox
function getToppings() {
    let toppingInput = document.getElementsByName('toppings');
    let price        = 0;
    $('toppingsOrder').innerHTML = "Toppings (+$0.99/item): ";
    for (let i = 0; i < toppingInput.length; i+=1) {
        if (toppingInput[i].checked) {
            $('toppingsOrder').innerHTML += `${toppingInput[i].value}, `;
            price += 0.99; 
            $('toppingsTotal').innerHTML = price.toFixed(2); 
            let total                    = Number(parseFloat($('sizeTotal').innerText)) + Number(parseFloat($('cheeseTotal').innerText)) + Number(parseFloat($('sauceTotal').innerText)) + Number(parseFloat($('toppingsTotal').innerText));
            $('total').innerHTML         = `Total: $${total.toFixed(2)}`;
        } 
    }
} 

//Build a confirmation box
$('deliveryInfor').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!confirm("Are you sure?")) {
        return false;
    } else {
        localStorage.setItem("fullName", $('fullName').value);
        localStorage.setItem("streetAddress", $('streetAddress').value);
        localStorage.setItem("apartmentNumber", $('apartmentNumber').value);
        localStorage.setItem("roomNumber", $('roomNumber').value);
        localStorage.setItem("city", $('city').value);
        localStorage.setItem("state", $('state').value);
        localStorage.setItem("zipCode", $('zipCode').value);
        localStorage.setItem("doughOrder", $('doughOrder').innerText);
        localStorage.setItem("sizeOrder", $('sizeOrder').innerText);
        localStorage.setItem("cheeseOrder", $('cheeseOrder').innerText);
        localStorage.setItem("sauceOrder", $('sauceOrder').innerText);
        localStorage.setItem("total", $('total').innerText);

        window.open('billing.html', '_self'); 
    }
});