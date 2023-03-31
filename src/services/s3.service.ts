import { extname } from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { v4 } from "uuid";

import { configs } from "../config";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_ACCESS_KEY,
        secretAccessKey: configs.AWS_SECRET_KEY,
      },
    })
  ) {}

  public async uploadPhoto(
    file: UploadedFile,
    fileType: string,
    fileID: string
  ): Promise<string> {
    const filePath = this.buildPath(file.name, fileType, fileID);

    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: configs.AWS_S3_ACL,
      })
    );
    return filePath;
  }

  public async deleteAvatar(filePath: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_S3_BUCKET_NAME,
        Key: filePath,
      })
    );
  }

  private buildPath(
    fileName: string,
    fileType: string,
    fileID: string
  ): string {
    return `${fileType}/${fileID}/${v4()}${extname(fileName)}`;
  }
}

export const s3Service = new S3Service();
