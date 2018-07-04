let totalFinal = 0;
localStorage.setItem('totalFinal', totalFinal);
let showTotal = $('#total');
const containerBig = $('.container-bigpizza');
const containerFamily = $('.container-bigfamily');
const containerAdicion = $('.container-adicional');
// 
$.getJSON('https://my-json-server.typicode.com/carlacentenor/webview/db', function (data) {
  let pizzaBig = data.products.pizzas.grandes;
  let pizzaFamily = data.products.pizzas.familiares;
  let adicionales = data.products.adicionales;
  pizzaBig.forEach(element => {
    templateProducts(element, containerBig);
  });
  pizzaFamily.forEach(element => {
    templateProducts(element,containerFamily);
  });
  adicionales.forEach(element => {
    templateProducts(element, containerAdicion);
  });

});

//Eventos + / -
$(document).on('click', '.increment', function () {
  let price = $(this).data('precio');
  let idNumber = $(this).context.parentElement.nextElementSibling.id;
  incrementTotal(price, idNumber);
})

$(document).on('click', '.decrement', function () {
  let price = $(this).data('precio');
  let idNumber = $(this).context.parentElement.previousElementSibling.id;

  decrementTotal(price, idNumber);
})


// Funciones de Incrementar/Decrementar Precio
let incrementTotal = (price, idNumberBox) => {
  let totalPedido = localStorage.getItem('totalFinal');
  let number = $(`#${idNumberBox}`).text();
  number = parseInt(number) + 1;
  $(`#${idNumberBox}`).text(number); // mostrando valores 
  let final = parseFloat(price) + parseFloat(totalPedido);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'))
};

let decrementTotal = (price, idNumberBox) => {
  let totalPedido = localStorage.getItem('totalFinal');
  let number = $(`#${idNumberBox}`).text();
  number = parseInt(number) - 1;
  $(`#${idNumberBox}`).text(number); // mostrando valores 
  let final = parseFloat(totalPedido) - parseFloat(price);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'))
};

let templateProducts = (element, container) => {
  let template = ` <div class="row">
  <div class="col-8">${element.nombre}</div>
  <div class="col-4 row">
    <div class="col-4">
      <button class="increment" data-precio=${element.precio}>+</button>
    </div>
    <div class="col-4" id=${element.nombre}>0</div>
    <div class="col-4">
      <button class="decrement" data-precio=${element.precio}>-</button>
    </div>
  </div>
</div>`;
  container.append(template);
}