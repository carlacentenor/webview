const increment = $('.increment');
const decrement = $('.decrement');
let numberPizza = $('#americanagrande');

$(document).on('click', '.increment', function() {
let number =numberPizza.text();
number = parseInt(number)+1;
numberPizza.text(number);
let precio = $(this).data('precio');
let total = parseInt(number)*precio;
console.log(total);
})