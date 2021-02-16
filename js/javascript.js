var mostrarForm;
var formaEnvio;
var urlRestApi = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";



$("#spinnerContainer").hide();
var sendForm;
/**
 * Crear el main de la pagina 
 */
function crearMain() {
    var all = document.createElement("div");
    var cabecera = document.createElement("div");
    cabecera.id = "cabecera"
    var nuevaTienda = document.createElement("p");
    nuevaTienda.id = "mostrarForm";
    nuevaTienda.textContent = "Nueva Tienda";
    var buscador = document.createElement("div");
    var idTienda = document.createElement("input");
    idTienda.placeholder = "Id de la Tienda";
    idTienda.id = "inputIdTienda";
    var btnBuscador = document.createElement("button");
    if (formaEnvio == "jquery") {
        console.log("Se pone como jquery");
        btnBuscador.addEventListener("click", cargarIdjquery);
    } else if (formaEnvio == "xhr") {
        console.log("Se pone como xhr");
        btnBuscador.addEventListener("click", cargarIdXhr);
    } else if (formaEnvio == "fetch") {
        console.log("Se pone como fetch");
        btnBuscador.addEventListener("click", cargarIdFetch);
    }

    btnBuscador.id = "find"
    buscador.appendChild(idTienda);
    buscador.appendChild(btnBuscador);
    var iconBuscadorTemp = document.getElementById("buscarIcon");

    var iconBuscador = iconBuscadorTemp.content.cloneNode(true);
    console.log(iconBuscador.firstElementChild);
    iconBuscador.firstElementChild.id = "buscadorIcono";
    //iconBuscar ocultar cuando se empieze a realizar una petición de carga
    var iconCancelarTemp = document.getElementById("cancelarIcon");
    var iconCancelar = iconCancelarTemp.content.cloneNode(true);
    iconCancelar.firstElementChild.id = "cancelarIcono";
    //iconCancelar cambiar cuando se cargue la id tienda y se haya completado la petición
    iconCancelar.firstElementChild.style.display = "none";
    var iconLoaderTemp = document.getElementById("loaderIcon");
    var iconLoader = iconLoaderTemp.content.cloneNode(true);
    iconLoader.firstElementChild.id = "loaderIcono";
    //iconLoader poner cuando se realize la carga de la busqueda de la tienda por id 
    iconLoader.firstElementChild.style.display = "none";
    btnBuscador.appendChild(iconBuscador);
    btnBuscador.appendChild(iconCancelar);
    btnBuscador.appendChild(iconLoader);
    cabecera.appendChild(nuevaTienda);
    cabecera.appendChild(buscador);
    all.appendChild(cabecera);
    var ocultador = document.createElement("div");
    ocultador.id = "ocultarForm";
    var formul = document.createElement("div");
    formul.id = "formulario";
    var titulo = document.createElement("h2");
    titulo.textContent = "Nueva empresa";
    formul.appendChild(titulo);
    var formulariotag = document.createElement("form");
    var nomdiv = crearInput("Nombre", "nombre", "Nombre de la empresa");
    var direcciondiv = crearInput("Dirección", "direccion", "Dirección de la empresa");
    var localidaddiv = crearInput("Localidad", "localidad", "Localidad de la empresa");
    var telefonodiv = crearInput("Teléfono", "telefono", "Teléfono de la empresa");
    telefonodiv.firstElementChild.nextElementSibling.pattern = "^[689]\\d{8}$";
    var botondiv = document.createElement("div");
    botondiv.id = "boton";
    var boton = document.createElement("button");
    boton.id = "aniadirTienda";
    var cargarForm = document.createElement("div");
    cargarForm.id = "cargarPost";
    var cargandoForm = document.createElement("div");
    cargandoForm.id = "cargandoPost";
    cargandoForm.textContent = "Cargando";
    var baseForm = document.createElement("div");
    baseForm.id = "baseForm";
    baseForm.textContent = "Añadir tienda";
    var iconLoaderForm = iconLoaderTemp.content.cloneNode(true);
    iconLoaderForm.firstElementChild.id = "loaderIcono";
    cargarForm.appendChild(iconLoaderForm);
    cargarForm.appendChild(cargandoForm);
    boton.appendChild(cargarForm);
    //carform boton del formulario para dar feedback mientras se envia la peticion
    cargarForm.style.display = "none";
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
    result.id = "resultados";
    all.appendChild(ocultador);
    all.appendChild(result);
    document.getElementsByTagName("main")[0].appendChild(all);

}
/**
 * Crea input para formulario con mensaje de error
 * @param {*} contenido 
 * @param {*} id 
 * @param {*} placeholder 
 */
