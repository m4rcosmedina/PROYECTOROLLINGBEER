export class Producto{
    constructor(parametroCodigo, parametroProducto, parametroDescripcion, parametroURL ){
        this.codigo = parametroCodigo;
        this.producto = parametroProducto;
        this.descripcion = parametroDescripcion;
        this.url = parametroURL;
    }

        get mostrarCodigo(){
         return this.codigo
        }
        get mostrarProducto(){
            return this.producto
        }
        get mostrarDescripcion(){
            return this.descripcion
        }
        get mostrarURl(){
            return this.url
        }
}

