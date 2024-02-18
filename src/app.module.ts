import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,  //time to live: 1 minute
      limit: 3, //only 3 requests in 1 minute, which is very low.
    },
    {
      name: 'long',
      ttl: 60000,  //time to live: 1 minute
      limit: 100, //only 3 requests in 1 minute, which is very low.
    }
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard, //this should apply the ThrottlerModule, rate limiting our entire application.
    //We will see how we can override this on a pre-module basic or a pre-route basis
  }],
})
export class AppModule { }
