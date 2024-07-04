import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path
import { createCategoryMock } from './category.mock';
import { Category } from './entities/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          // Mock PrismaService methods as needed for testing
          useValue: {
            // Mock PrismaService methods here if necessary
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories: Category[] = [createCategoryMock];
      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      const result = await controller.findAll();
      expect(result).toEqual(categories); // Use toEqual instead of toBe
    });
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
