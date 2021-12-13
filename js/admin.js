import {
  campoRequerido,
  validarURL,
  validarGeneral
} from "./validaciones.js";
import {
  Producto
} from "./Productoclass.js"

let codigoForm = document.querySelector("#codigo");
let productoForm = document.querySelector("#producto");
let descripcionForm = document.querySelector("#descripcion");
let urlFrom = document.querySelector("#url")
let formularioProducto = document.querySelector("#formProducto")
let listaLocalStorage = JSON.parse(localStorage.getItem("arregloProductosLS")) || [];
let productoExistente = false;
let btnNuevo = document.getElementById('btnNuevo')

let numero

let codigoRandom = () => {
  numero = Math.floor(20 * Math.random()) + 1
  return numero;
}

let checkNumero = () => {
  codigoRandom();
  while (listaLocalStorage.forEach(codigo => {
      if (codigo.codigo == numero) {
        codigoRandom();
      }

    }));
  return numero;
}

productoForm.addEventListener("blur", () => { campoRequerido(productoForm)});
descripcionForm.addEventListener("blur", () => {campoRequerido(descripcionForm)});
urlFrom.addEventListener("blur", () => {validarURL(urlFrom)});
codigoForm.value = checkNumero();
formularioProducto.addEventListener("submit", guardarProducto);

btnNuevo.addEventListener('click', resetearFormulario);


cargaInicial();


function guardarProducto(e) {
  e.preventDefault();
  if (validarGeneral(codigoForm, productoForm, descripcionForm, urlFrom)) {
    if (productoExistente == false) {
      crearProducto();
    } else {
      modificarProducto();
    }
  }
}

function crearProducto() {
  let productoNuevo = new Producto(codigoForm.value, productoForm.value, descripcionForm.value, urlFrom.value);
  listaLocalStorage.push(productoNuevo);
  guardarLocals();
  resetearFormulario();
  crearFila(productoNuevo);
  Swal.fire(
    'Producto cargado con exito',

  );

}

function guardarLocals() {
  localStorage.setItem("arregloProductosLS", JSON.stringify(listaLocalStorage))

}

function resetearFormulario() {
  formularioProducto.reset();
  codigoForm.className = "form-control"
  productoForm.className = "form-control"
  descripcionForm.className = "form-control"
  urlFrom.className = "form-control"
  productoExistente = false;
  codigoForm.value = checkNumero();
}


function crearFila(producto) {
  let tablaProductoss = document.getElementById("tablaProductos");
  tablaProductoss.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  
  <td>
    <button class="btn btn-warning" onclick='edicionProducto("${producto.codigo}")'>Editar</button>
    <button class="btn btn-danger" onclick='borrarProducto("${producto.codigo}")'>Borrar</button>
    </td>
</tr>`;
}

function cargaInicial() {
  if (listaLocalStorage.length > 0) {
    listaLocalStorage.forEach((storageProductos) => {
      crearFila(storageProductos)
    });
  }
}

window.edicionProducto = function (codigo) {
  let codigoBuscado = listaLocalStorage.find((itemslocalstorage) => {
    return itemslocalstorage.codigo == codigo
  })
  codigoForm.value = codigoBuscado.codigo;
  productoForm.value = codigoBuscado.producto;
  descripcionForm.value = codigoBuscado.descripcion;
  urlFrom.value = codigoBuscado.url;
  productoExistente = true;
}

function modificarProducto() {
  console.log("desea modificar producto");
  let posicionObjeto = listaLocalStorage.findIndex((itemproducto) => {
    return itemproducto.codigo === codigoForm.value
  });

  listaLocalStorage[posicionObjeto].producto = productoForm.value;
  listaLocalStorage[posicionObjeto].descripcion = descripcionForm.value;
  listaLocalStorage[posicionObjeto].url = urlFrom.value;

  guardarLocals();
  borrarTabla();
  cargaInicial();
  Swal.fire(
    'Producto modificado con exito',
  );
  resetearFormulario();
}

function borrarTabla() {
  let tbodyProductos = document.getElementById("tablaProductos");
  tbodyProductos.innerHTML = '';
}

window.borrarProducto = function (codigo) {
  console.log(codigo);
  let arregloNuevo = listaLocalStorage.filter((item) => {
    return item.codigo != codigo
  });
  listaLocalStorage = arregloNuevo;
  guardarLocals();
  borrarTabla();
  cargaInicial();
  Swal.fire(
    'Producto eliminado',
  )
}