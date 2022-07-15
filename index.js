const { app } = require('./src/app.js');

const startApp = app();

startApp.listen(9090, () => console.log('listening port no 9090'));
