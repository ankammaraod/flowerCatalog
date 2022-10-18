const { app } = require('./src/app.js');

const startApp = app();
const PORT = 8080;
startApp.listen(PORT, () => console.log(`listening port no ${PORT}`));
