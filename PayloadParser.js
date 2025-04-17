function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Procesar JSON de EZE GEN1 (hasta 200 registros por sensor por call)
    
    if (jsonPayload.data !== null) {
        
        /*--------------------------------------------------------------------------------------------
        VARIABLES PLANTA 2 POTES
        ----------------------------------------------------------------------------------------------*/
        
        var potes = device.endpoints.byAddress(1);

    }
/*------------------------------------------------------------------------------------------------------

SENTENCIAS PLANTA 2 POTES SENTENCIAS PLANTA 2 POTES SENTENCIAS PLANTA 2 POTES  SENTENCIAS PLANTA 2 POTES  

--------------------------------------------------------------------------------------------------------*/        


// POTES

if (jsonPayload.pid == "POTES")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("VALOR --> ",item.val);
                    env.log("Ciclo --> ",i);
                    potes.updateFlowSensorValueSummation(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }











//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

    // Importante: si el script llega a este punto es que no se pudo parsear el json.
    // Como no estamos devolviendo nada, el motor de scripting devolverá el valor por
    // defecto, que consiste en:
    // - Status code 200
    // - Content type "text/plain"
    // - Body vacío (sin contenido)

}