function crearInput(contenido, id, placeholder) {
    var div = document.createElement("div");
    var error = document.createElement("p");
    error.classList = "rojo";
    var labdiv = document.createElement("label");
    labdiv.textContent = contenido;
    labdiv.htmlFor = id;
    var inputdiv = document.createElement("input");
    inputdiv.type = "text";
    inputdiv.id = id;
    inputdiv.placeholder = placeholder;
    inputdiv.required = true;
    div.appendChild(labdiv);
    div.appendChild(inputdiv);
    div.appendChild(error);
    return div;

}

var template = document.getElementById("templateLista");
var principal = document.getElementsByTagName("main");
document.getElementById("jqueryButton").addEventListener("click", cargarTodojquery);
document.getElementById("xhrButton").addEventListener("click", cargarTodoXhr);
document.getElementById("fetchButton").addEventListener("click", cargarTodoFetch);
/**
 * Realiza la carga de todas las tiendas mediante Fetch
 */
function cargarTodoFetch() {
    console.log("Se usa fetch");
    formaEnvio = "fetch";
    borrarMain();
    document.getElementById("spinnerContainerMain").style.display = "block";
    fetch(urlRestApi)
        .then(function (response) {
            response.json().then(function (data) {
                loadAll();
                document.getElementById("spinnerContainerMain").style.display = "none";
                data.forEach(element => {
                    var empresaTemp = document.getElementById("empresaContainer");
                    var empr = empresaTemp.content.cloneNode(true);
                    empr.firstElementChild.firstElementChild.textContent = element.nombreTienda;
                    empr.firstElementChild.firstElementChild.nextElementSibling.textContent = element.direccion + "(" + element.localidad + ")";
                    empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = element.telefono;
                    document.getElementById("resultados").appendChild(empr);
                })
            })
        });
    console.log("Se ha cargado con fetch");
}
/**
 * Realiza la carga de una tienda segun su id mediante Fetch
 */
function cargarIdFetch() {
    console.log("Se usa fetch");
    document.getElementById("buscadorIcono").style.display = "none";
    document.getElementById("loaderIcono").style.display = "block";
    while (document.getElementById("resultados").firstChild) {
        document.getElementById("resultados").firstChild.remove()
    }
    var valor = document.getElementById("inputIdTienda");
    fetch(urlRestApi + valor.value)
        .then(function (response) {
            if (response.status == 204) {
                var notFound = document.createElement("h1");
                notFound.textContent = "No se ha encontrado la tienda";
                document.getElementById("resultados").appendChild(notFound);

            } else {
                response.json().then(function (data) {
                    console.log(data.length);
                    if (data.length === undefined) {
                        var empresaTemp = document.getElementById("empresaContainer");
                        var empr = empresaTemp.content.cloneNode(true);
                        empr.firstElementChild.firstElementChild.textContent = data.nombreTienda;
                        empr.firstElementChild.firstElementChild.nextElementSibling.textContent = data.direccion + "(" + data.localidad + ")";
                        empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = data.telefono;
                        document.getElementById("resultados").appendChild(empr);
                    } else {
                        var notFound = document.createElement("h1");
                        notFound.textContent = "Insertar un id antes de usar el botón de busqueda"
                        document.getElementById("resultados").appendChild(notFound);
                    }


                })
            }
            document.getElementById("loaderIcono").style.display = "none";
            document.getElementById("cancelarIcono").style.display = "block";
            var btnCancelar = document.getElementById("find");
            btnCancelar.removeEventListener("click", cargarIdFetch);
            btnCancelar.addEventListener("click", cargarTodoFetch);
        })
}

