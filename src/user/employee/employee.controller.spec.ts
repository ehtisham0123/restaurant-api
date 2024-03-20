import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { createEmployeeMock } from './employee.mock';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        EmployeeService,
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
      jest.spyOn(service, 'create').mockResolvedValue(createEmployeeMock);
      const result = await controller.create(createEmployeeMock);
      expect(result).toEqual(createEmployeeMock);
    });
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      const employees: CreateEmployeeDto[] = [
        createEmployeeMock
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(employees);

      const result = await controller.findAll();
      expect(result).toEqual(employees); // Use toEqual instead of toBe
    });
  });
  describe('findOne', () => {
    it('should return the employee with the given ID', async () => {
      const employeeId = '13213123-213213';
      jest.spyOn(service, 'findOne').mockResolvedValue(createEmployeeMock);

      const result = await controller.findOne(employeeId);
      expect(result).toBe(createEmployeeMock);
    });
  });

  describe('update', () => {
    it('should update the employee with the given ID', async () => {
      const employeeId = '1';
      const updateDto: UpdateEmployeeDto = { firstName: 'Jane' };
      jest.spyOn(service, 'update').mockResolvedValue(createEmployeeMock);

      const result = await controller.update(employeeId, updateDto);
      expect(result).toBe(createEmployeeMock);
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
