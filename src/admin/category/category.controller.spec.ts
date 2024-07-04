import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
  describe('create', () => {
    it('should create a new category', async () => {
      const newCategory: CreateCategoryDto = {
        name: 'John'
      };

      jest.spyOn(service, 'create').mockResolvedValue(newCategory);

      const result = await controller.create(newCategory);
      expect(result).toEqual(newCategory);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories: CreateCategoryDto[] = [
        { name: "Burger" }];
      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      const result = await controller.findAll();
      expect(result).toEqual(categories); // Use toEqual instead of toBe
    });
  });
  describe('findOne', () => {
    it('should return the category with the given ID', async () => {
      const categoryId = '1';
      const category = { name: "Burger" };
      jest.spyOn(service, 'findOne').mockResolvedValue(category);

      const result = await controller.findOne(categoryId);
      expect(result).toBe(category);
    });
  });

  describe('update', () => {
    it('should update the category with the given ID', async () => {
      const categoryId = '1';
      const updateDto: UpdateCategoryDto = { name: 'Jane' };
      const updatedCategory = { name: 'John' };
      jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);

      const result = await controller.update(categoryId, updateDto);
      expect(result).toBe(updatedCategory);
    });
  });

  describe('remove', () => {
    it('should remove the category with the given ID', async () => {
      const categoryId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue();

      const result = await controller.remove(categoryId);
      expect(result).toBeUndefined();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
