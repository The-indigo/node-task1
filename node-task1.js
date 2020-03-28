const http=require('http')
const fs = require('fs');
const data=require('querystring')
const server=http.createServer( (req,res,err)=>{
    if(err){
        console.log(err)
    }else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
           formValue= data.parse(body)
  
            fs.appendFileSync('message.txt',formValue.message + "\r\n", (err) => { 
      
                // In case of a error throw err. 
                if (err) throw err; 
            })
            res.end('Message saved');
 
        });

    }else{
        res.end(`
        <!doctype html>
        <html>
            <body> 
            <h3>Please enter a message below</h3>
                <form action="/message" method="post">
                <textarea name="message" rows="4" cols="50">  </textarea>
                <button>Submit</button>
            </body>
        </html>`)
    

        
    }
    
})
server.listen(8080)
console.log('listening on port 8080')
