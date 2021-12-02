export class Producto{
    constructor(parametroCodigo, parametroProducto,parametroDescripcion, parametroCantidad, parametroUrl){
        this.codigo = parametroCodigo;
        this.producto = parametroProducto;
        this.descripcion = parametroDescripcion;
        this.cantidad = parametroCantidad;
        this.url = parametroUrl;
    }
    //tarea agregar los get y set
    
    get mostrarCodigo() {
            return this.codigo;
          }
          get mostrarProducto() {
            return this.producto;
          }
          get mostrarDescripcion() {
            return this.descripcion;
          }
          get mostrarCantidad() {
            return this.cantidad;
          }
          get mostrarUrl() {
            return this.url;
          }
        
          set modificarCodigo(nuevoCodigo) {
              this.codigo = nuevoCodigo;
          }
          set modificarProducto(nuevoProducto) {
              this.producto = nuevoProducto;
          }
          set modificarDescripcion(nuevaDescripcion) {
              this.descripcion = nuevaDescripcion;
          }
          set modificarCantidad(nuevaCantidad) {
              this.cantidad = nuevaCantidad;
          }
          set modificarUrl(nuevaUrl) {
              this.url = nuevaUrl;
          }

        
}

