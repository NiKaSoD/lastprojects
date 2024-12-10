// const numbers = [2, 6, 5, 7, 9, 8, 156];
// function plusTwo(array) {
//     return array.map((element) => element+2);
// }
// console.log(plusTwo(numbers));


// const names = ["alina", "tim", "dima"];

// function upFirstLater(anyNames){
//     return anyNames.map((element)=>element.charAt(0).toUpperCase() + element.slice(1));
// }
// console.log(upFirstLater(names));


// const numbers = [2, 6, 5, 7, 9, 8, 75, 8945, 156, 5643];
// function onlyEvenFilter(array){
//     return array.filter((element) => element % 2 === 0);
// }
// console.log(onlyEvenFilter(numbers));


// const product = [
//     {
//         name: "apple",
//         price: 13,
//     },
//     {
//         name: "rice",
//         price: 123,
//     },
//     {
//         name: "cookies",
//         price: 87,
//     },
//     {
//         name: "vegetables",
//         price: 55,
//     },
//     {
//         name: "tea",
//         price: 135,
//     },
//     {
//         name: "keyboard",
//         price: 999,
//     },
// ];
// function filterByPrice(arr){
//     return arr.filter((element) => element.price > 100);
// }
// console.log(filterByPrice(product));


// const numbers = [1, 1, 1, 1, 1];
// function sum(arr){
//     return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
// }
// console.log(sum(numbers))


// const product = [
//     {
//         name: "apple",
//         price: 13,
//         quantity: 1,
//     },
//     {
//         name: "rice",
//         price: 123,
//         quantity: 19,
//     },
//     {
//         name: "cookies",
//         price: 87,
//         quantity: 23,
//     },
//     {
//         name: "vegetables",
//         price: 55,
//         quantity: 27,
//     },
//     {
//         name: "tea",
//         price: 135,
//         quantity: 12,
//     },
//     {
//         name: "keyboard",
//         price: 999,
//         quantity: 8,
//     },
// ];
// function sumOfQuantity(arr){
    
//     return arr.reduce((accumulator, current) => accumulator + current.quantity, 0);
// }
// console.log(sumOfQuantity(product));


// const stringArray = ["dfsd dsf", "sad das", "qwerg sadf", "lsosd sda"];
// function splitWords(arr){
//     return arr.flatMap((element) => element.split(" "));
// }
// console.log(splitWords(stringArray));


// const people = [
//     {
//         name: "Алина", age: 18,
//     },
//     {
//         name: "Артем", age: 20,
//     },
//     {
//         name: "Дима", age: 21,
//     },
// ]
// function outputForPeople(arr){
//     arr.forEach((element) => console.log(`Имя: ${element.name}, Возраст: ${element.age}`));
// }
// outputForPeople(people);


// const books = [
//     { title: "Реинкарнация безработного", rating: 4.9 },
//     { title: "Ангел кровопролития", rating: 4.1 },
//     { title: "Тетрадь смерти", rating: 4.6 },
//     { title: "Наруто", rating: 4.8 },
// ];
// function sortByTitle(arr){
//     return arr.sort((a, b) => a.title.localeCompare(b.title));
// }
// console.log(sortByTitle(books));


// const city = ["Киев", "Днепр", "Харьков", "Львов"]
// function checkKiev(arr){
//     return arr.includes("Киев");
// }
// console.log(checkKiev(city))


// const numbers = [2, 6, 355, 7, 9, 5, 8, 75, 8945, 156, 5643];
// function divisionFive(arr){
//     return arr.find((element) => element % 5 === 0);
// }
// console.log(divisionFive(numbers));


// const strings = ["short", "a bit longer"];
// function checkLengthOfArray(arr){
//     return arr.some(str => str.length > 10);
// }
// console.log(checkLengthOfArray(strings));


// const array1 = [2, 6, 355, 7, 9, 5, 8, 75, 8945, 156, 5643];
// const array2 = array1.slice(0, 3);
// console.log(array2);


// const products = ["TV: 300", "Fridge: 500", "Laptop: 200", "Teapot: 50"];
// const productObjects = products.map(item => {
//     const [name, price] = item.split(": ");
//     return { name, price: Number(price)};
// });
// const filteredProducts = productObjects.filter(product => product.price > 200);
// console.log(filteredProducts);


