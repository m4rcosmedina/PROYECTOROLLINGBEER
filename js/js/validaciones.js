export function campoRequerido(input){
    
    if(input.value.trim().length > 0){
        input.className = "is-valid form-control";
        return true;
    }else{
        
        input.className = "is-invalid form-control";
        return false;
    }
}
export function validarNumeros(input){
        let patron = /^[0-9]{1,3}$/
        if(patron.test(input.value)){
            input.className = "form-control is-valid";
            return true;
        } else {
            input.className = "form-control is-invalid";
            return false;
        }
    }
    export function validarUrl(input){    
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ ;
    if(patron.test(input.value)){
        input.className = "form-control is-valid ";
        return true;
        
    } else {        
        input.className = " form-control is-invalid";
        return false;
    }
    }
    export function validarGeneral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoUrl){
        let alerta = document.querySelector("#mensajeAlerta");       
        if(campoRequerido(campoCodigo) && campoRequerido(campoProducto) && 
           campoRequerido(campoDescripcion)&& 
           validarNumeros(campoCantidad) && 
           validarUrl(campoUrl)){
            alerta.className = "alert alert-danger my-2 d-none"
            return true;
        }else {
            
            alerta.className = "alert alert-danger my-2"
            return false;   

        }
    }
    let codigos = [];
     export function generarCodigo(){
        let codAleatorio=document.querySelector("#codigo");
        codAleatorio=Math.floor(Math.random()* 999 + 1);
        console.log(codAleatorio); 
        console.log (codigos);

        if(codigos.includes(codAleatorio)){
            console.log("repetido")
        } else {
            codigos.push(codAleatorio);
            codigos.sort();
        }
 
     }