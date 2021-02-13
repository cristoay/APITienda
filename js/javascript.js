var mostrarForm;
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

function crearMain(){
    var all = document.createElement("div");
    var cabecera = document.createElement("div");
    var nuevaTienda = document.createElement("p");
    nuevaTienda.id ="mostrarForm";
    nuevaTienda.textContent="Nueva Tienda";
    cabecera.appendChild(nuevaTienda);
    all.appendChild(nuevaTienda);
    var ocultador = document.createElement("div");
    ocultador.id="ocultarForm";
    var formul = document.createElement("div");
    formul.id="formulario";
    var titulo = document.createElement("h2");
    titulo.textContent ="Nueva empresa";
    formul.appendChild(titulo);
    var formulariotag = document.createElement("form");
    // var nom = document.createElement("div");
    // var labnom = document.createElement("label");
    // labnom.textContent="Nombre";
    // labnom.htmlFor="nombre";
    // var inputnom = document.createElement("input");
    // inputnom.type="text";
    // inputnom.id="nombre";
    // inputnom.placeholder="Nombre de la empresa";
    // inputnom.required = true;
    // nom.appendChild(labnom);
    // nom.appendChild(inputnom);
    // nom.appendChild(error);  
    var nomdiv = crearInput("Nombre","nombre","Nombre de la empresa");
    var direcciondiv = crearInput("Dirección","direccion","Dirección de la empresa");
    var localidaddiv = crearInput("Localidad","localidad","Localidad de la empresa");
    var telefonodiv = crearInput("Teléfono","telefono","Teléfono de la empresa");
    telefonodiv.firstElementChild.nextElementSibling.pattern ="^[689]\d{8}$";
    var botondiv = document.createElement("div");
    botondiv.id = "boton";
    var boton = document.createElement("button");
    boton.id = "aniadirTienda";
    boton.textContent="Añadir Tienda";
    botondiv.appendChild(boton);
    formulariotag.appendChild(nomdiv);
    formulariotag.appendChild(direcciondiv);
    formulariotag.appendChild(localidaddiv);
    formulariotag.appendChild(telefonodiv);
    formulariotag.appendChild(botondiv);
    formul.appendChild(formulariotag);
    ocultador.appendChild(formul);
    all.appendChild(ocultador);
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
document.getElementById("jqueryButton").addEventListener("click", loadjquery);
function loadjquery() {
    borrarMain();
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
