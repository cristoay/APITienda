

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
