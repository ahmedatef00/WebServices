var soap = require('soap');
var url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, function (err, client) {
  if (err){
    throw err;
  }
 
  client.sayHello(null, function (err, res) {
    console.log(res); 
    console.log(client.describe());
    
  });
});