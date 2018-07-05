let totalFinal = 0;

localStorage.setItem('totalFinal', totalFinal);

//  DOM
let showTotal = $('#total');
const containerBig = $('.container-bigpizza');
const containerFamily = $('.container-bigfamily');
const containerAdicion = $('.container-adicional');
const containerBebidas = $('.container-bebidas');
// botons add Pizzas big/family
const btnBigPizza = $('#btn-big-pizza');
const btnFamilyPizza = $('#btn-family-pizza');
const bigPizzaSection = $('.big-pizza-section');
const familyPizzaSection = $('.family-pizza-section');
// Container Principañ
const containerPrincipal = $('.containerPrincipal');
// btn back 
const back = $('.back');

//btn confirm pizzas
const confirmBig = $('.confirm-big-js');
const confirmFamily = $('.confirm-family-js');

// array Pedido
let arrayBigPizza = [];
let arrayFamilyPizza = [];
//hidden section big  /family
bigPizzaSection.hide();
familyPizzaSection.hide();
// renderizando información en la web
$.getJSON('https://my-json-server.typicode.com/carlacentenor/webview/db', function (data) {
  let pizzaBig = data.products.pizzas.grandes;
  let pizzaFamily = data.products.pizzas.familiares;
  let adicionales = data.products.adicionales;
  let drinks = data.products.bebidas;
  pizzaBig.forEach(element => {
    templateProducts(element, containerBig);
  });
  pizzaFamily.forEach(element => {
    templateProducts(element, containerFamily);
  });
  adicionales.forEach(element => {
    templateProducts(element, containerAdicion);
  });
  drinks.forEach(element => {
    templateProducts(element, containerBebidas);
  });

});

//Eventos + / -
$(document).on('click', '.increment', function () {
  let price = $(this).data('precio');
  let namePizza = $(this).data('name');
  let idNumber = $(this).context.parentElement.nextElementSibling.id;
  incrementTotal(price, idNumber, namePizza);
})

$(document).on('click', '.decrement', function () {
  let price = $(this).data('precio');
  let namePizza = $(this).data('name');
  let idNumber = $(this).context.parentElement.previousElementSibling.id;
  decrementTotal(price, idNumber,namePizza);
})

//Eventos de Big Pizza and Family Pizza
btnBigPizza.on('click', function () {
  containerPrincipal.hide();
  bigPizzaSection.show();

})

btnFamilyPizza.on('click', function () {
  containerPrincipal.hide();
  familyPizzaSection.show();
})

back.on('click', function () {
  bigPizzaSection.hide();
  familyPizzaSection.hide();
  containerPrincipal.show();
});


// Eventos confirm Pizzas
confirmBig.on('click', function () {
  let countPizzaBig = JSON.parse(localStorage.arrayBigPizza);
  $('#total-count-big').text(countPizzaBig.length);
  bigPizzaSection.hide();
  containerPrincipal.show();
});

confirmFamily.on('click', function () {
  let countPizzaFamily = JSON.parse(localStorage.arrayFamilyPizza);
  $('#total-count-family').text(countPizzaFamily.length);
  bigPizzaSection.hide();
  containerPrincipal.show();
});



// Funciones de Incrementar/Decrementar Precio
let incrementTotal = (price, idNumberBox, name) => {
  let totalPedido = localStorage.getItem('totalFinal');
  let number = $(`#${idNumberBox}`).text();
  number = parseInt(number) + 1;
  $(`#${idNumberBox}`).text(number); // mostrando valores 
  let final = parseFloat(price) + parseFloat(totalPedido);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'));
  
  arrayBigPizza.push(name);
  localStorage.setItem('arrayBigPizza', JSON.stringify(arrayBigPizza));
};

let decrementTotal = (price, idNumberBox,name) => {
  
  let totalPedido = localStorage.getItem('totalFinal');
  let number = $(`#${idNumberBox}`).text();
  number = parseInt(number) - 1;
  $(`#${idNumberBox}`).text(number); // mostrando valores 
  let final = parseFloat(totalPedido) - parseFloat(price);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'));
  // Encontrar el valor y eliminarlo
  let index = arrayBigPizza.indexOf(name);
  arrayBigPizza.splice( index, 1 );
  localStorage.setItem('arrayBigPizza', JSON.stringify(arrayBigPizza));
};

// Función que inserta los valores con el estilo determinado
let templateProducts = (element, container) => {
  let template = ` <div class="row pt-2 ">
  <div class="col-7">
    <p class="mb-0 name-product">${element.nombre} S/ ${element.precio}0 </p>
    <p class="f14">${element.description}</p>
  </div>
  <div class="col-2 text-right">
    <button class="increment btn-subt" data-name=${element.nombre} data-precio=${element.precio}>+</button>
  </div>
  <div class="col-1" id=${element.title} >0</div>
  <div class="col-2"><button class="decrement btn-subt" data-name=${element.nombre} data-precio=${element.precio}>-</button>
  
  </div>  
  <div class="border-bot "></div>
</div>`;
  container.append(template);
}