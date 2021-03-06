let totalFinal = 0;
let iceDrink = 'Sin Helar';
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
const commentUser = $('#comment-user');
//btn confirm pizzas
const confirmBig = $('.confirm-big-js');
const confirmFamily = $('.confirm-family-js');
const confirmPrincipal = $('#config');
// array Pedido
let arrayBigPizza = [];
let arrayFamilyPizza = [];
let arrayAdicional = [];
let arrayBebidas = [];
let arrayFinaly = [];
let arraySendInfo = [];
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
    templateBebidas(element, containerBebidas);
  });

});

commentUser.on('input', function () {
  let messageUser = commentUser.val();
  $('#resumen-comment').val(messageUser)
})

// $(document).on('click', '.form-check-input', function () {
//   let tempe = $('#resumen-temperatura');
//   let value = $(this).context.checked;
//   if (value) {
//     iceDrink = 'Helada'
//     $(`.info-temperature`).text('*Bebidas Heladas');
//     tempe.val(`*Bebida ${iceDrink}`);
//   } else {
//     iceDrink = 'Sin Helar';
//     tempe.val("");
//     $(`.info-temperature`).text('*Bebidas Sin Helar')

//   }
// });


//Eventos + / -
$(document).on('click', '.increment', function () {
  let price = $(this).data('precio');
  let namePizza = $(this).data('name');
  let type = $(this).data('type');
  let detail = $(this).data('detail');
  let idNumber = $(this).context.parentElement.previousElementSibling.id;
  incrementTotal(price, idNumber, namePizza, type, detail);
  let number = $(this).context.parentElement.previousElementSibling;
  let btnDecrement = $(this).context.parentElement.previousElementSibling.previousElementSibling.children[0].id;
  if ($(`#${idNumber}`).text() > 0) {
    $(`#${idNumber}`).css('color', '#009774');
    $(`#${btnDecrement}`).addClass('btn-active');
    $(this).addClass('btn-active');
  }
});

$(document).on('click', '.decrement', function () {
  let price = $(this).data('precio');
  let namePizza = $(this).data('name');
  let type = $(this).data('type');
  let detail = $(this).data('detail');
  let idNumber = $(this).context.parentElement.nextElementSibling.id;
  decrementTotal(price, idNumber, namePizza, type, detail);
  let number = $(this).context.parentElement.nextElementSibling;
  let btnDecrement = $(this).context.parentElement.nextElementSibling.nextElementSibling.children[0].id;
  if ($(`#${idNumber}`).text() == 0) {
    $(`#${idNumber}`).css('color', '#009774');
    $(`#${btnDecrement}`).removeClass('btn-active');
    $(this).removeClass('btn-active');
  }
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
  arrayBigPizza = [];
  arrayFamilyPizza = [];
  localStorage.setItem('arrayBigPizza', arrayBigPizza);
  localStorage.setItem('arrayFamilyPizza', arrayFamilyPizza);
  bigPizzaSection.hide();
  familyPizzaSection.hide();
  containerPrincipal.show();
  $('#total-count-big').text(arrayBigPizza.length);
  $('#total-count-family').text(arrayFamilyPizza.length);
  $('.number-span').text(0);

});
// Eventos confirm Pizzas
confirmBig.on('click', function () {
  let countPizzaBig = JSON.parse(localStorage.arrayBigPizza);
  $('#total-count-big').text(countPizzaBig.length);
  bigPizzaSection.hide();
  containerPrincipal.show();
  // $('#resumen-pedido-big-total').val(countPizzaBig.join("\n"))
  const containerDetail = $('.detail-view');
  containerDetail.empty();
  let countFinally = JSON.parse(localStorage.arrayFinaly);
  let pedidoFinal = JSON.parse(localStorage.arrayFinaly);
  $('#resumen-pedido').val(`${pedidoFinal.join("\n")}`);
  countFinally.forEach(element => {
    let templateView = `<div>
    <p class="mb-0">1 ${element} </p>
  </div>`;
    containerDetail.append(templateView);
  });
  if (countPizzaBig.length > 0) {
    $('#total-count-big').css('color', '#009774');
    btnBigPizza.addClass('btn-active');

  } else {
    $('#total-count-big').css('color', '#009774');
    btnBigPizza.removeClass('btn-active');
  }
  let totalSum = (parseFloat(localStorage.getItem('totalFinal')));
  if (countFinally.length > 0) {
    $('#config').removeAttr('disabled');
    $('#config').css('backgroundColor', '#009774');
  }
  if (countFinally.length == 0 || totalSum < 25) {
    $('#config').attr('disabled', true);
    $('#config').css('backgroundColor', '#A39D9B');
  }
});

