import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Please select file');
    }

    const fileKey = await this.fileService.uploadFile(file);
    return { fileKey };
  }

  @Get('download')
  async getSignedUrl(@Query() query: any, @Res() res: any) {
    try {
      if (!query.filename) {
        throw new BadRequestException(`Invalid filename`);
      }

      const stream = await this.fileService.getSignedUrl(query.filename);

      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${query.filename}"`,
      );
      res.setHeader('Content-Type', 'application/octet-stream');
      stream.pipe(res);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
