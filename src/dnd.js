/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно
 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let newDiv = document.createElement('div');

    let rgb1 = () => Math.round(Math.random() * 255),
        rgb2 = () => Math.round(Math.random() * 255),
        rgb3 = () => Math.round(Math.random() * 255);

    newDiv.style.backgroundColor = `RGB( ${rgb1()}, ${rgb2()}, ${rgb3()} )`;
    newDiv.style.top = Math.round(Math.random() * 1000) + 'px';
    newDiv.style.left = Math.round(Math.random() * 1000) + 'px';
    newDiv.style.width = Math.round(Math.random() * (100 - 50) + 50) + 'px';
    newDiv.style.height = Math.round(Math.random() * (100 - 50) + 50) + 'px';
    newDiv.draggable = 'true';
    newDiv.style.position = 'absolute';

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

function addListeners(target) {

    let funcAdd = function() {

        function pageOffset() {
            return {
                x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            };
        }

        var dX,
            dY;

        target.addEventListener('dragstart', function(e) {
            if (e.which == 1) {
                target.className = 'draggable-div';
                e.dataTransfer.setData('text', e.target.className);
                dX = e.clientX + pageOffset().x - target.offsetLeft;
                dY = e.clientY + pageOffset().y - target.offsetTop;
            }
        })

        document.addEventListener('dragover', function(e) {
            e.preventDefault();
        })

        document.addEventListener('drop', function(e) {
            e.preventDefault();
            // eslint-disable-next-line no-empty
            if (target.className === 'draggable-div') {
                target.style.left = e.clientX + pageOffset().x - dX + 'px';
                target.style.top = e.clientY + pageOffset().y - dY + 'px';
                target.classList.toggle('draggable-div');

            }
        })
    };

    return funcAdd();
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};