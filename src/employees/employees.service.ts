import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    const employee = await this.databaseService.employee.create({
      data: createEmployeeDto,
    });
    if (employee) {
      return {
        message: 'Employee created successfully',
        data: employee,
        success: true,
      };
    } else {
      throw new HttpException('Employee not created', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll({ role }: { role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    const employees = await this.databaseService.employee.findMany({
      where: {
        role,
      },
    });

    if (employees) {
      return {
        message: 'Employees found',
        data: employees,
        success: true,
      };
    } else {
      throw new HttpException('No employees found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    const employee = await this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });

    if (employee) {
      return {
        message: 'Employee found',
        data: employee,
        success: true,
      };
    } else {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const updated_emp = await this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });

    if (updated_emp) {
      return {
        message: 'Employee updated successfully',
        data: updated_emp,
        success: true,
      };
    } else {
      throw new HttpException('Employee not updated', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    const deleted_emp = await this.databaseService.employee.delete({
      where: {
        id,
      },
    });

    if (deleted_emp) {
      return {
        message: 'Employee deleted successfully',
        success: true,
      };
    } else {
      throw new HttpException('Employee not deleted', HttpStatus.BAD_REQUEST);
    }
  }
}
