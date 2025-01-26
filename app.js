const {MongoClient} = require('mongodb');
const path = require('path');
const express = require('express');


ArduinoON = false

// Send to Arduino
var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});


var port = new SerialPort('COM3',{ 
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});
port.pipe(parser);


async function SendToMongoDB(data) {
    const uri = process.env.MONGODB_URI;
    
    const client = new MongoClient(uri)

    try {        
        await client.connect();
        await createListing(client, data)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close();
    }
}

const app = express();

app.use(express.json())
app.use(express.static('./public'));

app.post('/data', async (request, response) => {
    port.write( request.body.isReward);
    response.end();
})


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/experiment.html'));
});

app.get('/finish', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/html/finish.html'));
});

app.post('/experiment-data', function(request, response) {
    exp_data = request.body;
    
    merged_exp_data = exp_data.reduce((a, e) => 
        // iterate each object entry as [key, value] and use "a" as accumulator
        Object.entries(e).reduce((a, t) => {
            // create an empty array on "a" for each key (if it does not exist yet)
            // then push current value to it
            (a[t[0]] = a[t[0]] || []).push(t[1]);
            return a;
        }, a), {});
    response.end();
    if(port == process.env.PORT){
        SendToMongoDB(merged_exp_data).catch(console.error)
    }
})



app.listen(3000, () => {
	console.log(`Server Started at ${3000}`)
})


async function createListing(client, newListing) {
    const result = await client.db("MonkeyExperiment")
    .collection("First Experiment")
    .insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedCount}`)
}
