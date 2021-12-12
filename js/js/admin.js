import {generarCodigo,campoRequerido,validarNumeros,validarUrl,validarGeneral} from "./validaciones.js";
import{Producto} from "./productoClass.js"

let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#IngresoProducto');
let campoDescripcion = document.querySelector('#IngresoDescripcion');
let campoCantidad = document.querySelector('#IngresoCantidad');
let campoUrl = document.querySelector('#url');
let formularioProducto = document.querySelector("#formProducto");
let listaProducto = JSON.parse(localStorage.getItem("arregloProductosKey"))|| []; 
let productoExistente = false; 

campoCodigo.addEventListener('blur', ()=> {generarCodigo(campoCodigo)});
campoProducto.addEventListener('blur', ()=> {campoRequerido(campoProducto)});
campoDescripcion.addEventListener('blur', ()=> {campoRequerido(campoDescripcion)});
campoCantidad.addEventListener('blur', ()=> {validarNumeros(campoCantidad)});
campoUrl.addEventListener('blur', ()=> {validarUrl(campoUrl)});
formularioProducto.addEventListener('submit', guardarProducto);

cargaInicial();

function guardarProducto(e){
    e.preventDefault();
if(validarGeneral(campoProducto,campoDescripcion,campoCantidad,campoUrl)){
    if(productoExistente == false){
      crearProducto();
    } else {

     modificarProducto();
    }
}

}
function crearProducto(){
 console.log("esto si sale");
let codigoUnico = generarCodigo();
let productoNuevo= new Producto (codigoUnico,campoProducto.value,campoDescripcion.value,campoCantidad.value,
    campoUrl.value );
    listaProducto.push(productoNuevo);
    console.log(listaProducto);
    limpiarFormulario();
    guardarLocalStorage();
    campoCodigo.className="form-control";
    campoProducto.className="form-control";
    campoDescripcion.className="form-control";
    campoCantidad.className="form-control";
    campoUrl.className="form-control";
    Swal.fire(
        'Producto creado',
        'Has creado un nuevo producto',
        'success'
      )
      crearFila(productoNuevo);
}

function guardarLocalStorage(){
    localStorage.setItem("arregloProductosKey", JSON.stringify (listaProducto));

}
function limpiarFormulario(){
    formularioProducto.reset();
      campoCodigo.className="form-control";
      campoProducto.className="form-control";
      campoDescripcion.className="form-control";
      campoCantidad.className="form-control";
      campoUrl.className="form-control";
      productoExistente = false;
}

function crearFila(producto){
    let tablaProductos = document.querySelector("#tablaProductos");
    tablaProductos.innerHTML += `<tr>
    <td scope="row">${producto.codigo}</td>
    <td> ${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td><button type="submit" class="btn btn-warning" onclick='prepararEdicionProducto("${producto.codigo}")>Editar</button>
        <button type="submit" class="btn btn-danger"onclick='borrarProducto("${producto.splice}")'>Borrar</button></td>
  </tr>`;
}

function cargaInicial(){
    if(listaProducto.length > 0 ){
        listaProducto.forEach((itemProducto)=>{crearFila(itemProducto)});
    } 
}
window.prepararEdicionProducto= function(codigo){
    console.log("desea editar");
    let productoBuscado = listaProducto.find((itemProducto)=>{return itemProducto.codigo == codigo});
    console.log(productoBuscado);
    
     campoCodigo.value = productoBuscado.codigo;
     campoProducto.value = productoBuscado.producto;
     campoDescripcion.value = productoBuscado.descripcion;
     campoCantidad.value = productoBuscado.campoCantidad;
     campoUrl.value = productoBuscado.url;

     productoExistente = true
}

function modificarProducto(){
    console.log("desea modificar producto");
       let posicionObjetoBuscado = listaProducto.findIndex((itemProducto)=>{return itemProducto.codigo === campoCodigo.value});
       console.log(posicionObjetoBuscado);
       listaProducto[posicionObjetoBuscado].producto = campoProducto.value;
       listaProducto[posicionObjetoBuscado].descripcion = campoDescripcion.value;
       listaProducto[posicionObjetoBuscado].cantidad = campoCantidad.value;
       listaProducto[posicionObjetoBuscado].url = campoUrl.value;
      guardarLocalStorage();
     borrarTabla();
     cargaInicial();

     limpiarFormulario();
    
}

function borrarTabla(){
    let tBodyProductos = document.getElementById('tablaProductos');
    tBodyProductos.innerHTML = '';
}
window.borrarProducto = function(codigo){
    console.log(codigo);
    let arregloNuevo = listaProductos.filter((item)=>{return item.codigo != codigo});
   listaProductos = arregloNuevo;
   guardarLocalStorage();
   borrarTabla();
   cargaInicial();
 

}