confirmFamily.on('click', function () {
  let countPizzaFamily = JSON.parse(localStorage.arrayFamilyPizza);
  $('#total-count-family').text(countPizzaFamily.length);
  familyPizzaSection.hide();
  containerPrincipal.show();
  // $('#resumen-pedido-family-total').val(countPizzaFamily.join("\n"));
  const containerDetail = $('.detail-view');
  containerDetail.empty();
  let countFinally = JSON.parse(localStorage.arrayFinaly);
  let pedidoFinal = JSON.parse(localStorage.arrayFinaly);
  $('#resumen-pedido').val(`${pedidoFinal.join("\n")}`);
  countFinally.forEach(element => {
    let templateView = `<div>
    <p class="mb-0">1 ${element} </p>
  </div>`;
    containerDetail.append(templateView);
  });
  if (countPizzaFamily.length > 0) {
    $('#total-count-family').css('color', '#009774');
    btnFamilyPizza.addClass('btn-active');
  } else {
    $('#total-count-family').css('color', '#009774');
    btnFamilyPizza.removeClass('btn-active');
  }
  let totalSum = (parseFloat(localStorage.getItem('totalFinal')));
  if (countFinally.length > 0 || totalSum >= 25) {
    $('#config').removeAttr('disabled');
    $('#config').css('backgroundColor', '#009774');
  }
  if (countFinally.length == 0 || totalSum < 25) {
    $('#config').attr('disabled', true);
    $('#config').css('backgroundColor', '#A39D9B');
  }

});



// Funciones de Incrementar/Decrementar Precio
let incrementTotal = (price, idNumberBox, name, type, detail) => {
  let totalPedido = localStorage.getItem('totalFinal');
  let number = $(`#${idNumberBox}`).text();
  number = parseInt(number) + 1;
  if (number <= 10) {
    $(`#${idNumberBox}`).text(number); // mostrando valores
    let final = parseFloat(price) + parseFloat(totalPedido);
    localStorage.setItem('totalFinal', final.toFixed(1));
    let totalSum = (parseFloat(localStorage.getItem('totalFinal')));
    let delivery = 3.90;
    let sumDelivery = totalSum + delivery;
    showTotal.text(sumDelivery.toFixed(1));
    // almacenando data de costo total
    $('#resumen-money-total').val(sumDelivery.toFixed(1));
    if (type == 'grande') {
      arrayBigPizza.push(detail);
      arrayFinaly.push(detail);
      localStorage.setItem('arrayBigPizza', JSON.stringify(arrayBigPizza));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
    }
    if (type == 'familiar') {
      arrayFamilyPizza.push(detail);
      arrayFinaly.push(detail);
      localStorage.setItem('arrayFamilyPizza', JSON.stringify(arrayFamilyPizza));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
    }
    if (type == 'adicional') {
      arrayAdicional.push(detail);
      arrayFinaly.push(detail);
      localStorage.setItem('arrayAdicional', JSON.stringify(arrayAdicional));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
      let countAdicional = JSON.parse(localStorage.arrayAdicional);
      //  $('#resumen-pedido-adicional-total').val(countAdicional.join("\n"));
      const containerDetail = $('.detail-view');
      containerDetail.empty();
      let countFinally = JSON.parse(localStorage.arrayFinaly);
      let pedidoFinal = JSON.parse(localStorage.arrayFinaly);
      $('#resumen-pedido').val(`${pedidoFinal.join("\n")}`);
      if (countFinally.length > 0) {
        activeButton(confirmPrincipal);
      }
      if (totalSum < 25) {
        desactiveButton(confirmPrincipal);
      } else {
        activeButton(confirmPrincipal);
      }
      countFinally.forEach(element => {
        let templateView = `<div>
      <p class="mb-0">1 ${element} </p>
    </div>`;
        containerDetail.append(templateView);
      });
    }
    if (type == 'bebida') {
      arrayBebidas.push(detail);
      arrayFinaly.push(detail);
      localStorage.setItem('arrayBebidas', JSON.stringify(arrayBebidas));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
      let countBebida = JSON.parse(localStorage.arrayBebidas);
      // $('#resumen-pedido-bebida-total').val(`${countBebida.join("\n")} ${iceDrink}`);
      const containerDetail = $('.detail-view');
      containerDetail.empty();
      let countFinally = JSON.parse(localStorage.arrayFinaly);
      let pedidoFinal = JSON.parse(localStorage.arrayFinaly);
      $('#resumen-pedido').val(`${pedidoFinal.join("\n")}`);
      if (countFinally.length > 0) {
        activeButton(confirmPrincipal);
      }
      if (totalSum < 25) {
        desactiveButton(confirmPrincipal)
      } else {
        activeButton(confirmPrincipal);
      }

      countFinally.forEach((element, index) => {
        let templateView = `<div>
        <p class="mb-0">1 ${element}</p>
    </div>`;
        containerDetail.append(templateView);
      });
    }
  }
};

