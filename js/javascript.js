var mostrarForm;
//GET
//https://weapp-210130211157.azurewebsites.net/webresources/mitienda/
//https://weapp-210130211157.azurewebsites.net/webresources/mitienda/id
//POST
//https://weapp-210130211157.azurewebsites.net/webresources/mitienda/

//Funcion asincrona

$("#spinnerContainer").hide();
$("#lista").click(function (event) {
    event.preventDefault();
    $("#spinnerContainer").show();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/EmprInfRs_AlvaradoCristo/webresources/tienda",

        success: function (data) {
            $("#spinnerContainer").hide();
            $("#data").empty();
            console.log("response:" + JSON.stringify(data));
            $.each(data, function (j, pdata) {
                $("#data").append("<li>" + pdata.NombreTienda + "</li>");

            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(' Error in processing! ' + textStatus);
        }
    });
});
/**
 * Crear el main de la pagina 
 */
function crearMain(){
    var all = document.createElement("div");
    var cabecera = document.createElement("div");
    cabecera.id="cabecera"
    var nuevaTienda = document.createElement("p");
    nuevaTienda.id ="mostrarForm";
    nuevaTienda.textContent="Nueva Tienda";
    var buscador = document.createElement("div");
    var idTienda = document.createElement("input");
    idTienda.placeholder="Id de la Tienda";
    var btnBuscador = document.createElement("button");
    buscador.appendChild(idTienda);
    buscador.appendChild(btnBuscador);
    var iconBuscadorTemp = document.getElementById("buscarIcon");
    
    var iconBuscador = iconBuscadorTemp.content.cloneNode(true);
    console.log(iconBuscador.firstElementChild);
    iconBuscador.firstElementChild.id="buscadorIcono";
    //iconBuscar ocultar cuando se empieze a realizar una petición de carga
    var iconCancelarTemp = document.getElementById("cancelarIcon");
    var iconCancelar = iconCancelarTemp.content.cloneNode(true);
    iconCancelar.firstElementChild.id="cancelarIcono";
    //iconCancelar cambiar cuando se cargue la id tienda y se haya completado la petición
    iconCancelar.firstElementChild.style.display="none";
    var iconLoaderTemp = document.getElementById("loaderIcon");
    var iconLoader = iconLoaderTemp.content.cloneNode(true);
    iconLoader.firstElementChild.id="loaderIcono";
    //iconLoader poner cuando se realize la carga de la busqueda de la tienda por id 
    iconLoader.firstElementChild.style.display="none";
    btnBuscador.appendChild(iconBuscador);
    btnBuscador.appendChild(iconCancelar);
    btnBuscador.appendChild(iconLoader);
    cabecera.appendChild(nuevaTienda);
    cabecera.appendChild(buscador);
    all.appendChild(cabecera);
    var ocultador = document.createElement("div");
    ocultador.id="ocultarForm";
    var formul = document.createElement("div");
    formul.id="formulario";
    var titulo = document.createElement("h2");
    titulo.textContent ="Nueva empresa";
    formul.appendChild(titulo);
    var formulariotag = document.createElement("form");
    var nomdiv = crearInput("Nombre","nombre","Nombre de la empresa");
    var direcciondiv = crearInput("Dirección","direccion","Dirección de la empresa");
    var localidaddiv = crearInput("Localidad","localidad","Localidad de la empresa");
    var telefonodiv = crearInput("Teléfono","telefono","Teléfono de la empresa");
    telefonodiv.firstElementChild.nextElementSibling.pattern ="^[689]\d{8}$";
    var botondiv = document.createElement("div");
    botondiv.id = "boton";
    var boton = document.createElement("button");
    boton.id = "aniadirTienda";
    var cargarForm = document.createElement("div");
    cargarForm.id="cargarPost";
    var cargandoForm = document.createElement("div");
    cargandoForm.id="cargandoPost";
    cargandoForm.textContent="Cargando";
    var baseForm = document.createElement("div");
    baseForm.id="baseForm";
    baseForm.textContent="Añadir tienda";
    var iconLoaderForm = iconLoaderTemp.content.cloneNode(true);
    iconLoaderForm.firstElementChild.id="loaderIcono";
    cargarForm.appendChild(iconLoaderForm);
    cargarForm.appendChild(cargandoForm);
    boton.appendChild(cargarForm);
    //carform boton del formulario para dar feedback mientras se envia la peticion
    cargarForm.style.display="none";
    boton.appendChild(baseForm);
    botondiv.appendChild(boton);
    formulariotag.appendChild(nomdiv);
    formulariotag.appendChild(direcciondiv);
    formulariotag.appendChild(localidaddiv);
    formulariotag.appendChild(telefonodiv);
    formulariotag.appendChild(botondiv);
    formul.appendChild(formulariotag);
    ocultador.appendChild(formul);
    var result = document.createElement("div");
    result.id="resultados";
    all.appendChild(ocultador);
    all.appendChild(result);
    document.getElementsByTagName("main")[0].appendChild(all);

}

