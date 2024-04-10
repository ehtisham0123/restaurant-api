import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

// Mock data for testing
const testCategory: CreateCategoryDto = {
  name: 'Test Category',
};

const updatedCategory: CreateCategoryDto = {
  name: 'Updated Category',
};

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              create: jest.fn().mockResolvedValue(testCategory),
              findMany: jest.fn().mockResolvedValue([testCategory]),
              findUnique: jest.fn().mockResolvedValue(testCategory),
              update: jest.fn().mockResolvedValue(updatedCategory),
              delete: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    expect(await service.create(testCategory)).toEqual(testCategory);
    expect(prisma.category.create).toHaveBeenCalledWith({
      data: testCategory,
    });
  });

  it('should find all categories', async () => {
    expect(await service.findAll()).toEqual([testCategory]);
    expect(prisma.category.findMany).toHaveBeenCalled();
  });

  it('should find a category by id', async () => {
    expect(await service.findOne(1)).toEqual(testCategory);
    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a category', async () => {
    expect(await service.update(1, updatedCategory)).toEqual(updatedCategory);
    expect(prisma.category.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedCategory,
    });
  });

  it('should delete a category', async () => {
    await service.remove(1);
    expect(prisma.category.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
