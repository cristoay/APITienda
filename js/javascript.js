/**
 * Esta es una prueba esta es la tercera vez
 * @param {tipo} parametros 
 */
function probando(parametros){

}
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