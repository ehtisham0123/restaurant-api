import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust the path
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          // Mock PrismaService methods as needed for testing
          useValue: {
            // Mock PrismaService methods here if necessary
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a new employee', async () => {
      const newEmployee: CreateEmployeeDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: '123 Main St',
        salary: 50000,
        contact: '1234567890',
        emergencyContact: '0987654321',
        gender: 'Male',
        employmentStatus: 'Full-time',
        dateOfBirth: '1990-01-01',
        role: 'Employee',
        dateOfHire: '2024-01-01'
      };

      jest.spyOn(service, 'create').mockResolvedValue(newEmployee);

      const result = await controller.create(newEmployee);
      expect(result).toEqual(newEmployee);
    });
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      const employees: CreateEmployeeDto[] = [
        { firstName: 'John', lastName: 'Doe', email: 'john@example.com', address: '123 Main St', salary: 50000, contact: '123-456-7890', emergencyContact: '987-654-3210', gender: 'Male', employmentStatus: 'Full-time', dateOfBirth: '1990-01-01', role: 'Manager', dateOfHire: '2022-01-01' }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(employees);

      const result = await controller.findAll();
      expect(result).toEqual(employees); // Use toEqual instead of toBe
    });
  });
  describe('findOne', () => {
    it('should return the employee with the given ID', async () => {
      const employeeId = '1';
      const employee = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', address: '123 Main St', salary: 50000, contact: '123-456-7890', emergencyContact: '987-654-3210', gender: 'Male', employmentStatus: 'Full-time', dateOfBirth: '1990-01-01', role: 'Manager', dateOfHire: '2022-01-01' };
      jest.spyOn(service, 'findOne').mockResolvedValue(employee);

      const result = await controller.findOne(employeeId);
      expect(result).toBe(employee);
    });
  });

  describe('update', () => {
    it('should update the employee with the given ID', async () => {
      const employeeId = '1';
      const updateDto: UpdateEmployeeDto = { firstName: 'Jane' };
      const updatedEmployee = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', address: '123 Main St', salary: 50000, contact: '123-456-7890', emergencyContact: '987-654-3210', gender: 'Male', employmentStatus: 'Full-time', dateOfBirth: '1990-01-01', role: 'Manager', dateOfHire: '2022-01-01' };
      jest.spyOn(service, 'update').mockResolvedValue(updatedEmployee);

      const result = await controller.update(employeeId, updateDto);
      expect(result).toBe(updatedEmployee);
    });
  });

  describe('remove', () => {
    it('should remove the employee with the given ID', async () => {
      const employeeId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(); 

      const result = await controller.remove(employeeId);
      expect(result).toBeUndefined();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
