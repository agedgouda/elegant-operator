import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HellosignModule } from './hellosign/hellosign.module';

@Module({
  imports: [HellosignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
