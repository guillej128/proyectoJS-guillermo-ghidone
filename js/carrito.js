//variables Globales
const clickbutton = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody")
let carritoDeCompras = [];

clickbutton.forEach(element => {
  element.addEventListener("click", (agregarAlCarrito))
});
function agregarAlCarrito(e) {

  Toastify({
    text: "Tarjeta agregada al carrito",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to left, b2b2ff, blue)",
      borderRadius: "15px"
    },
    onClick: function(){} 
  }).showToast(); 

  const button = e.target
  const item = button.closest(".card")
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemDescripcion = item.querySelector(".card-text").textContent;
  const itemPrice = item.querySelector(".price").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  //Carrito de compras
  const NuevoItem = {
    titulo: itemTitle,
    descripción: itemDescripcion,
    precio: itemPrice,
    imagen: itemImg,
    cantidad: 1
  }
  agregarItemAlCarrito(NuevoItem)
}
// función para agregar un producto al carrito
function agregarItemAlCarrito(NuevoItem) {
  const InputElemento = tbody.getElementsByClassName('input_elemento')
  for (let i = 0; i < carritoDeCompras.length; i++) {
    if (carritoDeCompras[i].descripción.trim() === NuevoItem.descripción.trim()) {
      carritoDeCompras[i].cantidad++;
      const inputValue = InputElemento[i]
      InputElemento.value++;
      CarritoTotal()
      return null;
    }

  }
  carritoDeCompras.push(NuevoItem)
  actualizarCarrito()
}
//Función para actualizar el carrito
function actualizarCarrito() {
  tbody.innerHTML = ''

  carritoDeCompras.map(item => {
    const tr = document.createElement("tr")
    tr.classList.add("itemCarrito")
    const Content = `
    <th scope="row">1</th>
                    <td class="tabla__productos">
                        <h6 class="title">${item.descripción}</h6>
                    </td>
                    <td class="tabla__precio"><p>${item.precio}</p>
                    </td>
                    <td class="tabla__cantidad">
                        <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                        <button class="delete btn btn-danger">X</button>
                    </td>`
    tr.innerHTML = Content;
    tbody.append(tr)
    tr.querySelector(".delete").addEventListener("click", removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener("change", sumaCantidad)

  })
  CarritoTotal()
}

function CarritoTotal() {
  let Total = 0;
  const itemCarritoTotal = document.querySelector(".itemCarritoTotal")
  carritoDeCompras.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio * item.cantidad
  })
  itemCarritoTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}
//remover items de carrito con boton
function removeItemCarrito(e) {

  Toastify({
    text: "Tarjeta eliminada del carrito",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "right",
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to left, b2b2ff, blue)",
      borderRadius: "15px",
      
    },
    onClick: function(){} 
  }).showToast(); 

  const buttonDelete = e.target
  const tr = buttonDelete.closest(".itemCarrito")
  const descripción = tr.querySelector('.title').textContent;
  for (let i = 0; i < carritoDeCompras.length; i++) {
    if (carritoDeCompras[i].descripción.trim() === descripción.trim()) {
      carritoDeCompras.splice(i, 1)
    }
  }
  tr.remove()
  CarritoTotal()
}

//Actualizar la cantidad de un mismo item con el imput
function sumaCantidad(e) {
  const sumaInput = e.target
  const tr = sumaInput.closest(".itemCarrito")
  const descripción = tr.querySelector('.title').textContent;
  carritoDeCompras.forEach(item => {
    if (item.descripción.trim() === descripción) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  });
}
function addLocalStorage() {
  localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carritoDeCompras'));
  if (storage) {
    carritoDeCompras = storage;
    actualizarCarrito()
  }
}
const pplanes = document.getElementById("pplanes");
const tipodetarjetas = async () => {
  const response = await fetch("./planes.json");
  const planes = await response.json();

  tbodyplanes= ``;
  planes.forEach((planes,index)=>{
    tbodyplanes+= `<tr>
    <td>${planes.categoria}</td>
    <td>${planes.precio}</td>
    <td>${planes.credito}</td>
    <td>${planes.valorencompras}</td>
    </tr>`
  })
  pplanes.innerHTML = tbodyplanes;

}
window.addEventListener("load", function () {
  tipodetarjetas();
})