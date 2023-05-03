import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('NOTIFY_SERVICE') private readonly client: ClientProxy) {}
  async getHello(): Promise<string> {
    const receive = await lastValueFrom(
      this.client.send<number>('notify', {
        user: 'Ankit Kumar',
        data: { a: 1, b: 2 },
      }),
    );
    return '\t add 1+2=' + receive;
  }
}
