import 'multer';

declare module 'multer' {
  interface MulterError {
    reason: string;
  }
}
