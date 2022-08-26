const body = document.getElementsByTagName('body')[0];

// Создание html основы
function createHTML() {
    body.innerHTML = `
    <div class="options">
        <div class="options_garage">
            <button class="options_butt-garage">TO GARAGE</button>
            <button class="options_butt-winners">TO WINNERS</button>
        </div>
        <div class="options_create">
            <input class="options_create-text" type="text">
            <input class="options_create-color" type="color">
            <button class="options_butt-create ">CREATE</button>
        </div>
        <div class="options_update">
            <input class="options_update-text" type="text" disabled>
            <input class="options_update-color" type="color" disabled>
            <button class="options_butt-update" disabled>UPDATE</button>
        </div>
        <div class="options_race">
            <button class="options_butt-race">RACE</button>
            <button class="options_butt-reset">RESET</button>
            <button class="options_butt-generate">GENERATE CARS</button>
            <button class="options_butt-remove">REMOVE ALL</button>
        </div>
        <div class="options_winner inactive">WINNER!!!</div>
    </div>
    <div class="garage">
        <div class="garage_set">
            <h3 class="garage_amount">Garage (1)</h3>
            <h4 class="garage_page">Page #1</h4>
            <div class="garage_cars">
            
            </div>
        </div>
        <div class="page-toggle">
            <button class="page-toggle_prev">PREV</button>
            <button class="page-toggle_next">NEXT</button>
        </div>
    </div>
    <div class="winners inactive">
        <div class="winners_set">
            <h3 class="winners_amount">Winners (1)</h3>
            <h4 class="winners_page">Page #1</h4>
            <table class="winners_table">

               
            </table>
        </div>
        <div class="page-toggle-winners">
            <button class="page-toggle-winners_prev">PREV</button>
            <button class="page-toggle-winners_next">NEXT</button>
        </div>
    </div>
    `
};

let driveObj = {}; // для сохранения всех текущих setInterval анимаций
let arrID = [];     // сохранение ID для получения индексов  машин на текущей странице(0-6)

createHTML();
fillGarage();

const options = document.querySelector('.options');
const garage = document.querySelector('.garage');
const createMenu = document.querySelector('.options_create');
const updateMenu = document.querySelector('.options_update');
const raceMenu = document.querySelector('.options_race');
const cars = document.querySelector('.garage_cars');
const amountCars = document.querySelector('.garage_amount');
const currentPage = document.querySelector('.garage_page');
const next = document.querySelector('.page-toggle_next');
const prev = document.querySelector('.page-toggle_prev');
const create = document.querySelector('.options_butt-create');
const createText = document.querySelector('.options_create-text');
const createColor = document.querySelector('.options_create-color');
const update = document.querySelector('.options_butt-update');
const updateText = document.querySelector('.options_update-text');
const updateColor = document.querySelector('.options_update-color');
const race = document.querySelector('.options_butt-race');
const reset = document.querySelector('.options_butt-reset');
const generate = document.querySelector('.options_butt-generate');
const removeAll = document.querySelector('.options_butt-remove');
const alertWinner = document.querySelector('.options_winner');
let start;
let stop;
let garageModels;
let garageRoad;
let carsName;
let page = localStorage.getItem('page-saved') || 1;
let statusFormat = localStorage.getItem('status-format') || 'true';
let maxPage; 
let carID;

reset.disabled = true;

