let listaLocalStorage = JSON.parse(localStorage.getItem("arregloProductosLS")) || [];
console.log(listaLocalStorage)

listaLocalStorage.forEach((item) => {crearColumnas(item)});

function crearColumnas(producto){
    let grilla = document.querySelector('#grilla');
    grilla.innerHTML += `<div class="col-sm-3" >
    <div class="card">
        <div class="card-body">
            <h5 class="card-title text-center">${producto.producto}</h5>
            <img src="${producto.url}"
                class="card-img-top w-200" alt="Imagen aun no disp.">
            <p class="card-text text-light text-center">${producto.descripcion}</p>
        </div>
    </div>
</div>`
}
