import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        RestaurantService,
        {
          provide: PrismaService,
          // Mock PrismaService methods as needed for testing
          useValue: {
            // Mock PrismaService methods here if necessary
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new restaurant', async () => {
      const newRestaurant: CreateRestaurantDto = {
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

      jest.spyOn(service, 'create').mockResolvedValue(newRestaurant);

      const result = await controller.create(newRestaurant);
      expect(result).toEqual(newRestaurant);
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      const restaurants: CreateRestaurantDto[] = [
        {
          name: "Burger",
          email: 'john@example.com',
          address: '123 Main St',
          contact: '123-456-7890',
          openingTime: '08:00',
          closingTime: '22:00',
          status: 'open',
          wifiCode: 'password123',
          postalCode: '12345'
        }];
      jest.spyOn(service, 'findAll').mockResolvedValue(restaurants);

      const result = await controller.findAll();
      expect(result).toEqual(restaurants); // Use toEqual instead of toBe
    });
  });
  describe('findOne', () => {
    it('should return the restaurant with the given ID', async () => {
      const restaurantId = '1';
      const restaurant = {
        name: "Burger",
        email: 'john@example.com',
        address: '123 Main St',
        contact: '123-456-7890',
        openingTime: '08:00',
        closingTime: '22:00',
        status: 'open',
        wifiCode: 'password123',
        postalCode: '12345'
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(restaurant);

      const result = await controller.findOne(restaurantId);
      expect(result).toBe(restaurant);
    });
  });

  describe('update', () => {
    it('should update the restaurant with the given ID', async () => {
      const restaurantId = '1';
      const updateDto: UpdateRestaurantDto = { name: 'Jane' };
      const updatedRestaurant = {
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
      jest.spyOn(service, 'update').mockResolvedValue(updatedRestaurant);

      const result = await controller.update(restaurantId, updateDto);
      expect(result).toBe(updatedRestaurant);
    });
  });

  describe('remove', () => {
    it('should remove the restaurant with the given ID', async () => {
      const restaurantId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue();

      const result = await controller.remove(restaurantId);
      expect(result).toBeUndefined();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