// Заполнение гаража машинами
function fillGarage() {
    for(let interval in driveObj) {
        clearInterval(driveObj[interval]);
    };
    sendRequest('GET', urlGarage, null, null, null, null, null, null, null)
    .then(data => {
        maxPage = data.length / 7;

        amountCars.textContent = `Garage (${data.length})`;
        currentPage.textContent = `Page #${page}`;

        let i = 0;
        if(page > 1) i = (7 * (page - 1));

        let currentGaragePage = ``;

        for(let j = 0; j < 7; j++) {
            if(i >= data.length) break;

            currentGaragePage += ` 
            <div class="garage_car" id="${data[i].id}">
                <div class="garage_buttons">
                    <div>
                        <button class="garage_select" id="${data[i].id}">SELECT</button>
                        <button class="garage_remove" id="${data[i].id}">REMOVE</button>
                    </div>
                    <div class="garage_car-name">
                        ${data[i].name}
                    </div>
                </div>
                <div class="garage_track">
                    <div class="garage_mode">
                        <button class="garage_start" id="${data[i].id}">START</button> 
                        <button class="garage_stop" disabled id="${data[i].id}">STOP</button>
                    </div>
                    <div class="garage_road">
                        <div class="garage_model" id="${data[i].id}">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="200px" height="75px" viewBox="0 0 1250.000000 540.000000"
                            preserveAspectRatio="xMidYMid meet">
                            <metadata>
                            Created by potrace 1.15, written by Peter Selinger 2001-2017
                            </metadata>
                            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
                            fill="${data[i].color}" stroke="none">
                            <path d="M3525 5341 c-72 -18 -79 -28 -90 -121 -4 -30 -11 -62 -16 -71 -4 -9
                            -97 -51 -206 -94 -774 -304 -1348 -540 -1603 -661 -163 -77 -222 -91 -421
                            -104 -85 -5 -170 -14 -189 -20 -101 -32 -362 -58 -620 -63 l-115 -2 -47 -80
                            c-47 -78 -47 -80 -29 -100 34 -36 35 -77 5 -177 -30 -99 -34 -178 -19 -370 5
                            -67 4 -88 -6 -88 -29 0 -83 -56 -110 -114 -50 -106 -74 -343 -48 -467 13 -58
                            13 -62 3 -159 -5 -54 16 -238 28 -244 2 -1 29 -20 61 -41 73 -49 123 -103 132
                            -143 17 -79 167 -155 355 -181 104 -15 969 -97 1087 -104 l32 -2 5 160 c7 230
                            50 394 146 559 281 479 917 673 1405 429 316 -159 530 -424 598 -742 22 -106
                            29 -365 13 -519 l-8 -82 3002 0 c2855 0 3002 1 2995 18 -33 87 -56 325 -45
                            461 28 320 177 567 459 759 399 273 847 282 1243 24 239 -157 397 -392 460
                            -687 18 -84 15 -341 -5 -430 -8 -38 -14 -71 -12 -73 7 -8 386 20 478 34 180
                            28 253 65 304 152 24 41 28 57 28 127 -1 44 -9 117 -20 163 -18 79 -18 88 -2
                            190 31 199 40 306 41 497 1 176 -1 195 -23 260 -46 135 -103 190 -283 274
                            -222 104 -633 220 -1168 330 -523 108 -1524 210 -2054 211 l-229 0 -236 139
                            c-813 477 -1593 884 -1852 966 -498 157 -1598 195 -2892 100 l-188 -14 -47 30
                            c-92 58 -223 89 -297 70z m1912 -311 c13 -45 58 -305 88 -515 33 -226 74 -539
                            71 -542 -7 -7 -1672 40 -2054 58 -357 16 -464 56 -573 215 -62 91 -87 225 -59
                            326 12 40 56 74 192 148 369 198 799 289 1618 340 246 15 290 16 510 16 l194
                            -1 13 -45z m649 10 c383 -36 717 -86 934 -139 210 -52 451 -163 720 -332 141
                            -88 379 -259 380 -271 0 -5 -14 -8 -32 -8 -48 0 -114 -37 -140 -78 -24 -39
                            -30 -113 -15 -189 l9 -43 -904 0 -904 0 -176 540 -175 540 47 0 c25 0 141 -9
                            256 -20z"/>
                            <path d="M2617 3125 c-431 -82 -774 -440 -838 -875 -17 -117 -7 -292 24 -410
                            113 -436 497 -751 947 -777 507 -29 959 313 1076 813 28 117 26 348 -4 467
                            -94 378 -383 670 -760 768 -105 27 -336 34 -445 14z m378 -310 c84 -21 209
                            -85 280 -142 116 -94 210 -242 251 -393 23 -87 24 -260 0 -355 -58 -237 -242
                            -439 -473 -519 -531 -186 -1074 277 -969 828 30 152 94 274 206 386 111 110
                            237 178 385 206 84 16 235 11 320 -11z"/>
                            <path d="M2918 2568 c2 -90 7 -167 12 -172 17 -17 108 58 201 166 l51 57 -48
                            31 c-52 33 -131 65 -185 75 l-34 6 3 -163z"/>
                            <path d="M2591 2700 c-62 -22 -167 -82 -164 -94 3 -13 237 -216 249 -216 7 0
                            15 7 18 16 8 20 8 127 -1 232 -7 95 -8 96 -102 62z"/>
                            <path d="M3209 2355 c-57 -64 -105 -123 -107 -131 -6 -25 46 -35 157 -29 58 3
                            121 8 139 11 33 5 34 6 27 42 -7 44 -64 167 -92 201 l-19 24 -105 -118z"/>
                            <path d="M2260 2409 c-31 -44 -68 -133 -77 -186 l-6 -33 155 0 c165 0 201 9
                            181 44 -13 24 -204 216 -214 216 -5 0 -22 -18 -39 -41z"/>
                            <path d="M2786 2354 c-36 -35 0 -87 44 -64 26 14 26 56 1 70 -25 13 -27 13
                            -45 -6z"/>
                            <path d="M2751 2186 c-57 -32 -68 -111 -22 -157 43 -42 101 -43 143 -1 42 42
                            41 100 -1 143 -33 32 -78 38 -120 15z"/>
                            <path d="M2560 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
                            -54 2z"/>
                            <path d="M3002 2124 c-27 -19 -28 -36 -3 -58 25 -23 61 -6 61 29 0 33 -30 49
                            -58 29z"/>
                            <path d="M2245 1993 c-77 -6 -76 -5 -59 -65 16 -55 61 -146 92 -186 l18 -23
                            103 122 c57 67 104 129 105 138 1 14 -14 16 -104 17 -58 0 -127 -1 -155 -3z"/>
                            <path d="M3165 1981 c-44 -4 -61 -10 -63 -22 -3 -16 210 -229 228 -229 22 0
                            86 141 105 228 l7 32 -109 -2 c-59 -1 -135 -4 -168 -7z"/>
                            <path d="M2776 1914 c-19 -18 -19 -20 -6 -45 6 -11 21 -19 35 -19 20 0 45 24
                            45 44 0 10 -32 36 -45 36 -7 0 -21 -7 -29 -16z"/>
                            <path d="M2589 1743 c-86 -90 -139 -151 -139 -162 0 -25 179 -101 236 -101
                            l27 0 -7 143 c-9 166 -13 187 -35 187 -9 0 -46 -30 -82 -67z"/>
                            <path d="M2936 1801 c-6 -10 -24 -168 -29 -258 -3 -60 -2 -63 19 -63 79 0 262
                            68 248 92 -5 7 -53 64 -108 126 -93 105 -117 124 -130 103z"/>
                            <path d="M10723 3125 c-318 -58 -597 -266 -743 -555 -223 -441 -98 -996 289
                            -1288 112 -84 188 -125 311 -166 274 -91 545 -70 802 61 552 282 735 983 392
                            1500 -225 339 -651 521 -1051 448z m385 -315 c348 -98 579 -443 532 -796 -67
                            -508 -596 -796 -1055 -574 -239 116 -396 352 -412 620 -20 335 192 640 516
                            745 122 40 289 42 419 5z"/>
                            <path d="M11017 2568 c3 -90 9 -167 14 -172 13 -14 53 18 155 122 l95 97 -23
                            18 c-50 40 -189 97 -235 97 -10 0 -11 -33 -6 -162z"/>
                            <path d="M10705 2706 c-50 -16 -133 -58 -163 -82 l-23 -19 121 -107 c67 -60
                            128 -108 135 -108 23 0 27 39 20 186 -8 162 -4 157 -90 130z"/>
                            <path d="M11307 2354 c-59 -65 -107 -126 -107 -136 0 -11 11 -18 38 -22 44 -7
                            278 7 289 17 15 16 -51 183 -94 236 l-19 24 -107 -119z"/>
                            <path d="M10362 2413 c-39 -62 -70 -134 -78 -184 l-7 -39 152 0 c86 0 161 5
                            172 10 17 10 18 13 5 38 -8 15 -59 71 -114 125 l-99 99 -31 -49z"/>
                            <path d="M10888 2359 c-24 -14 -23 -56 2 -69 44 -23 80 29 44 64 -18 19 -23
                            19 -46 5z"/>
                            <path d="M10851 2187 c-49 -29 -66 -101 -35 -146 9 -13 32 -29 50 -37 29 -12
                            39 -12 68 0 99 41 85 180 -19 192 -24 3 -50 -1 -64 -9z"/>
                            <path d="M10660 2136 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
                            -54 2z"/>
                            <path d="M11096 2124 c-9 -8 -16 -22 -16 -29 0 -13 26 -45 36 -45 20 0 44 25
                            44 45 0 14 -8 29 -19 35 -25 13 -27 13 -45 -6z"/>
                            <path d="M10335 1991 c-60 -6 -60 -6 -57 -36 9 -69 104 -248 122 -229 57 61
                            210 250 207 258 -4 12 -176 17 -272 7z"/>
                            <path d="M11267 1983 c-68 -5 -79 -19 -47 -60 23 -31 200 -193 210 -193 3 0
                            20 24 37 53 29 48 52 111 67 180 l6 27 -107 -2 c-60 -1 -134 -3 -166 -5z"/>
                            <path d="M10870 1910 c-16 -31 4 -62 38 -58 21 2 28 9 30 32 5 45 -47 65 -68
                            26z"/>
                            <path d="M10651 1703 c-56 -59 -101 -113 -101 -120 0 -28 172 -103 237 -103
                            l26 0 -7 123 c-10 179 -15 207 -36 207 -10 0 -63 -48 -119 -107z"/>
                            <path d="M11035 1801 c-7 -12 -23 -144 -29 -243 -4 -77 -4 -78 19 -78 45 0
                            130 22 193 51 l64 29 -19 23 c-65 82 -198 227 -209 227 -7 0 -15 -4 -19 -9z"/>
                            </g>
                            </svg>
                        </div>
                        <div class="garage_finish">
                            <img src="assets/finish.png">
                        </div>
                    </div>
                </div>
            </div>`;
            i++;
        }
        cars.innerHTML = currentGaragePage;
    })

    // Выбор машины
    .then(() => {
        const select = document.querySelectorAll('.garage_select');

        select.forEach((elem) => {
            elem.addEventListener('click', () => {
                update.disabled = false;
                updateText.disabled = false;
                updateColor.disabled = false;

                sendRequest('GET', urlGarage, null , elem.id)
                .then(data => {
                    updateText.value = data.name;
                    updateColor.value = data.color;

                    carID = elem.id;
                })
                .catch(err => {
                console.log(err)
                alert('Машина не найдена')
                })
            })
        })
    })

    // Удаление машины
    .then(() => {
        const remove = document.querySelectorAll('.garage_remove');
        let garageCar = document.querySelectorAll('.garage_car');
        start = document.querySelectorAll('.garage_start');
        stop = document.querySelectorAll('.garage_stop');
        garageModels = document.querySelectorAll('.garage_model');
        garageRoad = document.querySelector('.garage_road');
        carsName = document.querySelectorAll('.garage_car-name');

        arrID = []; 
        for(let elem of stop) {
            arrID.push(elem.id)
        };

        remove.forEach((elem) => {
            elem.addEventListener('click', () => {
                update.disabled = true;
                updateText.disabled = true;
                updateColor.disabled = true;


                sendRequest('DELETE', urlGarage, null , elem.id)
                .then(() => {
                    arrID = [];
                    for(let elem of stop) {
                        arrID.push(elem.id)
                    };
                    garageCar[arrID.indexOf(elem.id)].remove();
                    garageCar = document.querySelectorAll('.garage_car');
                    stop = document.querySelectorAll('.garage_stop');
                    start = document.querySelectorAll('.garage_start');
                    garageModels = document.querySelectorAll('.garage_model');
                    garageRoad = document.querySelector('.garage_road');
                    carsName = document.querySelectorAll('.garage_car-name');

                    arrID.splice(arrID.indexOf(elem.id), 1)
                })
                .then(() => {
                    sendRequest('DELETE', urlWinners, null , elem.id)
                      .catch(err => {
                        throw err
                      })
                })
                .catch(err => {
                  console.log(err)
                })
            })
        })
    })
    //  Старт
    .then(() => {
        start.forEach((elem) => {
            elem.addEventListener('click', () => {
                reset.disabled = false;
                elem.disabled = true;
                stop[arrID.indexOf(elem.id)].disabled = false;

                sendRequest('PATCH', urlEngine, null, elem.id, 'started')
                .then((data) => {
                    let roadDistance = garageRoad.offsetWidth - 205;
                    let time = data.distance * 1.3 / data.velocity;
                    let fps = roadDistance / (time / 20);
                    let currentDistance = 0;

                    driveObj[elem.id] = setInterval(driveFunc, 20);

                    function driveFunc() {
                        if(currentDistance >= roadDistance) {
                            clearInterval(driveObj[elem.id]);
                        } else {
                            currentDistance += fps;
                            garageModels[arrID.indexOf(elem.id)].style.marginLeft = currentDistance + fps + 'px';
                        }
                    }

                    // Стоп
                    stop.forEach((elem) => {
                        elem.addEventListener('click', () => {
                            clearInterval(driveObj[elem.id]);

                            elem.disabled = true;
                            start[arrID.indexOf(elem.id)].disabled = false;
                            garageModels[arrID.indexOf(elem.id)].style.marginLeft = 0;
                            
                            sendRequest('PATCH', urlEngine, null, elem.id, 'stopped')
                        })
                    })
                })
                .catch(err => {
                  console.log(err)
                })

                setTimeout(() => {
                    sendRequest('PATCH', urlEngine, null, elem.id, 'drive')
                    .catch(() => {
                        console.log(elem.id)
                        clearInterval(driveObj[elem.id]);
                    })
                }, 800)
            })
        })
        
    })
    .then(() => {
        // Состояние страницы (гараж или список победителей)
        if(localStorage.getItem('status-format') === 'true') {    // гараж
            toGarage.disabled = true;
            toWinners.disabled = false;
        
            createMenu.classList.remove('inactive');
            updateMenu.classList.remove('inactive');
            raceMenu.classList.remove('inactive');
            garage.classList.remove('inactive');
            winners.classList.add('inactive');
        
            options.style.height = 150 + 'px';
        }
        else if(localStorage.getItem('status-format') === 'false') {
            for(let interval in driveObj) {
                clearInterval(driveObj[interval]);
            };
            
            toGarage.disabled = false;
            toWinners.disabled = true;
        
            alertWinner.classList.add('inactive');
            createMenu.classList.add('inactive');
            updateMenu.classList.add('inactive');
            raceMenu.classList.add('inactive');
            garage.classList.add('inactive');
            winners.classList.remove('inactive');
        
            options.style.height = 30 + 'px';

            fillWinners();
        }
    })
    // Звук и анимация кнопок
    .then(() => {
        const buttons = document.getElementsByTagName('button');

        Array.from(buttons).forEach((butt) => {
            butt.addEventListener('mousedown', () => {
                let audio = new Audio();             
                audio.src = 'assets/press-butt.mp3';
                audio.autoplay = true; 

                butt.classList.toggle('key-animation');
            });

            document.addEventListener('mouseup', () => {
                butt.classList.remove('key-animation');
            });
        })
    })
    .catch(err => {
      console.log(err)
    });
};

