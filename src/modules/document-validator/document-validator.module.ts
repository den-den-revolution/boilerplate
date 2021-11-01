import { Module } from '@nestjs/common';
import DocumentValidatorService from './document-validator.service';
import DocumentValidatorController from './document-validator.controller';

@Module({
  providers: [DocumentValidatorService],
  controllers: [DocumentValidatorController],
})
export class DocumentValidatorModule {}
