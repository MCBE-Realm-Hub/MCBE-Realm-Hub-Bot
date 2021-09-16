import chalk from 'chalk'
import moment from 'moment'

export class Logger {
  success(...content: unknown[]): void {
    console.log(`${chalk.gray(`[${moment().format('HH:mm:ss')}]`)} ${chalk.green('[Success]')}`, ...content);
  }
  info(...content: unknown[]): void {
    console.log(`${chalk.gray(`[${moment().format('HH:mm:ss')}]`)} ${chalk.cyan('[Info]')}`, ...content);
  }
  warn(...content: unknown[]): void {
    console.log(`${chalk.gray(`[${moment().format('HH:mm:ss')}]`)} ${chalk.yellow('[Success]')}`, ...content);
  }
  error(...content: unknown[]): void {
    console.log(`${chalk.gray(`[${moment().format('HH:mm:ss')}]`)} ${chalk.red('[Error]')}`, ...content);
  }
}
