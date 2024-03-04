import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

// Mock data for testing
const testRestaurant: CreateRestaurantDto = {
  name: 'John',
  email: 'john@example.com',
  address: '123 Main St',
  contact: '123-456-7890',
  openingTime: '08:00',
  closingTime: '22:00',
  status: 'open',
  wifiCode: 'password123',
  postalCode: '12345'
};

const updatedRestaurant: CreateRestaurantDto = {
  name: 'John',
  email: 'john@example.com',
  address: '123 Main St',
  contact: '123-456-7890',
  openingTime: '08:00',
  closingTime: '22:00',
  status: 'open',
  wifiCode: 'password123',
  postalCode: '12345'
};

describe('RestaurantService', () => {
  let service: RestaurantService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: PrismaService,
          useValue: {
            restaurant: {
              create: jest.fn().mockResolvedValue(testRestaurant),
              findMany: jest.fn().mockResolvedValue([testRestaurant]),
              findUnique: jest.fn().mockResolvedValue(testRestaurant),
              update: jest.fn().mockResolvedValue(updatedRestaurant),
              delete: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a restaurant', async () => {
    expect(await service.create(testRestaurant)).toEqual(testRestaurant);
    expect(prisma.restaurant.create).toHaveBeenCalledWith({
      data: testRestaurant,
    });
  });

  it('should find all categories', async () => {
    expect(await service.findAll()).toEqual([testRestaurant]);
    expect(prisma.restaurant.findMany).toHaveBeenCalled();
  });

  it('should find a restaurant by id', async () => {
    expect(await service.findOne(1)).toEqual(testRestaurant);
    expect(prisma.restaurant.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a restaurant', async () => {
    expect(await service.update(1, updatedRestaurant)).toEqual(updatedRestaurant);
    expect(prisma.restaurant.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedRestaurant,
    });
  });

  it('should delete a restaurant', async () => {
    await service.remove(1);
    expect(prisma.restaurant.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
