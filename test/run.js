let index = require('../dist/src/index')

const event = {
    Records:[
        {
            body:JSON.stringify(
                { 
                    "Message": "{\"clientId\":\"101010101\",\"data\":\"informacion-1\"}"
                })
        }
  ],
};

index
  .handler(event)
.then(resultado => console.log("resultado: paso",resultado))
.catch(err => console.log("error: ",err));