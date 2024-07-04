import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

// Mock data for testing
const testUser: CreateUserDto = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  address: '123 Test St, Test City',
  contact: '1234567',
  gender: 'Male',
  dateOfBirth: '1990-01-01',
  role: 'Owner',
};


const updatedUser: CreateUserDto = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  address: '123 Test St, Test City',
  contact: '1234567',
  gender: 'Male',
  dateOfBirth: '1990-01-01',
  role: 'Owner',
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              create: jest.fn().mockResolvedValue(testUser),
              findMany: jest.fn().mockResolvedValue([testUser]),
              findUnique: jest.fn().mockResolvedValue(testUser),
              update: jest.fn().mockResolvedValue(updatedUser),
              delete: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a employee', async () => {
    expect(await service.create(testUser)).toEqual(testUser);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: testUser,
    });
  });

  it('should find all categories', async () => {
    expect(await service.findAll()).toEqual([testUser]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should find a employee by id', async () => {
    expect(await service.findOne(1)).toEqual(testUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a employee', async () => {
    expect(await service.update(1, updatedUser)).toEqual(updatedUser);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedUser,
    });
  });

  it('should delete a employee', async () => {
    await service.remove(1);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
