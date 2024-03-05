import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: PrismaService,
          // Mock PrismaService methods as needed for testing
          useValue: {
            // Mock PrismaService methods here if necessary
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
        contact: '1234567890',
        gender: 'Male',
        dateOfBirth: '1990-01-01',
        role: 'User',
      };

      jest.spyOn(service, 'create').mockResolvedValue(newUser);

      const result = await controller.create(newUser);
      expect(result).toEqual(newUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users: CreateUserDto[] = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', address: '123 Main St', contact: '123-456-7890', gender: 'Male', dateOfBirth: '1990-01-01', role: 'Manager' }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users); // Use toEqual instead of toBe
    });
  });
  describe('findOne', () => {
    it('should return the user with the given ID', async () => {
      const userId = '1';
      const user = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', address: '123 Main St', contact: '123-456-7890', gender: 'Male', dateOfBirth: '1990-01-01', role: 'Manager' };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(userId);
      expect(result).toBe(user);
    });
  });

  describe('update', () => {
    it('should update the user with the given ID', async () => {
      const userId = '1';
      const updateDto: UpdateUserDto = { firstName: 'Jane' };
      const updatedUser = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', address: '123 Main St', contact: '123-456-7890', gender: 'Male', dateOfBirth: '1990-01-01', role: 'Manager' };
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update(userId, updateDto);
      expect(result).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove the user with the given ID', async () => {
      const userId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue();

      const result = await controller.remove(userId);
      expect(result).toBeUndefined();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