/**
 * Realiza el post de una tienda mediante Fetch
 */
function postFetch() {
    console.log("Se usa fetch");
    var iNombre = document.getElementById("nombre").value;
    var iDireccion = document.getElementById("direccion").value;
    var iLocalidad = document.getElementById("localidad").value;
    var iTelefono = document.getElementById("telefono").value;

    var data = { nombreTienda: iNombre, direccion: iDireccion, localidad: iLocalidad, telefono: iTelefono };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    document.getElementById("baseForm").style.display = "none";
    document.getElementById("cargarPost").style.display = "flex";
    document.getElementById("aniadirTienda").disabled=true;
    // send post request
    fetch(urlRestApi, options).then(
        ()=>{
            cargarTodoFetch();
        }
    );
}
/**
 * Realiza la carga de todas las tiendas mediante Xhr
 */
function cargarTodoXhr() {
    console.log("Se usa xhr");
    formaEnvio = "xhr";
    const xhr = new XMLHttpRequest();
    borrarMain();
    document.getElementById("spinnerContainerMain").style.display = "block";
    //$("#spinnerContainerMain").show();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                loadAll();
                document.getElementById("spinnerContainerMain").style.display = "none";
                //$("#spinnerContainerMain").hide();
                const objeto = JSON.parse(this.responseText);
                objeto.forEach(element => {
                    var empresaTemp = document.getElementById("empresaContainer");
                    var empr = empresaTemp.content.cloneNode(true);
                    empr.firstElementChild.firstElementChild.textContent = element.nombreTienda;
                    empr.firstElementChild.firstElementChild.nextElementSibling.textContent = element.direccion + "(" + element.localidad + ")";
                    empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = element.telefono;
                    document.getElementById("resultados").appendChild(empr);
                });

            } catch (e) {
                console.log("error en el parseo del json");
            }
        }
    }
    xhr.open('get', urlRestApi);
    xhr.send();
    console.log("se ha cargado con xhr")
}
/**
 * Realiza la carga de una tienda mediante Xhr
 */
function cargarIdXhr() {
    console.log("Se usa xhr");
    const xhr = new XMLHttpRequest();
    document.getElementById("buscadorIcono").style.display = "none";
    document.getElementById("loaderIcono").style.display = "block";
    while (document.getElementById("resultados").firstChild) {
        document.getElementById("resultados").firstChild.remove()
    }
    var valor = document.getElementById("inputIdTienda");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                document.getElementById("loaderIcono").style.display = "none";
                document.getElementById("cancelarIcono").style.display = "block";
                const objeto = JSON.parse(this.responseText);
                console.log(objeto);
                console.log();
                var tmnTienda = 5;
                if (Object.keys(objeto).length > tmnTienda) {
                    var notFound = document.createElement("h1");
                    notFound.textContent = "Insertar un id antes de usar el botón de busqueda"
                    document.getElementById("resultados").appendChild(notFound);
                    console.log("Se muestra aqui de alguna manera?")

                } else {
                    var empresaTemp = document.getElementById("empresaContainer");
                    var empr = empresaTemp.content.cloneNode(true);
                    //console.log(empr.firstElementChild)
                    empr.firstElementChild.firstElementChild.textContent = objeto.nombreTienda;
                    empr.firstElementChild.firstElementChild.nextElementSibling.textContent = objeto.direccion + "(" + objeto.localidad + ")";
                    empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = objeto.telefono;
                    //console.log(pdata);
                    document.getElementById("resultados").appendChild(empr);

                }
            } catch (e) {
                console.log("error en el parseo del json");
            }
        } else if (this.readyState == 4 && this.status == 204) {
            var notFound = document.createElement("h1");
            notFound.textContent = "Tienda no encontrada"
            document.getElementById("resultados").appendChild(notFound);
            document.getElementById("loaderIcono").style.display = "none";
            document.getElementById("cancelarIcono").style.display = "block";

        } else if (this.readyState == 4 && this.status == 404) {
            var notFound = document.createElement("h1");
            notFound.textContent = "Tienda no encontrada"
            document.getElementById("resultados").appendChild(notFound);
            document.getElementById("loaderIcono").style.display = "none";
            document.getElementById("cancelarIcono").style.display = "block";
        }
    }
    var btnCancelar = document.getElementById("find");
    btnCancelar.removeEventListener("click", cargarIdXhr);
    btnCancelar.addEventListener("click", cargarTodoXhr);
    xhr.open('get', urlRestApi + valor.value);
    xhr.send();

}
/**
 * Realiza el post de una tienda mediante Xhr
 */
