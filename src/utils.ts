import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const multerOptionsFile = {
  // Enable file size limits

  limits: {
    fileSize: 100000 * 1000 * 1000,
  },
  // Check the mimetypes to allow for upload

  fileFilter: (req: any, file: any, cb: any) => {
    if (file.originalname.includes('docx') || file.mimetype.match(/\/(pdf)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new BadRequestException(
          `Unsupported file type ${extname(file.originalname)}`,
        ),
        false,
      );
    }
  },
};
