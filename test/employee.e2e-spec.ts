import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeDto } from 'src/user/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from 'src/user/employee/dto/update-employee.dto';
import { Employee } from 'src/user/employee/entities/employee.entity';
import { EmployeeService } from 'src/user/employee/employee.service';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { createEmployeeMock } from 'src/user/employee/employee.mock';

describe('Employee (e2e)', () => {
  let app: INestApplication;
  let employeeService: EmployeeService;
  // TODO: see if route can come from Reflection
  const basePath = '/employee';
  let defaultEmployee: Employee;
  let defaultEmployeeClone;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    employeeService = app.get(EmployeeService);
  });

  beforeEach(async () => {
    defaultEmployee = await employeeService.create(createEmployeeMock);
    defaultEmployeeClone = {
      ...defaultEmployee,
      createdAt: defaultEmployee.createdAt.toISOString(),
      updatedAt: defaultEmployee.updatedAt.toISOString(),
    };
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return all employees (GET)', () => {
    return request(app.getHttpServer())
      .get(basePath)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual(
          expect.arrayContaining([defaultEmployeeClone])
        );
      });
  });

  it('should return employee with provided id (GET)', () => {
    return request(app.getHttpServer())
      .get(`${basePath}/${defaultEmployee.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual(defaultEmployeeClone);
      });
  });

  it('should return 404 if provided id is incorrect (GET)', () => {
    return request(app.getHttpServer())
      .get(`${basePath}/abc`)
      .expect(404)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('error');
      });
  });

  it('should create employee with provided data (POST)', async () => {
    const employeeTwo: CreateEmployeeDto = {
      ...createEmployeeMock,
      firstName: 'Employee Two',
    };
    const { body: employeeTwoResponse } = await request(app.getHttpServer())
      .post(`${basePath}/`)
      .send(employeeTwo)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual(expect.objectContaining(employeeTwo));
        expect(body).toHaveProperty('createdAt');
        expect(body).toHaveProperty('updatedAt');
      });

    const dbEmployeeTwo = await employeeService.findOne(employeeTwoResponse.id);
    return expect(dbEmployeeTwo).toEqual(expect.objectContaining(employeeTwo));
  });

  it('should update employee against an id with provided data (PATCH)', async () => {
    const employeeTwo: UpdateEmployeeDto = {
      firstName: 'Employee',
      lastName: 'Two',
    };
    await request(app.getHttpServer())
      .patch(`${basePath}/${defaultEmployee.id}`)
      .send(employeeTwo)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(expect.objectContaining(employeeTwo));
        expect(body).toHaveProperty('createdAt');
        expect(body).toHaveProperty('updatedAt');
        expect(new Date(body.updatedAt) > defaultEmployee.updatedAt).toBe(true);
      });

    const dbDefaultEmployee = await employeeService.findOne(defaultEmployee.id);

    return expect(dbDefaultEmployee).toEqual(expect.objectContaining(employeeTwo));
  });

  it('should delete employee against an id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`${basePath}/${defaultEmployee.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual(defaultEmployeeClone);
      });

    return expect(employeeService.findOne(defaultEmployee.id)).rejects.toThrow(
      'No Employee found'
    );
  });

  it('should return 200 when deleting employee that does not exist (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete(`${basePath}/abc`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual({});
      });
  });
});
