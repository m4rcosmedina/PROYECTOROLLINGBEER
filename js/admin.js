import { campoRequerido, validarURL, validarGeneral } from "./validaciones.js";
import {Producto} from "./Productoclass.js"

let codigoForm = document.querySelector("#codigo");
let productoForm  = document.querySelector("#producto");
let descripcionForm = document.querySelector("#descripcion");
let urlFrom = document.querySelector("#url") 
let formularioProducto = document.querySelector("#formProducto")
let listaLocalStorage = JSON.parse(localStorage.getItem("arregloProductosLS")) || [];
let productoExistente = false; //producto para crear,si es TRUE queiro modificar.




let numero;

  let codigoRandom= () => {
    numero = Math.floor(100*Math.random())+1
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
      if(productoExistente == false){
        //crear un producto
      crearProducto();
      }else{
        modificarProducto()
      } 
    }
}

 function  crearProducto(){
   let productoNuevo = new Producto(codigoForm.value, productoForm.value, descripcionForm.value, urlFrom.value);
   listaLocalStorage.push(productoNuevo);
   guardarLocals();
   resetearFormulario();
   CrearFila(productoNuevo);
   
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
  let tablaProductoss = document.querySelector("#tablaproductos")
  tablaProductoss.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning" onclick="edicionProducto(${producto.codigo})">Editar</button>
    <button class="btn btn-danger">Borrar</button>
  </td>
</tr>`
} 

function cargaInicial(){
  if(listaLocalStorage.length > 0){
      //crear filas
      //blucle  forEach()
      listaLocalStorage.forEach((storageproductos)=>{CrearFila(storageproductos)});
  }
}

window.edicionProducto = function (codigo){  
  //esto busca producto en arreglo y muesrta en formulario
  let codigoBuscado = listaLocalStorage.find((itemslocalstorage) =>{return itemslocalstorage.codigo == codigo});
  codigoForm.value = codigoBuscado.codigo ;
  productoForm.value = codigoBuscado.producto;
  descripcionForm.value = codigoBuscado.descripcion ;
  urlFrom.value = codigoBuscado.url ;
  productoExistente=true;
}

function modificarProducto(){
  console.log("desea modificar producto");
  // encontrar la posicion del elemnto que quiero modificar dentro del arreglo de productos
     let posicionObjeto = listaLocalStorage.findIndex((itemproducto)=>{return itemproducto.codigo == codigoForm.value})
    console.log(posicionObjeto)

    listaLocalStorage[posicionObjeto].producto = productoForm.value;
    listaLocalStorage[posicionObjeto].descripcion = descripcionForm.value;
    listaLocalStorage[posicionObjeto].url = urlFrom.value;
    guardarLocals();
    let resetTabla = document.querySelector("#tablaproductos");
    resetTabla.innerHTML="";

      

    
}


   
      




  productoForm.addEventListener("blur", () => campoRequerido(productoForm));
  descripcionForm.addEventListener("blur", () => campoRequerido(descripcionForm));
  urlFrom.addEventListener("blur", () => validarURL(urlFrom));
  codigoForm.value = checkNumero();
  formularioProducto.addEventListener("submit", guardarProducto);
  cargaInicial();