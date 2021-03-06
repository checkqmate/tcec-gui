var https = require("https");
var url = require('url');
var fs = require('fs');
var io = require('socket.io')();
var express = require('express');
var app = express();
var path = require('path');
const md5 = require('md5');
const axios = require('axios');
var chokidar = require('chokidar');
var _ = require('lodash');
var lastPgnTime = Date.now();

const pid = process.pid;

if (typeof process.argv[2] == 'undefined')
{
   portnum = 8080;
}
else
{
   portnum = process.argv[2];
}

console.log ("Port is " + portnum);

// first parameter is the mount point, second is the location in the file system
var app = express();
//app.use(express.static(__dirname));

var options = {
   key: fs.readFileSync('/etc/letsencrypt/live/tcecbonus.club/privkey.pem'),
   cert: fs.readFileSync('/etc/letsencrypt/live/tcecbonus.club/fullchain.pem')   
};

var server = https.createServer(options, app).listen(parseInt(portnum), function() {
   console.log('Express server listening on port ' + portnum);
});
var listener = io.listen(server);                                                                                                 
io.attach(server, {
  pingInterval: 25000,
  pingTimeout: 5000
});
var watcher = chokidar.watch('crosstable.json', {
      persistent: true,
      ignoreInitial: false,
      followSymlinks: true,
      disableGlobbing: false,
      usePolling: true,
      interval: 50,
      binaryInterval: 100,
      alwaysStat: false,
      depth: 3,
      //awaitWriteFinish: {
        //stabilityThreshold: 2000,
        //pollInterval: 100
      //}
      //atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
});
var liveeval = 'data.json';
var ctable = 'crosstable.json';
watcher.add('data1.json');
watcher.add('liveeval1.json');
watcher.add(liveeval);
watcher.add('live.json');
watcher.add('schedule.json');
watcher.add('liveeval.json');
watcher.add('banner.txt');

app.get('/api/gameState', function (req, res) {
   console.log('api gameState request');
   var currentFen = '';
   var liveData = fs.readFileSync('live.json');
   var liveJsonData = JSON.parse(liveData);

   if (liveJsonData.Moves.length > 0) {
      currentFen = liveJsonData.Moves[(liveJsonData.Moves.length - 1)].fen;
   }

   var response = {
      'White': liveJsonData.Headers.White,
      'Black': liveJsonData.Headers.Black,
      'CurrentPosition': currentFen,
      'Result': liveJsonData.Headers.Result,
      'Event': liveJsonData.Headers.Event
   }
   res.setHeader('Content-Type', 'application/json');
   res.status(200).send(JSON.stringify(response))
});

app.get('/api/currentPosition', function (req, res) {
   console.log('api currentPosition request');
   var currentFen = 'No game in progress';
   var liveData = fs.readFileSync('live.json');
   var liveJsonData = JSON.parse(liveData);

   if (liveJsonData.Moves.length > 0) {
      currentFen = liveJsonData.Moves[(liveJsonData.Moves.length - 1)].fen;
   }

   res.setHeader('Content-Type', 'application/json');
   res.status(200).send(currentFen);
});

var count = 0;
var socket = 0;
var totalCount = 0;
var socketArray = [];
var userCountFactor = 1.0;

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}

function showDuplicates(names)
{
   var uniq = names
   .map((name) => {
     return {count: 1, name: name}
   })
   .reduce((a, b) => {
     a[b.name] = (a[b.name] || 0) + b.count
     return a
   }, {})
   
   var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
   
   console.log(duplicates);
}

function userCount()
{
   var userCountFinal = parseInt(socketArray.length);

   if (userCountFinal < totalCount)
   {
      userCountFinal = totalCount;
   }
   else if (totalCount)
   {
      userCountFinal = totalCount;
   } 
   return (parseInt(userCountFinal * userCountFactor));
}

function userCountActual()
{
   return (parseInt(socketArray.length));
}

io.sockets.on ('connection', function(socket){    
   var socketId = socket.id;
   var clientIp = socket.request.connection.remoteAddress;
   count = socketArray.length;
   if (socketArray.indexOf(clientIp) === -1)
   {
      socketArray.push(clientIp);
      if (socketArray.length % 100 == 0)
      {
         console.log ("count connected:" + userCount() + " , from serverXXXX:" + clientIp);
         //io.local.emit('users', {'count': userCount()});
      }
      else
      {
         //socket.emit('users', {'count': userCount()});
      }
   }

   socket.on('disconnect', function()
   {
       socketArray = arrayRemove(socketArray, clientIp);
   });

   //recieve client data
   socket.on('getusers', function(data){
      socket.emit('users', {'count': userCount()});
   });

   socket.on('refreshdata', function(data){
      if (delta)
      {
         delta.refresh = 1;
         delta.Users = userCount();
         socket.emit('pgn', delta); 
         delta.refresh = 0;
         console.log ("Sent delta pgn data to connected socket:" + JSON.stringify(delta).length + ",changed" + clientIp + ", from serverXXXX:" + pid);
      }
      else if (prevData)
      {
         prevData.refresh = 1;
         prevData.Users = userCount();
         socket.emit('pgn', prevData); 
         prevData.refresh = 0;
         console.log ("Sent full pgn data to connected socket:" + JSON.stringify(delta).length + ",changed" + clientIp + ", from serverXXXX:" + pid);
      }
      console.log('XXXXXX: req came' + lastPgnTime);
   });

});

