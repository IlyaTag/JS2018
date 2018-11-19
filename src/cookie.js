/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function loadCookietolistTable() {
    let listcookie = document.cookie.split('; ');
    let fragment = document.createDocumentFragment();
    const valueInput = filterNameInput.value;

    for (const x of listcookie) {
        let [xName, xValue] = x.split('=');

        try {
            if (arguments !== undefined) {
                if (!isMatching(xName, xValue, valueInput)) {
                    throw new Error();
                }
            }
            const tr = document.createElement('tr'),
                td = document.createElement('td'),
                td2 = document.createElement('td'),
                td3 = document.createElement('td'),
                btnDelete = document.createElement('button');

            btnDelete.textContent = 'Удалить';
            td.textContent = xName;
            td2.textContent = xValue;
            td3.appendChild(btnDelete);
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            fragment.appendChild(tr);
            btnDelete.addEventListener('click', () => {
                listTable.removeChild(tr);
                document.cookie = `${xName}=${xValue}; expires=` + new Date(0);
            })
        // eslint-disable-next-line no-empty
        } catch (e) {}
    }
    listTable.appendChild(fragment);
}

function isMatching(name, value, input) {
    if (name.indexOf(input) !== -1 || value.indexOf(input) !== -1) {
        return true;
    }

    return false;
}

filterNameInput.addEventListener('keyup', function(e) {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    listTable.innerHTML = '';
    loadCookietolistTable(e);
});

addButton.addEventListener('click', (e) => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    listTable.innerHTML = '';
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    
    if (filterNameInput.value === '') {
        loadCookietolistTable();
    } else {
        loadCookietolistTable(e);
    }
});
