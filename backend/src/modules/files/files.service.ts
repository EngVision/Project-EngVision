import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import * as gravatar from 'gravatar';
import { Model } from 'mongoose';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { LocalFile, LocalFileDocument } from './schemas/local-file.schema';

@Injectable()
export class FilesService {
  private S3: S3Client;
  private readonly bucketName;

  constructor(
    @InjectModel(LocalFile.name)
    private readonly fileModel: Model<LocalFileDocument>,
  ) {
    this.S3 = new S3Client({
      region: 'auto',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.S3_BUCKET_NAME;
  }

  async create(
    file: Express.Multer.File,
    userId: string,
  ): Promise<LocalFileDocument> {
    const newFile = new this.fileModel({
      filename: `${uuid()}${extname(file.originalname)}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: this.getFileSize(file.size),
      userId,
    });
    newFile.url = `${process.env.S3_BUCKET_URL}/${newFile.id}`;
    await newFile.save();

    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: newFile.id,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.size,
      }),
    );

    return newFile;
  }

  async createWithUrl(url: string, userId: string): Promise<LocalFileDocument> {
    const newFile = new this.fileModel({
      url,
      userId,
    });
    await newFile.save();

    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: newFile.id,
      }),
    );

    return newFile;
  }

  async update(
    id: string,
    userId: string,
    file: Express.Multer.File,
  ): Promise<LocalFileDocument> {
    let updatedFile = await this.fileModel.findById(id);

    if (!updatedFile) {
      updatedFile = new this.fileModel({
        filename: `${uuid()}${extname(file.originalname)}`,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: this.getFileSize(file.size),
        userId,
      });
    }

    if (updatedFile.userId && updatedFile.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    if (updatedFile.path) {
      unlink(updatedFile.path, err => {
        if (err) throw new InternalServerErrorException(err);
      });
    }

    updatedFile.url = null;
    updatedFile.originalName = file.originalname;
    updatedFile.size = this.getFileSize(file.size);
    updatedFile.filename = file.filename;
    updatedFile.mimetype = file.mimetype;
    updatedFile.save();

    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: updatedFile.id,
        Body: file.buffer,
      }),
    );

    return updatedFile;
  }

  async get(id: string): Promise<LocalFile> {
    const file = await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  async remove(id: string, userId: string): Promise<void> {
    const file = await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userId && file.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.S3.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: file.id,
      }),
    );

    await file.deleteOne();

    if (file.path) {
      unlink(file.path, err => {
        if (err) throw new InternalServerErrorException(err);
      });
    }
  }

  async getDefaultAvatar(
    userId: string,
    email: string,
  ): Promise<LocalFileDocument> {
    const avatarUrl = gravatar.url(email, {
      protocol: 'https',
      s: '200',
      r: 'pg',
      d: 'identicon',
    });

    const newFile = await this.createWithUrl(avatarUrl, userId);

    return newFile;
  }

  getFileSize(size: number): string {
    if (!size) return '0';
    return size > 1048576
      ? `${(size / 1048576).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  }
}
