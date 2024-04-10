import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

// Mock data for testing
const testEmployee: CreateEmployeeDto = {
  firstName: 'Test',
  lastName: 'Employee',
  email: 'test@example.com',
  address: '123 Test St, Test City',
  salary: 50000,
  contact: '1234567',
  emergencyContact: '9876543',
  gender: 'Male',
  employmentStatus: 'Full-time',
  dateOfBirth: '1990-01-01',
  role: 'Employee',
  dateOfHire: '2022-01-01', 
};


const updatedEmployee: CreateEmployeeDto = {
  firstName: 'Test',
  lastName: 'Employee',
  email: 'test@example.com',
  address: '123 Test St, Test City',
  salary: 50000,
  contact: '1234567',
  emergencyContact: '9876543',
  gender: 'Male',
  employmentStatus: 'Full-time',
  dateOfBirth: '1990-01-01', // Assuming ISO 8601 date format
  role: 'Employee',
  dateOfHire: '2022-01-01', // Assuming ISO 8601 date format
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              create: jest.fn().mockResolvedValue(testEmployee),
              findMany: jest.fn().mockResolvedValue([testEmployee]),
              findUnique: jest.fn().mockResolvedValue(testEmployee),
              update: jest.fn().mockResolvedValue(updatedEmployee),
              delete: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a employee', async () => {
    expect(await service.create(testEmployee)).toEqual(testEmployee);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: testEmployee,
    });
  });

  it('should find all employees', async () => {
    expect(await service.findAll()).toEqual([testEmployee]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should find a employee by id', async () => {
    expect(await service.findOne(1)).toEqual(testEmployee);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update a employee', async () => {
    expect(await service.update(1, updatedEmployee)).toEqual(updatedEmployee);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedEmployee,
    });
  });

  it('should delete a employee', async () => {
    await service.remove(1);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
