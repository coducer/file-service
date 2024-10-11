import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { AwsS3Config } from './aws.config';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService, AwsS3Config],
})
export class FileModule {}
