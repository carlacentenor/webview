let arrayBig = JSON.parse(localStorage.arrayBigPizza);
let arrayFamily = JSON.parse(localStorage.arrayFamilyPizza);
let order = arrayBig.concat(arrayFamily);
let money = parseFloat(localStorage.totalFinal);

let finallMoney =$('#finally-total');
order.forEach(element => {
  let templateResumen = `<div>
                          <p>1 pizza ${element.name} ${element.type} a S/ ${element.price} </p>
                        </div>`;
  $('.resumen-pedido').append(templateResumen);
});

finallMoney.text(money)