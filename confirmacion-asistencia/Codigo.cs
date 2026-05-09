function doGet(e) {
  var idParam = e.parameter.id;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var grupoEncontrado = null;

  // Buscar el grupo por ID en la columna A
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == idParam) {
      grupoEncontrado = {
        id: data[i][0],
        cantidad: data[i][1],
        fila: i + 1
      };
      break;
    }
  }

  var tmp = HtmlService.createTemplateFromFile('index');
  tmp.grupo = grupoEncontrado;
  return tmp.evaluate()
    .setTitle("Confirmación de Invitación")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function actualizarRegistro(form) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var rowIndex = parseInt(form.filaAncla);
  var data = sheet.getRange(rowIndex, 1, 1, 3).getValues()[0]; // Obtiene ID, Cantidad, Contraseña
  
  var passReal = data[2];
  
  // Validar contraseña
  if (form.passConfirm !== String(passReal)) {
    throw new Error("La contraseña de confirmación es incorrecta.");
  }

  // Definir columnas de nombres según el CSV (D=4, E=5, F=6, G=7)
  var cantidad = parseInt(data[1]);
  for (var i = 0; i < cantidad; i++) {
    var nombreInput = form['nombre' + i];
    sheet.getRange(rowIndex, 4 + i).setValue(nombreInput);
  }

  return "Datos actualizados correctamente para el grupo " + data[0];
}