// Следующая страница
next.addEventListener('click', () => {
    for(let interval in driveObj) {
        clearInterval(driveObj[interval]);
    };

    race.disabled = false;
    reset.disabled = true;

    alertWinner.classList.add('inactive');

    localStorage.setItem('page-saved', ++page);
    if(page > Math.ceil(maxPage)) localStorage.setItem('page-saved', --page);

    fillGarage();
   
})

// Предыдущая страница
prev.addEventListener('click', () => {
    for(let interval in driveObj) {
        clearInterval(driveObj[interval]);
    };

    race.disabled = false;
    reset.disabled = true;

    alertWinner.classList.add('inactive');

    localStorage.setItem('page-saved', --page);
    if(page < 1) localStorage.setItem('page-saved', ++page);

    fillGarage();
    
})

// Добавление машины
create.addEventListener('click', () => {
    const car = {
      name: `${createText.value}`,
      color: `${createColor.value}`
    };

    if(car.name != '' && car.color != '#000000') {
        sendRequest('POST', urlGarage, car)    
        .catch(err => console.log(err))

        fillGarage()
    }
})

// Изменение машины
update.addEventListener('click', () => {
    let car = {
        name: updateText.value,
        color: updateColor.value
    };

    sendRequest('PUT', urlGarage, car, carID)
    .then(() => {
        fillGarage();
        
        update.disabled = true;
        updateText.disabled = true;
        updateColor.disabled = true;
    })
    .catch(err => console.log(err))
})



