import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocalFile, LocalFileDocument } from './schemas/local-file.schema';
import { Model } from 'mongoose';
import { unlink } from 'fs';
import * as gravatar from 'gravatar';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(LocalFile.name)
    private readonly fileModel: Model<LocalFileDocument>,
  ) {}

  async create(
    file: Express.Multer.File,
    userId: string,
  ): Promise<LocalFileDocument> {
    const newFile = new this.fileModel({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      userId,
    });
    await newFile.save();

    return newFile;
  }

  async createWithUrl(url: string, userId): Promise<LocalFileDocument> {
    const newFile = new this.fileModel({
      url,
      userId,
    });
    await newFile.save();

    return newFile;
  }

  async update(
    id: string,
    userId: string,
    file: Express.Multer.File,
  ): Promise<LocalFileDocument> {
    const updatedFile = await this.fileModel.findById(id);

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
    updatedFile.path = file.path;
    updatedFile.mimetype = file.mimetype;
    updatedFile.save();

    return updatedFile;
  }

  async get(id: string): Promise<LocalFileDocument> {
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

    if (file.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await file.deleteOne();

    unlink(file.path, err => {
      if (err) throw new InternalServerErrorException(err);
    });
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

    const newFile = new this.fileModel({
      url: avatarUrl,
      userId,
    });

    await newFile.save();

    return newFile;
  }
}
