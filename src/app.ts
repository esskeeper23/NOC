import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";




( async () => {
    main(); 
})();



async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONDO_DB_NAME
    })

    //Crear una coleccion, documento 
    // const newLog = await logModel.create({
    //     message: 'Test message Mongo',
    //     origin: 'app.s',
    //     level: 'low'
    // });
    // await newLog.save();

    // console.log(newLog)

    Server.start();
}