const mongoose = require('mongoose');

//connection
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connect = async () => {
    try {
        const dbConnect = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.uf18h.mongodb.net/`);
        console.log('Conexão no banco estabelecida!');
        
        return dbConnect;        
    } catch (error) {
        console.log(error);        
    }
};

connect();

module.exports = connect;