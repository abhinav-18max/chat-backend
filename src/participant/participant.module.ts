import { Global, Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ChatParticipant } from './entities/ChatParticipant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ChatParticipant])],
  providers: [ParticipantService],
  controllers: [ParticipantController],
  exports: [ParticipantService],
})
export class ParticipantModule {}
