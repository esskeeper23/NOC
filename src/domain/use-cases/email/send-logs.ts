import { EmailService } from "../../../presentation/email/.email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";



interface SendLogsUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}


export class SendEmailLogs implements SendLogsUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}

    async execute( to: string | string[] ) {
        
        try {
            const sent = await this.emailService.sendEmailWithAttachment(to)
            if ( !sent ) {
                throw new Error('Email not sent');
            }

            const log = new LogEntity({
                message: 'Log email sent',
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog(log);

        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-logs.ts'
            })
            this.logRepository.saveLog(log);
        }
        return true
    }

}