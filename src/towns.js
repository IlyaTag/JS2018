/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.
 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 Разметку смотрите в файле towns-content.hbs
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns(url) {
    function sortCity(cityA, cityB) {
        if (cityA.name > cityB.name) {
            return 1;
        }
        if (cityA.name < cityB.name) {
            return -1;
        }
    }

    const arrCity = [];

    return new Promise((roselve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject();
            } else {
                errorDiv.style.display = 'none';
                buttonRepeat.style.display = 'none';
                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';
                for (const city of xhr.response) {
                    arrCity.push(city);
                }
                arrCity.sort(sortCity);
                roselve(arrCity);
            }
        });
        xhr.addEventListener('error', reject);
        xhr.addEventListener('abourt', reject);
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов
 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.toUpperCase().indexOf(chunk.toUpperCase()) === -1 || chunk === '') {
        return false;
    }

    return true;
}

function xhrError(url) {
    filterBlock.style.display = 'none';
    filterInput.value = '';
    filterResult.innerHTML = '';
    loadingBlock.style.display = 'none';
    buttonRepeat.style.display = 'block';
    errorDiv.style.display = 'block';
    buttonRepeat.addEventListener('click', () => {
        loadTowns(url);
    });
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
const errorDiv = document.createElement('div'),
    buttonRepeat = document.createElement('button'),
    url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

buttonRepeat.textContent = 'Повторить';
errorDiv.textContent = 'Не удалось загрузить города';
buttonRepeat.style.display = 'none';
errorDiv.style.display = 'none';

homeworkContainer.appendChild(errorDiv);
homeworkContainer.appendChild(buttonRepeat);

loadTowns(url)
    .then(towns => {
        filterInput.addEventListener('keyup', function() {
            new Promise((resolve, reject) => {
                const xhr2 = new XMLHttpRequest();
                
                xhr2.open('GET', url);
                xhr2.responseType = 'json';
                xhr2.send();
                xhr2.addEventListener('load', () => {
                    if (xhr2.status >= 400) {
                        reject();
                    }
                })
                xhr2.addEventListener('error', reject);
                xhr2.addEventListener('abourt', reject);
            })
                .catch(() => {
                    xhrError(url);
                })
            filterResult.innerHTML = '';
            let valueInp = filterInput.value;
            let fragment = document.createDocumentFragment();

            for (const town of towns) {
                if (isMatching(town.name, valueInp)) {
                    let li = document.createElement('li');

                    li.textContent = town.name;
                    fragment.appendChild(li);
                }
            }
            filterResult.appendChild(fragment);

        })
    })
    .catch(() => {
        xhrError(url);
    });

export {
    loadTowns,
    isMatching
};