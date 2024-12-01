// Создайте переменные name, age и isStudent. Присвойте им значения:
// name — ваше имя (строка).
// age — ваш возраст (число).
// isStudent — true, если вы студент, и false в противном случае.
// Выведите их значения в консоль с помощью console.log в формате:
// "Привет, меня зовут [name], мне [age] лет. Студент: [isStudent]."

let name = "Дима";
let age = 21;
let isStudent = true;

console.log(`Привет, меня зовут ${name}, мне ${age} лет. Студент: ${isStudent}`);


// Создайте две переменные a и b с числами, выполните с ними арифметические операции (+, -, *, /) и выведите результаты в консоль.
console.log("Next task: matematic operations");

let a = 2, b = 8;
console.log("Сумма ", a+b);
console.log("Разница ", a-b);
console.log("Произведение ", a*b);
console.log("Деление ", a/b);


//Создайте массив из 5 чисел. Выведите в консоль первый, последний и длину массива.
console.log("Next task: date about array");

let array1 = [
    3, 10, 11, 25, "end",
];

console.log(`Первый элемент ${array1[0]}, последний элемент ${array1[4]}, длина массива ${array1.length}`);


//Добавьте элемент в конец массива, удалите первый элемент, затем выведите изменённый массив.
console.log("Next task: operations with array")

array1.push(568, "інколи");
console.log("added 2 variable", array1);
//i will try add element by using .splice
array1.splice(2, 0, "added after 10");
console.log("added string after variable 10", array1);

array1.splice(0, 3);//deleted 3 variables from the first element
console.log("updated array", array1)


// Переберите массив циклом for и выведите каждый элемент.
console.log("Next task: loop for");

for (let counter = 0; counter < array1.length; counter++){
    console.log(array1[counter]);
};

//i will try use foreach
console.log("method foreach")

array1.forEach((element)=>console.log(element));


console.log("Next task: date about array");