function postXhr() {
    console.log("Se usa xhr");
    const xhr = new XMLHttpRequest();
    var iNombre = document.getElementById("nombre").value;
    var iDireccion = document.getElementById("direccion").value;
    var iLocalidad = document.getElementById("localidad").value;
    var iTelefono = document.getElementById("telefono").value;

    // listen for `load` event
    xhr.onreadystatechange = () => {
        document.getElementById("baseForm").style.display = "none";
        document.getElementById("cargarPost").style.display = "flex";
        document.getElementById("aniadirTienda").disabled=true;

    };
    var data = { nombreTienda: iNombre, direccion: iDireccion, localidad: iLocalidad, telefono: iTelefono };
    // create a JSON object


    xhr.open('POST', urlRestApi);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
    cargarTodoXhr();

}
/**
 * Realiza la carga de toda la página y le añade al formulario la funcionalidad
 */
function loadAll() {

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
        sendForm = true;
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });
        nombre.dispatchEvent(event);
        direccion.dispatchEvent(event);
        localidad.dispatchEvent(event);
        telefono.dispatchEvent(event);
        if (sendForm == true) {
            console.log("El formulario es correcto para enviar ");
            if (formaEnvio == "jquery") {
                postJquery();
                console.log("Post mediante jquery")
            } else if (formaEnvio == "xhr") {
                postXhr();
                console.log("Post mediante xhr");
            } else if (formaEnvio == "fetch") {
                postFetch();
                console.log("Post mediante Fetch");
            }

        } else {
            console.log("El formulario no se enviara");
        }
    })

}
/**
 * Realiza la carga de todas las tiendas mediante Jquery
 */
function cargarTodojquery() {
    console.log("Se usa jquery");
    formaEnvio = "jquery";
    borrarMain();
    $("#spinnerContainerMain").show();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: urlRestApi,

        success: function (data) {
            loadAll();
            $("#spinnerContainerMain").hide();

            $.each(data, function (j, pdata) {
                var empresaTemp = document.getElementById("empresaContainer");
                var empr = empresaTemp.content.cloneNode(true);

                empr.firstElementChild.firstElementChild.textContent = pdata.nombreTienda;
                empr.firstElementChild.firstElementChild.nextElementSibling.textContent = pdata.direccion + "(" + pdata.localidad + ")";
                empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = pdata.telefono;

                document.getElementById("resultados").appendChild(empr);
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(' Error in processing! ' + textStatus);
        }

    });

}
/**
 * Realiza la carga de una tienda mediante Jquery
 */
function cargarIdjquery() {
    console.log("Se usa jquery");
    $("#buscadorIcono").hide();
    $("#loaderIcono").show();
    $("#resultados").empty();
    var valor = document.getElementById("inputIdTienda");

    $.ajax({
        type: "GET",
        dataType: "json",
        url: urlRestApi + valor.value,

        success: function (data) {
            $("#loaderIcono").hide();
            $("#cancelarIcono").show();
            console.log("response:" + JSON.stringify(data));
            if (data === undefined) {
                var notFound = document.createElement("h1");
                notFound.textContent = "Tienda no encontrada"
                document.getElementById("resultados").appendChild(notFound);

            } else if (data.length) {
                var notFound = document.createElement("h1");
                console.log("Se esta ahciendo algo aqui?")
                notFound.textContent = "Insertar un id antes de usar el botón de busqueda"
                document.getElementById("resultados").appendChild(notFound);
            }
            else {
                console.log(data.length);
                console.log(data);
                var empresaTemp = document.getElementById("empresaContainer");
                var empr = empresaTemp.content.cloneNode(true);
                //console.log(empr.firstElementChild)
                empr.firstElementChild.firstElementChild.textContent = data.nombreTienda;
                empr.firstElementChild.firstElementChild.nextElementSibling.textContent = data.direccion + "(" + data.localidad + ")";
                empr.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent = data.telefono;
                //console.log(pdata);
                document.getElementById("resultados").appendChild(empr);
            }




        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#loaderIcono").hide();
            $("#cancelarIcono").show();
            var notFound = document.createElement("h1");
            notFound.textContent = "Tienda no encontrada"
            document.getElementById("resultados").appendChild(notFound);
        }
    });
    var btnCancelar = document.getElementById("find");
    btnCancelar.removeEventListener("click", cargarIdjquery);
    btnCancelar.addEventListener("click", cargarTodojquery);
}

