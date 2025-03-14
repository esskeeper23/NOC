import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PosgresLogDatasource } from "../infrastructure/datasources/prostres-logs.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/.email.service';


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PosgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log("Server started...");


        //todo: Mandar email

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['rene2.martinez@outlook.com', 'drafer_90@hotmail.com']
        // )
        // emailService.sendEmailWithAttachment(
        //     ['rene2.martinez@outlook.com', 'drafer_90@hotmail.com']
        // )
        
        // const logs = await logRepository.getLogs(LogSeverityLevel.high)
        // console.log(logs)


        //? CheckService
        CronService.createJob(
            '*/4 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok!`),
                    ( error ) => console.log(error)
                ).execute(url);
            }
        );

    }

}