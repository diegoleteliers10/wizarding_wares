const PORT = 3001;
const server= require('./app')
const {db}= require('./DB_connection')


server.listen(PORT, async () => {
   console.log('Server raised in port: ' + PORT);
   await db.sync({ force:true })
});