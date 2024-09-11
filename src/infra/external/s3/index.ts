import {
  PutObjectCommandInput,
  PutObjectAclCommand,
  S3,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type UploadFileInput = Omit<PutObjectCommandInput, 'Bucket'> & { Key: string };

export class FileService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      endpoint: `https://${process.env.S3_ENDPOINT}`,
      credentials: {
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
      },
      region: process.env.S3_ENDPOINT.split('.')[2],
    });
  }

  async uploadFile({ Key, Body }: UploadFileInput) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key,
      Body,
      ACL: 'private',
    } as const;

    await this.s3.send(new PutObjectAclCommand(params));

    return `https://${process.env.S3_BUCKET}.${
      process.env.S3_ENDPOINT
    }/${encodeURI(Key)}`;
  }

  async getFile(key: string) {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    });

    return getSignedUrl(this.s3, getObjectCommand, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  }

  async deleteFile(Key: string) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key,
    };

    await this.s3.send(new DeleteObjectCommand(params));
  }
}