// Генерация 100 машин
let marksCar = ['Ford', 'Toyota', 'Honda', 'Tesla', 'Nissan', 'Volkswagen', 'Renault', 'Hyundai', 'Chevrolet', 'Audi'];
let modelsCar = [' Sedan', ' Hatchback', ' Pickup', ' Minivan', ' Roadster', ' Landau', ' Crossover', ' Phaeron', ' Liftback', ' SUV'];

generate.addEventListener('click', () => {
    for(let i = 1; i <= 100; i++) {
        let randomName = marksCar[Math.floor(Math.random() * marksCar.length)] + modelsCar[Math.floor(Math.random() * modelsCar.length)];
        let randomColor = '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();

        const car = {
            name: randomName,
            color: randomColor
        };
        
        if(car.color == '#000000') {
            i--;
            continue
        } else
        sendRequest('POST', urlGarage, car)    
        .catch(err => console.log(err))
    }
    fillGarage()
})

// Удаление всех машин
removeAll.addEventListener('click', () => {
    race.disabled = false;
    reset.disabled = true;
    alertWinner.classList.add('inactive');
    sendRequest('GET', urlGarage)
    .then(data => {
        for(let car of data) {
            sendRequest('DELETE', urlGarage, null , car.id)
                .catch(err => {
                    console.log(err)
                })
        }
        localStorage.setItem('page-saved', page = 1);
        fillGarage();

    //  Удаление всех победителей
        for(let car of data) {
            sendRequest('DELETE', urlWinners, null , car.id)
                .catch(err => {
                    throw err
                })
        }
        localStorage.setItem('pageWinners-saved', pageWinners = 1);
    })
    .catch(err => {
    console.log(err)
    })
})