let decrementTotal = (price, idNumberBox, name, type, detail) => {

  let totalPedido = localStorage.getItem('totalFinal');
  let number = $(`#${idNumberBox}`).text();
  number = parseInt(number) - 1;
  if (number >= 0) {
    $(`#${idNumberBox}`).text(number); // mostrando valores 
    let final = parseFloat(totalPedido) - parseFloat(price);
    localStorage.setItem('totalFinal', final.toFixed(1));
    showTotal.text(localStorage.getItem('totalFinal'));
    let totalSum = (parseFloat(localStorage.getItem('totalFinal')));
    let delivery = 3.90;
    let sumDelivery = totalSum + delivery

    showTotal.text(sumDelivery.toFixed(1));
    // almacenando data de costo total
    $('#resumen-money-total').val(sumDelivery.toFixed(1));


    // Encontrar el valor y eliminarlo
    if (type == 'grande') {
      let index = arrayBigPizza.indexOf(detail);
      let indexDetail = arrayFinaly.indexOf(detail);
      arrayBigPizza.splice(index, 1);
      arrayFinaly.splice(indexDetail, 1);
      localStorage.setItem('arrayBigPizza', JSON.stringify(arrayBigPizza));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
    }
    if (type == 'familiar') {
      let index = arrayFamilyPizza.indexOf(detail);
      let indexDetail = arrayFinaly.indexOf(detail);
      arrayFamilyPizza.splice(index, 1);
      arrayFinaly.splice(indexDetail, 1);
      localStorage.setItem('arrayFamilyPizza', JSON.stringify(arrayFamilyPizza));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));

    }
    if (type == 'adicional') {
      let index = arrayAdicional.indexOf(detail);
      let indexDetail = arrayFinaly.indexOf(detail);
      arrayAdicional.splice(index, 1);
      arrayFinaly.splice(indexDetail, 1);
      localStorage.setItem('arrayAdicional', JSON.stringify(arrayAdicional));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
      let countAdicional = JSON.parse(localStorage.arrayAdicional);
      // $('#resumen-pedido-adicional-total').val(countAdicional.join("\n"));
      const containerDetail = $('.detail-view');
      containerDetail.empty();
      let countFinally = JSON.parse(localStorage.arrayFinaly);
      let pedidoFinal = JSON.parse(localStorage.arrayFinaly);
      $('#resumen-pedido').val(`${pedidoFinal.join("\n")}`);
      if (countFinally.length == 0 || totalSum < 25) {

        desactiveButton(confirmPrincipal);
      }
      countFinally.forEach(element => {
        let templateView = `<div>
      <p class="mb-0">1 ${element} </p>
    </div>`;
        containerDetail.append(templateView);
      });

    }
    if (type == 'bebida') {
      let index = arrayBebidas.indexOf(detail);
      let indexDetail = arrayFinaly.indexOf(detail);
      arrayBebidas.splice(index, 1);
      arrayFinaly.splice(indexDetail, 1);
      localStorage.setItem('arrayBebidas', JSON.stringify(arrayBebidas));
      localStorage.setItem('arrayFinaly', JSON.stringify(arrayFinaly));
      let pedidoFinal = JSON.parse(localStorage.arrayFinaly);
      $('#resumen-pedido').val(`${pedidoFinal.join("\n")}`);
      //  $('#resumen-pedido-bebida-total').val(`${countBebida.join("\n")} ${iceDrink}`);
      const containerDetail = $('.detail-view');
      containerDetail.empty();
      let countFinally = JSON.parse(localStorage.arrayFinaly);
      if (countFinally.length == 0 || totalSum < 25) {
        desactiveButton(confirmPrincipal);

      }
      countFinally.forEach(element => {
        let templateView = `<div>
        <p class="mb-0">1 ${element}  </p>
    </div>`;
        containerDetail.append(templateView);
      });
    }
  }
};

