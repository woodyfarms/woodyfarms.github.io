// var http = require("http");
document.querySelector('#clientForm').addEventListener('submit', (e) => {
  
  var formObj = {};
  var inputs = document.querySelector('#clientForm').elements;
  for(i=0; i<inputs.length-1; i++){
        formObj[inputs[i].name] = inputs[i].value;
    };
  console.log(formObj)
  
  e.preventDefault()

  var command = 'INSERT INTO CLIENTS VALUES ("'+formObj['Name']+'"'+','+'"'+formObj['Address']+'"'+','+'"'+formObj['State']+'"'+','+'"'+formObj['GSTIN']+'"'+');'
  var db = openDatabase('WOODYFAMRS', '1.0', 'WF DATABASE', 200 * 1024 * 1024)
  db.transaction(function (tx) {
    tx.executeSql(command, [], function (tx, results) {
      document.querySelector('#output').innerHTML='Client Registered Successfully!';
      var len = results.rows.length, i;
      for (i = 0; i < len; i++) {
        console.log(results.rows.item(i));
      }
    }, function(tx, e){console.log('Error!', e.message)
    document.querySelector('#output').innerHTML='Error Occured!';

  })
  });
  });



