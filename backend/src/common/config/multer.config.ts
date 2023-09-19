import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { FileValidationErrors, SupportedFileType } from '../enums';

//The max file size (30MB)
const maxFileSize = 30 * 1000 * 1000;

export const multerOptions = (dest: string, fileType?: 'image' | 'audio') => ({
  // File size limits
  limits: {
    fileSize: maxFileSize,
  },

  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    let regex: RegExp;
    switch (fileType) {
      case 'image':
        regex = new RegExp(SupportedFileType.IMAGE);
        break;
      case 'audio':
        regex = new RegExp(SupportedFileType.AUDIO);
        break;
      default:
        regex = new RegExp(
          SupportedFileType.AUDIO + '|' + SupportedFileType.IMAGE,
        );
        break;
    }

    if (file.mimetype.match(regex)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      req.fileValidationError = FileValidationErrors.UNSUPPORTED_FILE_TYPE;
      req.unsupportedFileType = extname(file.originalname);
      cb(null, false);
    }
  },

  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = `${process.env.UPLOAD_LOCATION}/${dest}`;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },

    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
});