// Гонка 
let audioRace = new Audio();             

race.addEventListener('click', () => {
    race.disabled = true;
    reset.disabled = false;

    let raceCounter = 0;

    audioRace.src = 'assets/race-phonk.mp3';
    audioRace.autoplay = true; 

    garageModels.forEach((elem) => {
        let statusWinner;

        start.forEach((elemStart) => {
            elemStart.disabled = true;
            
            stop[arrID.indexOf(elemStart.id)].disabled = false;
        });
        sendRequest('PATCH', urlEngine, null, elem.id, 'started')
        .then((data) => {
            let roadDistance = garageRoad.offsetWidth - 205;
            let time = data.distance * 1.3 / data.velocity;
            let fps = roadDistance / (time / 20);
            let currentDistance = 0;

            setTimeout(() => {
                driveObj[elem.id] = setInterval(driveFunc, 20);
            }, 1200);
            
            function driveFunc() {
                if(currentDistance >= roadDistance) {
                    if(raceCounter == 0 && statusWinner == true) {
                        alertWinner.textContent = `${carsName[arrID.indexOf(elem.id)].textContent} is race winner (${(time / 1000).toFixed(2)}s)`;
                        alertWinner.classList.remove('inactive');

                        audioRace.currentTime = 0;
                        audioRace.pause();

                        let audioWin = new Audio();             
                        audioWin.src = 'assets/win.mp3';
                        audioWin.autoplay = true; 

                        // Добавление или обновление победителя
                        sendRequest('GET', urlWinners, null , elem.id)   // запрашиваем виннера
                          .then((winnerResp) => {
                            
                            let winner = {                           
                                wins: ++winnerResp.wins,
                                time: winnerResp.time
                            };

                            if(winnerResp.time > (time / 1000).toFixed(2)) winner.time = +((time / 1000).toFixed(2));

                            sendRequest('PUT', urlWinners, winner, elem.id)        // если существует то обновляем его
                              .catch(err => console.log(err))
                            })
                          .catch(err => {
                            let newWinner = {                           
                                id: +elem.id,                                 
                                wins: 1,
                                time: +(time / 1000).toFixed(2)
                            };

                            sendRequest('POST', urlWinners, newWinner)       // если нету - то создаем
                              .catch(err => console.log(err))
                          })
                    }
                    ++raceCounter;

                    clearInterval(driveObj[elem.id]);
                } else {
                    currentDistance += fps;
                    garageModels[arrID.indexOf(elem.id)].style.marginLeft = currentDistance + fps + 'px';
                }
            }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
            setTimeout(() => {
                sendRequest('PATCH', urlEngine, null, elem.id, 'drive')
                .then((status) => {
                    statusWinner = status.success;
                })
                .catch(() => {
                    clearInterval(driveObj[elem.id]);
                })
            }, 1200)
        })
    })
})

// Вернуть все машины на исходные позиции
reset.addEventListener('click', () => {
    race.disabled = false;
    reset.disabled = true;

    audioRace.currentTime = 0;
    audioRace.pause();

    alertWinner.classList.add('inactive');

    start.forEach((elemStart) => {
        elemStart.disabled = false;
    });
    stop.forEach((elemStart) => {
        elemStart.disabled = true;
    });
    garageModels.forEach((elem) => {
        clearInterval(driveObj[elem.id]);
        garageModels[arrID.indexOf(elem.id)].style.marginLeft = 0;
        
        sendRequest('PATCH', urlEngine, null, elem.id, 'stopped')
    })
})



