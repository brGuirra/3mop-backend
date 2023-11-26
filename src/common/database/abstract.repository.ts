import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery, mongo } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly UNIQUE_VIOLATION_CODE = 11000;

  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, 'id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    try {
      return await createdDocument.save();
    } catch (error) {
      this.handleUniqueViolationError(error);
    }
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery);

    this.checkDocumentExistence(document);

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    data: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    try {
      const document = await this.model.findOneAndUpdate(filterQuery, data, {
        new: true,
      });

      this.checkDocumentExistence(document);

      return document;
    } catch (error) {
      this.handleUniqueViolationError(error);
    }
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndDelete(filterQuery);

    this.checkDocumentExistence(document);

    return document;
  }

  private checkDocumentExistence(document: TDocument) {
    if (!document) {
      throw new NotFoundException('document not found');
    }
  }

  private handleUniqueViolationError(error: unknown) {
    if (
      error instanceof mongo.MongoServerError &&
      error?.code === this.UNIQUE_VIOLATION_CODE
    ) {
      const keyValue = Object.keys(error?.keyValue)[0];

      throw new ConflictException(`${keyValue} already in use`);
    }

    throw error;
  }
}