// Función que inserta los valores con el estilo determinado
let templateProducts = (element, container) => {
  let template = ` <div class="col-6 pt-2 mb-3">
  <div class="mb-2">
    <p class="mb-0 name-product text-center">${element.nombre}  </p>
    <div class="mt-2"><img class="img-fluid" src="${element.img}" ></div>
    <p class="text-center mb-0 name-product">S/ ${element.precio}0</p>
    <p class="f14 text-center mb-2">${element.description}</p>
    <div class="row">
    <div class="col-4 offset-1 text-right">
    <button class=" decrement btn-subt" data-detail="${element.detail}"  data-name="${element.nombre}" data-precio=${element.precio} data-type=${element.type} id="${element.title}decrement" ><i class="fas fa-minus"></i></button>
  </div>
  <div class="col-2 text-center number-span" id=${element.title} >0</div>
  <div class="col-4"><button class="increment btn-subt" data-detail="${element.detail}" data-name="${element.nombre}" data-precio=${element.precio} data-type=${element.type} id="${element.title}aument" ><i class="fas fa-plus"></i></button>
    </div>
  </div> 
   
  </div>
</div>`;
  container.append(template);
}

// Template Bebidas
let templateBebidas = (element, container) => {
  let template = ` <div class="col-6 pt-2 ">
  <div class="mb-2">
    <p class=" name-product text-center">${element.nombre} de 1,5L a S/${element.precio}0 </p>
    <div class="row">
    <div class="col-4 offset-1 text-right">
    <button class=" decrement btn-subt" data-detail="${element.detail}"  data-name="${element.nombre}" data-precio=${element.precio} data-type=${element.type} id="${element.title}decrement" ><i class="fas fa-minus"></i></button>
  </div>
  <div class="col-2 text-center number-span" id=${element.title} >0</div>
  <div class="col-4"><button class="increment btn-subt" data-detail="${element.detail}" data-name="${element.nombre}" data-precio=${element.precio} data-type=${element.type} id="${element.title}aument" ><i class="fas fa-plus"></i></button>
  </div>
    </div> 
      <div class="mt-2"><img class="img-fluid" src="${element.img}" ></div>
    </div>
</div>`;
  container.append(template);
}

function desactiveButton(element) {
  element.attr('disabled', true);
  element.css('backgroundColor', '#A39D9B');
}

function activeButton(element) {
  element.removeAttr('disabled');
  element.css('backgroundColor', '#009774');
}