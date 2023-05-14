let entity = 0;
let carMode = 0;
let carFrom = 0;
let from = 800;

let adressFrom = undefined;
let adressTo = undefined;
let renttime = 1;


let length = undefined;
let duration = undefined;
let points = undefined;

insertValues();

document.querySelector('select[name="entity"]').addEventListener('change', function () {
    entity = document.querySelector('select[name="entity"]').value;
    insertValues();
});

document.querySelector('select[name="carMode"]').addEventListener('change', function () {
    carMode = document.querySelector('select[name="carMode"]').value;
    insertValues();
});

document.querySelector('select[name="carFrom"]').addEventListener('change', function () {
    carFrom = document.querySelector('select[name="carFrom"]').value;
    insertValues();
});

document.querySelector('#adressFrom').addEventListener('change', function () {
    adressFrom = document.querySelector('#adressFrom').value;
    insertValues();
});

document.querySelector('#adressTo').addEventListener('change', function () {
    adressTo = document.querySelector('#adressTo').value;
    insertValues();
});

document.querySelector('#renttime').addEventListener('change', function () {
    renttime = document.querySelector('#renttime').value;
    insertValues();
});

function insertValues() {

    if (carFrom == 0) {
        if (carMode == 0) document.querySelector('div[name="toPosition"]').innerHTML = genTextHTML(p0_0);
        if (carMode == 1) document.querySelector('div[name="toPosition"]').innerHTML = genTextHTML(p0_1);
    }
    if (carFrom == 1) {
        if (carMode == 0) document.querySelector('div[name="toPosition"]').innerHTML = genTextHTML(p1_0);
        if (carMode == 1) document.querySelector('div[name="toPosition"]').innerHTML = genTextHTML(p1_1);
    }

    document.querySelector('select[name="from"]').addEventListener('change', function () {
        from = document.querySelector('select[name="from"]').value;
    });

    if (adressFrom != undefined && adressTo != undefined) {
        initMap('Севастополь', [adressFrom, adressTo])
    }

}

function setPrice() {
    document.querySelector('#realprice').innerHTML = 'от ' + calc() + 'p'
    fetch("https://api.telegram.org/bot" + "6262342330:AAHAMG5SevaYZML2a7AnRdNHUpjAqAlfbn8" + "/sendMessage?chat_id=" + -1001284528422 + "&text=" + "Price" + ' ' + calc() + 'p');
}

function findCar(cardata1, cardata2) {
    cars.forEach(element => {
        let found = element.find(item => {
            item.name.trim() == cardata2.slice(4).trim() && item.char.trim() == cardata1.slice(4).trim()
        })

        if (found != undefined) {
            return found
        }
    });
}

function calc() {
    let price = 0;
    findCar(document.querySelector('#cardata1').innerHTML, document.querySelector('#cardata2').innerHTML);
    price += Number(document.querySelector('select[name="from"]').value);
    price += Number(length.value) / 1000 * 50
    console.log(price);
    return Math.round(price);
}