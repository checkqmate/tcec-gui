const cluster = require('cluster');
const os = require('os');
const numServer = 4;

if (cluster.isMaster) 
{
   const cpus = os.cpus().length;
   var count = 0;
   var clientCount = 0;
   for (let i = 0; i < numServer; i++) 
   {
      console.log(`Forking for ${cpus} CPUs`);
      var worker = cluster.fork();
      count = 0;
      worker.on('message', function(msg) 
      {
         if (typeof msg.workers != 'undefined')
         {
            console.log ("CLUSTER: Count is :" + count + " ,got count:" + parseInt(msg.workers) + ",clientCount:" + clientCount);
            count = parseInt(count) + parseInt(msg.workers);
            clientCount = clientCount + 1;
         }
      });
   }
  
   function eachWorker(callback) 
   {
      for (const id in cluster.workers) 
      {
         callback(cluster.workers[id]);
      }
   }

   const updateWorkers = () => {
     eachWorker(worker => {
       if (clientCount == numServer)
       {
          worker.send({'count':count});
       }
     });
     count = 0;
     clientCount = 0;
   };
   
   updateWorkers();
   setInterval(updateWorkers, 10000);

   cluster.on('exit', (worker, code, signal) => 
   {
      if (code !== 0 && !worker.exitedAfterDisconnect) 
      {
         console.log(`Worker ${worker.id} crashed. ` +
            'Starting a new worker...');
         cluster.fork();
      }
   });
} 
else 
{
   require('./server');
}

