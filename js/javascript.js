

$("#lista").click(function (event) {
    event.preventDefault();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/EmprInfRs_AlvaradoCristo/webresources/tienda",
        success: function (data) {

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

var mostrarForm = document.getElementById("mostrarForm");
var formulario = document.getElementById("ocultarForm");
var tamanioInicial = formulario.style.maxHeight;
console.log(tamanioInicial);
function increaseHeight(){
    formulario.style.maxHeight="0px";
    mostrarForm.removeEventListener('click',increaseHeight);
    mostrarForm.addEventListener('click', reduceHeight);

}
function reduceHeight(){
    formulario.style.maxHeight="350px";
    mostrarForm.removeEventListener('click',reduceHeight);
    mostrarForm.addEventListener('click', increaseHeight);
}
mostrarForm.addEventListener('click', increaseHeight);

var telefono = document.getElementById("telefono");

telefono.addEventListener("input", comprobarTelefono);

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

var nombre = document.getElementById("nombre");
var direccion = document.getElementById("direccion");
var localidad = document.getElementById("localidad");

function comprobar(e){
    if (e.target.validity.valueMissing) {
        campoObligatorio(e.target);      
    }
    else{
        e.target.nextElementSibling.textContent = "";
        correcto(e.target);
    }
}
nombre.addEventListener("input",comprobar);
direccion.addEventListener("input",comprobar);
localidad.addEventListener("input",comprobar);

document.getElementById("aniadirTienda").addEventListener("click",function (e){
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