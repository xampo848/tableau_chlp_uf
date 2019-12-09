(function () {

    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
      var cols = [{
          id: "fecha",
          dataType: tableau.dataTypeEnum.string
        }, {
            id: "valor",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "uf_clp",
            alias: "valor uf en clp",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
      $.getJSON("https://mindicador.cl/api/uf", function(resp) {
          var feat = resp.serie;
          var tableData = [];
          // Iterate over the JSON object
          tableData.push({
              "fecha": feat[0].fecha,
              "valor": feat[0].valor
              
          });
          table.appendRows(tableData);
          doneCallback();
      });      
    };
    tableau.registerConnector(myConnector);

  $(document).ready(function () {
      $("#submitButton").click(function () {
          tableau.connectionName = "chilean uf";
          tableau.submit();
      });
  });

})();
