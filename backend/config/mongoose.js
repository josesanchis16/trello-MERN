const mongoose=require('mongoose');
const settings = require('./settings').MONGODB;
//conexión a la base de datos MongoDB CounterDB
mongoose.connect(`mongodb://${settings.bbdd_url}:${settings.bbdd_port}/${settings.bbdd_name}`, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => console.log("conexión establecida con éxito"))
    .catch(err => console.log("error al intentar conectar con mongodb " + err))

module.exports = mongoose;