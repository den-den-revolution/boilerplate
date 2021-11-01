import { Injectable } from '@nestjs/common';
import * as readline from 'readline';
import { PassThrough } from 'stream';

@Injectable()
export default class DocumentValidatorService {
  private regEx = /@yahoo.com\s*$/;

  validate(file: NodeJS.ReadableStream): PassThrough {
    const pathThrough = new PassThrough();
    const readInterface = readline.createInterface({
      input: file,
      terminal: false,
    });

    readInterface.on('line', (line) => {
      if (!this.regEx.test(line)) {
        return;
      }

      readInterface.pause();

      pathThrough.write(line + '\n', () => {
        readInterface.resume();
      });
    });

    readInterface.on('close', () => {
      pathThrough.end();
    });

    return pathThrough;
  }
}
