const increment = $('#increment');
const decrement = $('#decrement');
let numberPizza = $('#americanagrande');
let numberPizza2 = $('#pepperonigrande');
let totalFinal = 0;
localStorage.setItem('totalFinal', totalFinal);
let showTotal = $('#total');

$.getJSON('https://my-json-server.typicode.com/carlacentenor/webview/db', function(data) {
   let pizzaBig = data.products.pizzas.grandes;
  
   pizzaBig.forEach(element => {
      let template = ` <div class="row">
      <div class="col-8">${element.nombre}</div>
      <div class="col-4 row">
        <div class="col-4">
          <button id=${element.id} data-precio=${element.precio}>+</button>
        </div>
        <div class="col-4" id=${element.nombre}>0</div>
        <div class="col-4">
          <button id=${element.id2} data-precio=${element.precio}>-</button>
        </div>
      </div>
    </div>`
   });
 });



$(document).on('click', '#increment', function () {
  let totalPedido =localStorage.getItem('totalFinal');
  let number = numberPizza.text();
  number = parseInt(number) + 1;
  numberPizza.text(number); // mostrando valores 
  let precio = $(this).data('precio');
  let final =parseFloat(precio) + parseFloat(totalPedido);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'))
});

$(document).on('click', '#decrement', function () {
  let totalPedido =localStorage.getItem('totalFinal');
  let number = numberPizza.text();
  number = parseInt(number) - 1;
  numberPizza.text(number); // mostrando valores 
  let precio = $(this).data('precio');
  let final = parseFloat(totalPedido)-parseFloat(precio);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'))
});

$(document).on('click', '#increment1', function () {
  let totalPedido =localStorage.getItem('totalFinal');
  let number = numberPizza2.text();
  number = parseInt(number) + 1;
  numberPizza2.text(number); // mostrando valores 
  let precio = $(this).data('precio');
  let final =parseFloat(precio) + parseFloat(totalPedido);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'))
});

$(document).on('click', '#decrement2', function () {
  let totalPedido =localStorage.getItem('totalFinal');
  let number = numberPizza2.text();
  number = parseInt(number) - 1;
  numberPizza2.text(number); // mostrando valores 
  let precio = $(this).data('precio');
  let final = parseFloat(totalPedido)-parseFloat(precio);
  localStorage.setItem('totalFinal', final.toFixed(1));
  showTotal.text(localStorage.getItem('totalFinal'))
});


