// import dotenv from "dotenv"
// dotenv.config({
//     path : '../.env'
// })
// import app from "./app.js"
// import mongoose from "mongoose"
// import http from 'http';
// import { WebSocketServer, WebSocket } from 'ws';
// import path from 'path';
// import { invalid } from "./models/invalid.model.js";
// const server = http.createServer(app);
// const wss = new WebSocketServer({ server });




// let server2WebSocket;


// server2WebSocket = new WebSocket('ws://localhost:3001');
// server2WebSocket.on('open', () => {
//     console.log('Connected to Server 1 from Server 2');
//     server2WebSocket.send('Hello from Server 2');
//   });

//   server2WebSocket.on('message', (message) => {
//     const messageStr = message.toString('utf8');
//     console.log(`Message from Server 1: ${messageStr}`);})




// async function connectToServer1() {
// //   server2WebSocket = new WebSocket('ws://localhost:3001');

//   server2WebSocket.on('open', () => {
//     console.log('Connected to Server 1 from Server 2');
//     server2WebSocket.send('Hello from Server 2');
//   });

//   server2WebSocket.on('message', (message) => {
//     const messageStr = message.toString('utf8');
//     console.log(`Message from Server 1: ${messageStr}`);

//     const messageArray = JSON.parse(messageStr);

//     const invalidFlowRateHouses = messageArray.filter(house => house.flowRate < 0.5 || house.flowRate > 1.0);

//     console.log("--------------------------------")
//     console.log("Invalid flow rate houses:", invalidFlowRateHouses);

//     if(invalidFlowRateHouses){

//       let data = JSON.stringify(invalidFlowRateHouses)
//       let inv = await invalid.create({
//         data,
    
//       })
//     }

//     // Broadcast the message to all connected clients
//     wss.clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(messageStr);
        

//       }
//     });
//   });

//   server2WebSocket.on('error', (error) => {
//     console.error('WebSocket error:', error);
//   });

//   server2WebSocket.on('close', (code, reason) => {
//     console.log(`Disconnected from Server 1. Code: ${code}, Reason: ${reason}`);
//     if (code === 1006) {
//       console.log('Attempting to reconnect to Server 1...');
//       setTimeout(connectToServer1, 5000); // Reconnect after 5 seconds
//     }
//   });
// }

// // Initial connection to Server 1
// connectToServer1();

// // Define a route for the HTTP server
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // WebSocket server setup
// wss.on('connection', ws => {
//   console.log('Client connected');
//   ws.on('message', message => {
//     console.log(`Received from client: ${message}`);
//   });
//   ws.send('Hello from Server 2');
// });

// wss.on('error', (error) => {
//   console.error('WebSocket server error:', error);
// });


// (
//   async()=>{
//     try{
//     await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DATABASE}`)
//     app.listen(process.env.PORT , ()=>{
//         console.log(`app is listning on port : ${process.env.PORT}`)
//     })
//     }catch(error){
//         console.log("error here --------")
//         console.log(error)
//         throw error
//     }
//   }
// )()



import dotenv from "dotenv";
dotenv.config({
  path: '../.env'
});
import app from "./app.js";
import mongoose from "mongoose";
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { invalid } from "./models/invalid.model.js";

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let server2WebSocket;

async function connectToServer1() {
  server2WebSocket = new WebSocket('ws://localhost:3001');

  server2WebSocket.on('open', () => {
    console.log('Connected to Server 1 from Server 2');
    server2WebSocket.send('Hello from Server 2');
  });

  server2WebSocket.on('message', async (message) => {
    const messageStr = message.toString('utf8');
    console.log(`Message from Server 1: ${messageStr}`);

    const messageArray = JSON.parse(messageStr);

    const invalidFlowRateHouses = messageArray.filter(house => house.flowRate < 0.5 || house.flowRate > 1.0);

    console.log("--------------------------------");
    console.log("Invalid flow rate houses:", invalidFlowRateHouses);

    if (invalidFlowRateHouses.length > 0) {
      let data = JSON.stringify(invalidFlowRateHouses);

      function getRandomWard() {
        const wardNumber = Math.floor(Math.random() * 10) + 1;
        return `w${wardNumber}`;
      }

      const inv = await invalid.create({
        data,
        ward : getRandomWard()
      });
      console.log("Invalid flow rate houses saved:", inv);
    }

    // Broadcast the message to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  });

  server2WebSocket.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  server2WebSocket.on('close', (code, reason) => {
    console.log(`Disconnected from Server 1. Code: ${code}, Reason: ${reason}`);
    if (code === 1006) {
      console.log('Attempting to reconnect to Server 1...');
      setTimeout(connectToServer1, 5000); // Reconnect after 5 seconds
    }
  });
}

// Initial connection to Server 1
connectToServer1();

// Define a route for the HTTP server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// WebSocket server setup
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => {
    console.log(`Received from client: ${message}`);
  });
  ws.send('Hello from Server 2');
});

wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DATABASE}`);
    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("error here --------");
    console.log(error);
    throw error;
  }
})();