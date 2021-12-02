import {generarCodigo,campoRequerido,validarNumeros,validarUrl,validarGeneral} from "./validaciones.js";
import{Producto} from "./productoClass.js"

//traigo el elemento que necesito del html
let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#IngresoProducto');
let campoDescripcion = document.querySelector('#IngresoDescripcion');
let campoCantidad = document.querySelector('#IngresoCantidad');
let campoUrl = document.querySelector('#url');
let formularioProducto = document.querySelector("#formProducto");
// si hay algo en el local storage quiero guardarlo en el arreglo , sino en un arreglo vacio
let listaProducto = JSON.parse(localStorage.getItem ("arregloProductosKey"))|| []; 
let productoExistente = false; // quiere decir que no hay un producto, entonces queremos crear producto nuevo

//asociar un evento a un elemento del html
campoCodigo.addEventListener('blur', ()=> {generarCodigo(campoCodigo)});
campoProducto.addEventListener('blur', ()=> {campoRequerido(campoProducto)});
campoDescripcion.addEventListener('blur', ()=> {campoRequerido(campoDescripcion)});
campoCantidad.addEventListener('blur', ()=> {validarNumeros(campoCantidad)});
campoUrl.addEventListener('blur', ()=> {validarUrl(campoUrl)});
formularioProducto.addEventListener('submit', guardarProducto);

cargaInicial();

function guardarProducto(e){
   // verificar todas las validaciones 
    e.preventDefault();
if(validarGeneral(campoProducto,campoDescripcion,campoCantidad,campoUrl)){
    if(productoExistente == false){
      //crear un producto
      crearProducto();
    } else {

     // modificar producto
     modificarProducto();
    }
}

}
function crearProducto(){
// crear un producto
 console.log("esto si sale");
let codigoUnico = generarCodigo();
let productoNuevo= new Producto (codigoUnico,campoProducto.value,campoDescripcion.value,campoCantidad.value,
    campoUrl.value );
    //guarda el objeto dentro del arreglo Producto 
    listaProducto.push(productoNuevo);
    console.log(listaProducto);
    // quiero limpiar el formulario
    limpiarFormulario();
    // guardar el arreglo de productos dentro del local storage
    guardarLocalStorage();
    // limpiar o resetear  las clases tambien
    campoCodigo.className="form-control";
    campoProducto.className="form-control";
    campoDescripcion.className="form-control";
    campoCantidad.className="form-control";
    campoUrl.className="form-control";
    // mostrar un cartel al usuario
    Swal.fire(
        'Producto creado',
        'Has creado un nuevo producto',
        'success'
      )
      // cargar el producto en la tabla
      crearFila(productoNuevo);
}

function guardarLocalStorage(){
    localStorage.setItem("arregloProductosKey", JSON.stringify (listaProducto));

}
function limpiarFormulario(){
    formularioProducto.reset();
      // limpiar o resetear  las clases tambien
      campoCodigo.className="form-control";
      campoProducto.className="form-control";
      campoDescripcion.className="form-control";
      campoCantidad.className="form-control";
      campoUrl.className="form-control";
}

function crearFila(producto){
    let tablaProductos = document.querySelector("#tablaProductos");
    tablaProductos.innerHTML += `<tr>
    <td scope="row">${producto.codigo}</td>
    <td > ${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td><button type="submit" class="btn btn-warning" onclick="prepararEdicionProducto(${producto.codigo})">Editar</button>
        <button type="submit" class="btn btn-danger">Borrar</button></td>
  </tr>` 
}

function cargaInicial(){
    if(listaProducto.length > 0 ){
        //crear las filas
        listaProducto.forEach((itemProducto)=>{crearFila(itemProducto)});
    } 
}
window.prepararEdicionProducto= function(){
    console.log("desea editar");
    // buscar el producto en el arreglo 
    let productoBuscado = listaProducto.find((itemProducto)=>{return itemProducto.codigo == codigo});
    console.log(productoBuscado);
    
    //una vez q lo encuentre, mostrarlo en el formulario
     campoCodigo.value = productoBuscado.codigo;
     campoProducto.value = productoBuscado.producto;
     campoDescripcion.value = productoBuscado.descripcion;
     campoCantidad.value = productoBuscado.campoCantidad;
     campoUrl.value = productoBuscado.url;

     //cambio mi variable productoExistente
     productoExistente = true;
}

function modificarProducto(){
    console.log("desea modificar producto");
    // encontrar la posicion del elemnto que quiero modificar dentro del arreglo de productos
       let posicionObjetoBuscado = listaProducto.findIndex(()=>{return itemProducto.codigo == campoCodigo.value});
       console.log(posicionObjetoBuscado);
    //modificar los valores dentro del arreglo
       listaProducto[posicionObjetoBuscado].producto = campoProducto.value;
       listaProducto[posicionObjetoBuscado].descripcion = campoDescripcion.value;
       listaProducto[posicionObjetoBuscado].cantidad = campoCantidad.value;
       listaProducto[posicionObjetoBuscado].url = campoUrl.value;
    //actualizar el localstorage
      guardarLocalStorage();
    //actualizar la tabla
     borrarTabla();
     cargaInicial();
    
}

function borrarTabla(){
    let tBodyProductos = document.querySelector("#tablaProductos");
    tBodyProductos.innerHTML = "";
}