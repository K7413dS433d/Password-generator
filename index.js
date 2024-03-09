let ASCII = {
    // for numbers between 0 and 9
    1: function () {
        return (Math.floor(Math.random() * 10)) + 48; //return numbers between 48 to 57
    },
    // for all capital characters
    2: function () {
        return (Math.floor(Math.random() * 26)) + 65; //return numbers between 64 to 90
    },
    // for all small characters
    3: function () {
        return (Math.floor(Math.random() * 26) + 97); //return numbers between 97 to 122
    },
    //for all special characters %,$,#,&,*,+,?,@
    4: function () {
        let arr = [35, 36, 37, 38, 42, 43, 63, 64]
        return arr[Math.floor(Math.random() * arr.length)]; //return special characters #, &, %, $
    }
}



//get values of checkboxes
let upper = document.getElementById("upper");
let lower = document.getElementById("lower");
let sym = document.getElementById("sym");
let num = document.getElementById("num");
let chgLock = true; //change the lock to green if the password generated




function randPass() {
    let valid = [];
    let res = "";

    let checks = {
        1: num.checked,
        2: upper.checked,
        3: lower.checked,
        4: sym.checked,
    };

    for (let i = 1; i < 5; i++) {
        if (checks[i] === true) {
            valid.push(i);
        }
    }

    if (valid.length == 0) {
        res = "Choose setting first";
        chgLock = false
    } else {
        chgLock = true;
        let option_number = valid.length;
        let i = 0;
        while (i < rng.value) {
            res += String.fromCharCode(ASCII[valid[Math.floor(Math.random() * option_number)]]());
            i++;
        }

        i = 0;
    }
    return res;

}




// generate pass button and change color of lock
let generate = document.getElementById("generate_click"); // button for generate password
let lock = document.querySelector(".container .pass i::before");
let generate_section = document.getElementById("generated_pass"); //generated pass section



generate.addEventListener('click', function () {

    //set res to the input
    generate_section.value = randPass();


    //change color of lock to green

    // Get the root element
    const rootElement = document.documentElement;

    if (generate_section.value != '' && chgLock) {
        // Set the value of the --primary-color variable to 'green'
        rootElement.style.setProperty('--primary-color', 'green');
    } else {
        // Set the value of the --primary-color variable to 'blue'
        rootElement.style.setProperty('--primary-color', '#0c54fc');
    }


});



// change the number in box
let rng = document.getElementById("rng");
var rng_box = document.getElementById("rng_box");


rng_box.innerHTML = rng.value;

rng.oninput = function () {
    rng_box.innerHTML = this.value;
}




// change copy icon

let icn = document.getElementById("cp_icon"); // current icon
let gnPass = document.getElementById("generated_pass"); // generated password field

icn.onclick = function () {
    const originalIcon = this.innerHTML; // Store original icon

    if (originalIcon != '<i class="fa-solid fa-check fa-xl"></i>') {
        //copy text to clipboard
        navigator.clipboard.writeText(gnPass.value)

        // Change icon and set a timer to revert after 2 seconds
        this.innerHTML = '<i class="fa-solid fa-check fa-xl"></i>'

        setTimeout(() => {
            this.innerHTML = originalIcon; // Revert to original icon
        }, 1000);
    }
}



