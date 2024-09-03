import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';

@Injectable()
export class UsersService {
  // Service is used to separate the business logic from the controller
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@gmail.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael@gmail.com',
      role: 'USER',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david@gmail.com',
      role: 'USER',
    },
    {
      id: 6,
      name: 'Sarah Anderson',
      email: 'sarah@gmail.com',
      role: 'USER',
    },
    {
      id: 7,
      name: 'Daniel Martinez',
      email: 'daniel@gmail.com',
      role: 'USER',
    },
    {
      id: 8,
      name: 'Olivia Taylor',
      email: 'olivia@gmail.com',
      role: 'USER',
    },
    {
      id: 9,
      name: 'James Brown',
      email: 'james@gmail.com',
      role: 'USER',
    },
    {
      id: 10,
      name: 'Sophia Clark',
      email: 'sophia@gmail.com',
      role: 'USER',
    },
  ];

  getAllUsers({
    page,
    limit,
    role,
  }: {
    page: number;
    limit: number;
    role?: string;
  }) {
    // It is accessing the users array from the class
    let users = this.users;
    if (role) {
      users = users.filter((user) => user.role === role);

      if (users.length === 0)
        throw new NotFoundException(`No users found with role: ${role}`);
    }
    return {
      data: users.slice((page - 1) * limit, page * limit),
      page,
      limit,
      total: users.length,
    };
  }

  getSingleUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return {
        data: user,
        message: 'User Found',
        success: true,
      };
    } else {
      throw new NotFoundException(`User with id ${id} not found`);
      //   return {
      //     message: 'User Not Found',
      //     success: false,
      //   };
    }
  }

  getActiveUsers() {
    return this.users.filter((user) => user.role === 'ADMIN');
  }

  createUser(user: CreateUserDTO) {
    this.users.push({
      id: this.users.length + 1,
      ...user,
    });
    return {
      message: 'User Created',
      success: true,
    };
  }

  updateUser(id: number, user: UpdateUserDTO) {
    const userIndex = this.users.findIndex(
      (existingUser) => existingUser.id === id,
    );
    if (userIndex >= 0) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...user,
      };
      return {
        message: 'User Updated',
        success: true,
      };
    } else {
      return {
        message: 'User Not Found',
        success: false,
      };
    }
  }

  deleteUser(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
      return {
        message: 'User Deleted',
        success: true,
      };
    } else {
      return {
        message: 'User Not Found',
        success: false,
      };
    }
  }
}
