import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {  //method that actually returns 'Hello World' in controller
    return 'Hello World!';
  }
}
