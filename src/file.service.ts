import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names
import { AwsS3Config } from './aws.config';
import { env } from './config/config';

@Injectable()
export class FileService {
  constructor(private readonly awsS3Config: AwsS3Config) {}

  async uploadFile(file: any): Promise<string> {
    const fileKey = `${uuidv4()}-${file.originalname}`; // Unique file name
    try {
      const data = await this.awsS3Config.getS3().putObject({
        Bucket: env.spaces_bucket,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      console.info(data);
      return fileKey;
    } catch (error) {
      throw new Error('Error uploading file to DigitalOcean Space');
    }
  }

  async getSignedUrl(key) {
    try {
      const response = await this.awsS3Config.getS3().getObject({
        Bucket: env.spaces_bucket,
        Key: key,
      });
      return response.Body as Readable;
    } catch (error) {
      console.info(error);
      if (error.Code === 'NoSuchKey') {
        throw new BadRequestException('Invalid filename');
      }
      throw new BadRequestException(
        `Error occur fetching url => ${error.message} `,
      );
    }
  }
}