/**
 * Realiza el post de una tienda mediante Jquery
 */
function postJquery() {
    console.log("Se usa jquery");
    var data = { nombreTienda: $("#nombre").val(), direccion: $("#direccion").val(), localidad: $("#localidad").val(), telefono: $("#telefono").val() };
    console.log(JSON.stringify(data));
    $("#baseForm").hide();
    $("#cargarPost").show();
    $("#aniaadirTienda".disabled="true");
    
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: urlRestApi,
        data: JSON.stringify(data),
        //en este caso
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            //codigo de exito
            console.log("se ha insertado la tienda");
            console.log(JSON.stringify(data));
            cargarTodojquery();
        },
        error: function (error) {
            //codigo error
            console.log("No se ha podido enviar la tienda")
        }
    });
}
/**
 * Incrementa el tamaño del div que contiene el formulario para mostrarlo
 */
function increaseHeight() {
    var formulario = document.getElementById("ocultarForm");
    formulario.style.maxHeight = "350px";
    mostrarForm.removeEventListener('click', increaseHeight);
    mostrarForm.addEventListener('click', reduceHeight);

}
/**
 * Reduce el tamaño del div que contiene el formulario para ocultarlo
 */
function reduceHeight() {
    var formulario = document.getElementById("ocultarForm");
    formulario.style.maxHeight = "0px";
    mostrarForm.removeEventListener('click', reduceHeight);
    mostrarForm.addEventListener('click', increaseHeight);
}
/**
 * Borra todo el contenido del main
 */
function borrarMain() {
    while (document.getElementsByTagName("main")[0].firstChild) {
        document.getElementsByTagName("main")[0].firstChild.remove()
    }
}
/**
 * Comprueba que el número de teléfono sea valido
 * @param {*} e Evento que activa la funcion
 */

function comprobarTelefono(e) {
    console.log(e.target);
    if (e.target.validity.valueMissing) {
        campoObligatorio(e.target);
        sendForm = false;
    } else if (e.target.validity.patternMismatch) {
        e.target.nextElementSibling.textContent = "Debe de poner un número que comienze por 6, 8, 9 de nueve cifras";
        error(e.target);
        sendForm = false;
    } else {
        console.log("El telefono es correcto")
        e.target.nextElementSibling.textContent = "";
        correcto(e.target);

    }

}
/**
 * Comprueba que el input no esta vacio
 * @param {*} input Input que se analiza para ver si es valido
 */
function campoObligatorio(input) {
    input.nextElementSibling.textContent = "Campo obligatorio";
    error(input);
}
/**
 * Marca el input erroneo y da pistas de que error se ha cometido
 * @param {*} input Input que se debe marcar como erroneo
 */
function error(input) {
    input.classList.add("error");
    input.classList.remove("correcto");
    console.log("Aqui se pone la variable global como falsa" + input.value);
    console.log(input);
}
/**
 * Marca el input como correcto
 * @param {*} input Input correcto
 */
function correcto(input) {
    input.classList.add("correcto");
    input.classList.remove("error");

}
/**
 * Comprueba el input
 * @param {*} e Evento que activa la función
 */

function comprobar(e) {
    if (e.target.validity.valueMissing) {
        campoObligatorio(e.target);
        sendForm = false;
    }
    else {
        e.target.nextElementSibling.textContent = "";
        correcto(e.target);
    }
}
