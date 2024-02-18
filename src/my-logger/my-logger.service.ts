import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    // async logToFile(entry){
    //     const formattedEntry = `${Intl.DateTimeFormat('en-UK', {
    //         dateStyle: 'short',
    //         timeStyle: 'short',
    //         timeZone: 'Germany/Frankfurt',
    //     }).format(new Date())}\t${entry}\n`

    //     try{
    //         if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))){
    //             await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'))
    //         }
    //         await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'), formattedEntry)
    //     } catch (e) {
    //         if (e instanceof Error) console.error(e.message)
    //     }
    //     }
    // }    //removed because causes error

    log(message: any, context?: string) {
        const entry = `${context}\t${message}`; //this can be a text file that can be imported where needed

        //this.logToFile(entry);    //removed because causes error in 'log' and 'error'

        //we want to call a method that is going to record our entry into the text file 
        //we want this method to match ConsoleLogger
        super.log(message, context);
    }

    error(message: any, stackOrContext?: string) {   //copied exactly from what ConsoleLogger wants

        const entry = `${stackOrContext}\t${message}`;

        //this.logToFile(entry);  //removed because causes error

        super.error(message, stackOrContext);
    }

}
