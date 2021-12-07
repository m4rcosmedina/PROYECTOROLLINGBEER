import { campoRequerido, validarURL, validarGeneral } from "./validaciones.js";
import {Producto} from "./Productoclass.js"

let codigoForm = document.querySelector("#codigo");
let productoForm  = document.querySelector("#producto");
let descripcionForm = document.querySelector("#descripcion");
let urlFrom = document.querySelector("#url") 
let formularioProducto = document.querySelector("#formProducto")
let listaLocalStorage = JSON.parse(localStorage.getItem("arregloProductosLS")) || [];




let numero;

  let codigoRandom= () => {
    numero = Math.floor(10*Math.random())+1
    return numero;  
  }

  let checkNumero= () => {
    codigoRandom();
    while(listaLocalStorage.forEach(codigo => {
      if(codigo.codigo == numero){
        console.log("ya esta ete perri");
        codigoRandom();
      }
      
    }));
    return numero;
  }


  
  
  function guardarProducto(e){
    // verificar que todos los datos sean validados
    e.preventDefault();
    if(validarGeneral(codigoForm, productoForm, descripcionForm, urlFrom)){
        //crear un producto
      crearProducto();
     CrearFila();
    }
}

 function  crearProducto(){
   let productoNuevo = new Producto(codigoForm.value, productoForm.value, descripcionForm.value, urlFrom.value);
   listaLocalStorage.push(productoNuevo);
   guardarLocals();
   resetearFormulario();
   
 }

function guardarLocals(){
  localStorage.setItem("arregloProductosLS", JSON.stringify(listaLocalStorage))
  
}

function resetearFormulario(){
  formularioProducto.reset();
  codigoForm.className ="form-control"
  productoForm.className ="form-control"
  descripcionForm.className ="form-control"
  urlFrom.className ="form-control"
  codigoForm.value = checkNumero();
}


function CrearFila(producto){
  let tablaProductos = document.querySelector("#tablaproductos")
  tablaProductos.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning"onclick="prepararEdicionUno(${producto.codigo})">Editar</button>
    <button class="btn btn-danger">Borrar</button>
  </td>
</tr>`
} 

function cargaInicial(){
  if(listaLocalStorage.length > 0){
      //crear filas
      //blucle  forEach()
      listaLocalStorage.forEach((storageproductos) => {CrearFila(storageproductos)});
  }
}

  productoForm.addEventListener("blur", () => campoRequerido(productoForm));
  descripcionForm.addEventListener("blur", () => campoRequerido(descripcionForm));
  urlFrom.addEventListener("blur", () => validarURL(urlFrom));
  codigoForm.value = checkNumero();
  formularioProducto.addEventListener("submit", guardarProducto);
  cargaInicial();