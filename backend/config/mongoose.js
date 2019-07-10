const mongoose = require('mongoose');
const settings = require('./settings').MONGODB;
//conexión a la base de datos MongoDB CounterDB
const atlasBD = 'mongodb+srv://admin:admin@pelisdb-7xxb6.mongodb.net/test?retryWrites=true&w=majority';
const localBD = `mongodb://${settings.bbdd_url}:${settings.bbdd_port}/${settings.bbdd_name}`;
const url = process.env.NODE_ENV = 'production' ? atlasBD : localBD;
mongoose.connect(url, {
        useCreateIndex: true,
        useNewUrlParser: true,
    }).then(() => console.log('Conexión establecida con exito'))
    .catch(err => console.log('Error al intentar conectar con mongo atlas: ' + err));
// mongoose.connect(`mongodb://${settings.bbdd_url}:${settings.bbdd_port}/${settings.bbdd_name}`, {
//         useCreateIndex: true,
//         useNewUrlParser: true
//     })
//     .then(() => console.log("conexión establecida con éxito"))
//     .catch(err => console.log("error al intentar conectar con mongodb " + err))

module.exports = mongoose;