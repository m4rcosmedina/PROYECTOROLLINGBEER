export function campoRequerido(input){
    // console.log('Desde la funcion campo requerido')
    if(input.value.trim().length > 0){
        // console.log('aqui esta todo bien');
        input.className = 'form-control is-valid';
        return true;
    }else{
        // console.log('aqui muestro un error');
        input.className = 'form-control is-invalid';
        return false;
    }
}


export function validarURL(input){
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if(patron.test(input.value)){
        input.className = 'form-control is-valid';
        return true;
    }else{
        input.className = 'form-control is-invalid';
        return false;
    }
} 

export function validarGeneral(codigoForm, productoForm, descripcionForm, urlFrom){
    let alerta = document.querySelector("#msjAlerta");
    if(campoRequerido(codigoForm) &&
       campoRequerido(productoForm)&&
       campoRequerido(descripcionForm)&&
       validarURL(urlFrom)){
           console.log("los datos estan listos para ser enviados")
           alerta.className = "alert alert-danger my5 d-none";
            return true;}else{
                console.log("los datos estan mal")
                alerta.className = "alert alert-danger my-5"
                return false;
            }

}