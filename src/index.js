/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn( array[i], i, array ); 
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let arr = [];

    for (var i = 0; i < array.length; i++) {
        arr[i] = fn( array[i], i, array ); 
    }

    return arr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var i = 0, 
        s = initial;

    if ( initial == undefined ) {
        i = 1;
        s = array[0];
    }

    for ( i; i < array.length; i++) {
        s = fn( s, array[i], i, array);
    }

    return s;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let arr = []; 

    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            arr.push(k.toUpperCase());
        }
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    if ( to == 0 || from >= array.length ) {
        return []; 
    }

    from = from || 0;
    if ( from < 0 ) { 
        from = array.length - Math.abs(from) <= 0? 0: array.length - Math.abs(from);
    }

    if ( to == undefined ) {
        to = array.length;
    } else {
        if ( to < 0 ) {
            to = array.length - Math.abs(to) <= 0? 0: array.length - Math.abs(to);
        } else {
            to = to > array.length? array.length: to;
        }
    }
    var arr = [];

    for (var i = from; i < to; i++) {
        arr.push(array[i]);
    }

    return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