function crearInput(contenido , id , placeholder){
    var div = document.createElement("div");
    var error = document.createElement("p");
    error.classList="rojo";
    var labdiv = document.createElement("label");
    labdiv.textContent=contenido;
    labdiv.htmlFor=id;
    var inputdiv = document.createElement("input");
    inputdiv.type="text";
    inputdiv.id=id;
    inputdiv.placeholder=placeholder;
    inputdiv.required = true;
    div.appendChild(labdiv);
    div.appendChild(inputdiv);
    div.appendChild(error);
    return div;
    
}

var template = document.getElementById("templateLista");
var principal = document.getElementsByTagName("main");
document.getElementById("jqueryButton").addEventListener("click", cargarTodojquery);
function loadjquery() {
    
    crearMain();
    mostrarForm = document.getElementById("mostrarForm");
    console.log(mostrarForm);
    var formulario = document.getElementById("ocultarForm");
    var tamanioInicial = formulario.style.maxHeight;
    console.log(tamanioInicial);
    mostrarForm.addEventListener('click', increaseHeight);

    var telefono = document.getElementById("telefono");

    telefono.addEventListener("input", comprobarTelefono);

    var nombre = document.getElementById("nombre");
    var direccion = document.getElementById("direccion");
    var localidad = document.getElementById("localidad");


    nombre.addEventListener("input", comprobar);
    direccion.addEventListener("input", comprobar);
    localidad.addEventListener("input", comprobar);

    document.getElementById("aniadirTienda").addEventListener("click", function (e) {
        e.preventDefault();
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });
        nombre.dispatchEvent(event);
        direccion.dispatchEvent(event);
        localidad.dispatchEvent(event);
        telefono.dispatchEvent(event);
    })

}
function cargarTodojquery(){
    borrarMain();
    $("#spinnerContainerMain").show();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/",

        success: function (data) {
            loadjquery();
            $("#spinnerContainerMain").hide();
            console.log("response:" + JSON.stringify(data));
            $.each(data, function (j, pdata) {
                var empresaTemp = document.getElementById("empresaContainer");
                var empr = empresaTemp.content.cloneNode(true);
                console.log(empr.firstElementChild)
                empr.firstElementChild.firstElementChild.textContent=pdata.nombreTienda;
                empr.firstElementChild.firstElementChild.nextElementSibling.textContent=pdata.direccion+"("+pdata.localidad+")";
                empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent=pdata.telefono;
                console.log(pdata);
                document.getElementById("resultados").appendChild(empr);
            });
            

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(' Error in processing! ' + textStatus);
        }
    });
}
function cargarIdjquery(){
    $("#buscadorIcono").hide();
   // $("#")
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/",

        success: function (data) {
            $("#spinnerContainerMain").hide();
            console.log("response:" + JSON.stringify(data));
            $.each(data, function (j, pdata) {
                console.log(pdata);
            });
            loadjquery();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(' Error in processing! ' + textStatus);
        }
    });
}

function increaseHeight() {
    var formulario = document.getElementById("ocultarForm");
    formulario.style.maxHeight = "0px";
    mostrarForm.removeEventListener('click', increaseHeight);
    mostrarForm.addEventListener('click', reduceHeight);

}
function reduceHeight() {
    var formulario = document.getElementById("ocultarForm");
    formulario.style.maxHeight = "350px";
    mostrarForm.removeEventListener('click', reduceHeight);
    mostrarForm.addEventListener('click', increaseHeight);
}

function borrarMain(){
    while (document.getElementsByTagName("main")[0].firstChild) {
        document.getElementsByTagName("main")[0].firstChild.remove()
    }
}


function comprobarTelefono(e) {
    console.log(e.target);
    if (e.target.validity.valueMissing) {
        campoObligatorio(e.target);
    } else if (e.target.validity.patternMismatch) {
        e.target.nextElementSibling.textContent = "Debe de poner un número que comienze por 6, 8, 9 de nueve cifras";
        error(e.target);
    } else {
        e.target.nextElementSibling.textContent = "";
        correcto(e.target);
    }

}

function campoObligatorio(input) {
    input.nextElementSibling.textContent = "Campo obligatorio";
    error(input);
}

function error(input) {
    input.classList.add("error");
    input.classList.remove("correcto");
    console.log("Aqui se pone la variable global como falsa" + input.value);
    console.log(input);
}
function correcto(input) {
    input.classList.add("correcto");
    input.classList.remove("error");

}



function comprobar(e) {
    if (e.target.validity.valueMissing) {
        campoObligatorio(e.target);
    }
    else {
        e.target.nextElementSibling.textContent = "";
        correcto(e.target);
    }
}
