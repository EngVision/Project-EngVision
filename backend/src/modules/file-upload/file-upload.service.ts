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
import { LocalFile, LocalFileDocument } from './schemas/local-file.schema';

@Injectable()
export class FileUploadService {
  private readonly BaseUrl = `${process.env.SERVER_URL}/file/`;

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
      url: this.BaseUrl + file.filename,
      mimetype: file.mimetype,
      user: userId,
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

    if (updatedFile.user !== userId) {
      throw new ForbiddenException('Access denied');
    }

    if (updatedFile.path) {
      unlink(updatedFile.path, err => {
        if (err) throw new InternalServerErrorException(err);
      });
    }

    updatedFile.filename = file.filename;
    updatedFile.path = file.path;
    updatedFile.url = this.BaseUrl + file.filename;
    updatedFile.mimetype = file.mimetype;
    updatedFile.save();

    return updatedFile;
  }

  async remove(id: string, userId: string): Promise<void> {
    const file = await this.fileModel.findById(id);

    if (!file) {
      throw new NotFoundException('File id not found');
    }

    if (file.user !== userId) {
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
      mimetype: 'defaultAvatar',
      url: avatarUrl,
      user: userId,
    });

    await newFile.save();

    return newFile;
  }
}