//var liveChartInterval = setInterval(function() { process.send({'workers': userCountActual()}) }, 30000);
function sendUsers()
{
   setTimeout(function() { broadCastUsers(); }, 5000);
}

function broadCastUsers()
{
   io.local.emit('users', {'count': userCount()});
}

function broadCastData(socket, message, file, currData, prevData)
{
   var a = JSON.stringify(currData);
   var b = JSON.stringify(prevData);

   if (a == b)
   {
      //console.log ("File "+ file + " did not change:");
      return;
   }
   io.local.emit(message, currData);
}

function checkSend(currData, prevData)
{
   var a = JSON.stringify(currData);
   var b = JSON.stringify(prevData);

   if (a == b)
   {
      console.log ("File "+ file + " did not change:");
      return 0;
   }                    
   else
   {
      return 1;
   }
}

/* Deltapgn: Configure this to less value for less data */
var numMovesToSend = 4;

function getDeltaPgn(pgnX)
{
   var pgn = {};
   var countPgn = 0;
   pgnX.Users = userCount();

   if (prevData && JSON.stringify(prevData.Headers) != JSON.stringify(pgnX.Headers))
   {
      pgnX.gameChanged = 1;
      return pgnX;
   }
   pgnX.gameChanged = 0;
   
   console.log ("Found prev data");

  var keys = _.keys(pgnX);
  _.each(keys, function(index, key) {
      if (index != "Moves")
      { 
         pgn[index] = pgnX[index];
      }
      else
      {
         console.log ("Noy copying moves");
      }
  });

   var maxKey = 0;
   pgn.Moves = [];
   _.eachRight(pgnX.Moves, function(move, key) {
      pgn.Moves[key] = {};
      if (countPgn <= numMovesToSend)
      {
         pgn.Moves[key]= pgnX.Moves[key];
         pgn.Moves[key].Moveno = key + 1;
         pgn.lastMoveLoaded = key;
         if (maxKey == 0)
         {
            maxKey = key + 1;
         }
      }
      else
      {
         pgn.Moves[key].Moveno = 0;
      }
      countPgn = countPgn + 1;
   });
   console.log ("Setting pgn.lastMoveLoaded to " + maxKey);

   return pgn;
}

var prevData = 0;
var prevliveData = 0;
var prevevalData = 0;
var prevliveData1 = 0;
var prevevalData1 = 0;
var prevCrossData = 0;
var prevSchedData = 0;
var delta = {};

watcher.on('change', (path, stats) => {
   if (0)
   {
      console.log ("path changed:" + path + ",count is:" + userCount() + 
                   " ,actual count is:" + parseInt(userCountActual() * userCountFactor) + 
                   " ,server is :" + pid);
   }
   var content = fs.readFileSync(path, "utf8");
   try 
   {
      var data = JSON.parse(content);
      if (path.match(/data.json/))
      {
         broadCastData(socket, 'liveeval', path, data, prevliveData);
         prevliveData = data;
      }
      if (path.match(/data1.json/))
      {
         broadCastData(socket, 'liveeval1', path, data, prevliveData1);
         prevliveData1 = data;
      }
      if (path.match(/liveeval.json/))
      {
         broadCastData(socket, 'livechart', path, data, prevevalData);
         prevevalData = data;
      }
      if (path.match(/liveeval1.json/))
      {
         broadCastData(socket, 'livechart1', path, data, prevevalData1);
         prevevalData1 = data;
      }
      if (path.match(/live.json/))
      {
         console.log ("json changed");
         var changed = checkSend(data, prevData);
         if (changed)
         {
            delta = getDeltaPgn(data, prevData);
            //broadCastData(socket, 'pgn', path, delta, delta);
            io.local.emit('pgn', delta); 
            console.log ("Sent pgn data:" + JSON.stringify(delta).length + ",orig" + JSON.stringify(data).length + ",changed" + delta.Users);
            lastPgnTime = Date.now(); 
         }
         prevData = data;
      }
      if (path.match(/crosstable/))
      {
         broadCastData(socket, 'crosstable', path, data, prevCrossData);
         prevCrossData = data;
      }
      if (path.match(/schedule/))
      {
         broadCastData(socket, 'schedule', path, data, prevSchedData);
         prevSchedData = data;
      }
      if (path.match(/banner/))
      {
         io.local.emit('banner', data); 
      }
   }
   catch (error) 
   {
      console.log ("error: " + error);
      return;
   }
});

process.on('message', function(msg) 
{
   console.log('Worker ' + process.pid + ' received message from master.', JSON.stringify(msg));
   totalCount = parseInt(msg.count);
});
