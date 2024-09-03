import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'app.log'),
        formattedEntry,
      );
    } catch (error: any) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(`[MyLoggerService] ${message}`, context);
  }

  error(message: any, trace: string) {
    const entry = `${trace}\t${message}`;
    this.logToFile(entry);
    super.error(`[MyLoggerService] ${message}`, trace);
  }

  warn(message: any) {
    const entry = `${message}`;
    super.warn(`[MyLoggerService] ${message}`);
  }
}
