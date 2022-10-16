class Menu {
    constructor(id, nombre, precio, img) {
      this.id = id;  
      this.nombre = nombre;
      this.precio = precio;
      this.img = img;
    }
  }
  
  const menu1 = new Menu(1, "Absolut Raspberry", 3200, 'img/bebida01.png')
  const menu2 = new Menu(2, "Absolut Pears", 2850, 'img/bebida02.png')
  const menu3 = new Menu(3, "Absolut Ruby Red", 3000, 'img/bebida03.png')
  const menu4 = new Menu(4, "Absolut Apeach", 2800, 'img/bebida04.png')
  const menu5 = new Menu(5, "Absolut Mango", 3100, 'img/bebida05.png')
  const menu6 = new Menu(6, "Absolut Raspberry 2 unidades", 6000, 'img/bebida06.png')

    const menus = [menu1, menu2,menu3, menu4, menu5, menu6]
  
  const contenedorProductos = document.getElementById('contenedorProductos')
  
  const precioTotal = document.getElementById('precioTotal')
  
  const contenedorCarrito = document.querySelector("#lista-carrito tbody");
  const contadorCarrito = document.getElementById('contCarrito')
  
  let carrito = []
  
  const vaciar = document.getElementById('vaciar')
  
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
      carrito = JSON.parse(localStorage.getItem('carrito'))
      actualizarCarrito()
    }
  })
  
  vaciar.addEventListener('click', () => {
    carrito.length = 0
    const vaciar = document.getElementById('vaciarCarrito')
    actualizarCarrito()
  })
  
  
  menus.forEach(menu => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div class="tarjetas" style="max-width: 350px">
      <img src=${menu.img} alt=${menu.nombre} style="width:100%">
      <h2>${menu.nombre}</h2>
      <p class="precio"><b>$ ${menu.precio} </b></p>
      <p><button class="boton" id="agregar${menu.id}">Agregar al Carrito</button></p>
    </div>
    `
    contenedorProductos.appendChild(div)
  
    const boton = document.getElementById(`agregar${menu.id}`)
  
    boton.addEventListener('click', () => {
          agregarAlCarrito(menu.id)
    })
    
  });
  
  
  const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)
  
    if (existe) {
      const prod = carrito.map (prod => {
        if (prod.id === prodId){
          prod.cantidad++
        }
      })
    }else {
  
      const item = menus.find((prod) =>  prod.id === prodId)
      item.cantidad = 1;
      carrito.push(item)
      console.log(carrito)
  
    }
      actualizarCarrito()
  }
  
  const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
  }
  
  const actualizarCarrito = () => {
    contenedorCarrito.innerHTML ="" 
  
  
    carrito.forEach((prod) => {
      const etiqueta = document.createElement('tr')
      etiqueta.innerHTML +=`
         
        <td class="nombreProducto">${prod.nombre}</td>
        <td>$ ${prod.precio}</td>
        <td><span id="cantidad">${prod.cantidad} un</span></td>
        <td>$ ${prod.precio * prod.cantidad}</td>
        <td><button onclick= "eliminarDelCarrito(${prod.id})" class="boton-eliminar">X</button><td>
     
      `
      contenedorCarrito.appendChild(etiqueta)
  
      localStorage.setItem('carrito', JSON.stringify(carrito))
  
    })
      contadorCarrito.innerText = carrito.length
      precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.precio * prod.cantidad, 0)
    }