const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${getUniqueId()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg,roomId) => {
    console.log('message: ' + msg+roomId);
    io.emit('chat message', msg, roomId);
  });
});
server.listen(process.env.PORT || 3000)
function getUniqueId() {
  // body...

    var length = 10;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

  return result;
}