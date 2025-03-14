import { logModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await logModel.create(log);
        console.log('mongo log created', newLog.id)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const logs = await logModel.find({
            level: severityLevel
        })

        return logs.map(LogEntity.fromObject);

    }

}