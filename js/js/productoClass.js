export class Producto{
    constructor(parametroCodigo, parametroProducto,parametroDescripcion, parametroCantidad, parametroUrl){
        this.codigo = parametroCodigo;
        this.producto = parametroProducto;
        this.descripcion = parametroDescripcion;
        this.cantidad = parametroCantidad;
        this.url = parametroUrl;
    }
    
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
        
          set modificarCodigo(){
                return this.codigo
              }
              set modificarProducto(){
                return this.producto
              }
              set modificarDescripcion(){
                 return this.descripcion
              }
              set modificarCantidad(){
                return this.cantidad
              }
              set modificarUrl(){
                return this.url
              }

        
}

