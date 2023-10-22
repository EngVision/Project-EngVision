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
      mimetype: file.mimetype,
      userId,
    });
    await newFile.save();

    await this.S3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: newFile.id,
        Body: file.buffer,
      }),
    );

    return newFile;
  }

  async createWithUrl(url: string, userId): Promise<LocalFileDocument> {
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
        mimetype: file.mimetype,
        userId,
      });
    }

    if (updatedFile.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    if (updatedFile.path) {
      unlink(updatedFile.path, err => {
        if (err) throw new InternalServerErrorException(err);
      });
    }

    updatedFile.url = null;
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

  async get(id: string): Promise<LocalFile & { body: any }> {
    const file = await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    const s3File = await this.S3.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: file.id,
      }),
    );

    return {
      ...file.toObject(),
      body: s3File.Body,
    };
  }

  async remove(id: string, userId: string): Promise<void> {
    const file = await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userId !== userId) {
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
}
