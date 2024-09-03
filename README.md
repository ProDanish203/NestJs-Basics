# NestJs
## Getting Started

### Installation
```
# Install Nestjs
npm i -g @nestjs/cli

# Create a new project
nest new [project_name]

# Run the project
npm run start:dev

# Create Modules
nest g module [module_name]

# Create controller
nest g controller [controller_name]

# Create service
nest g service [service_name]

nest g resource [resource_name]
```

## Key Things
- **Modules** - Organize application structure, Encapsulate related functionality, Define boundaries between different parts of the app 
- **Controllers** - Define routes and HTTP methods, Process input and return responses 
- **Service** - Contain business logic, Perform data operations, Can be injected into controllers and other services
- **Providers** - Generic term for injectable dependencies, Services, repositories, factories, helpers, etc.
- **Pipes** - Transform or validate input data, Can be used for parsing, type conversion, or data validation
- **Decorators** - Attach metadata to classes, methods, or properties, Used for routing, dependency injection, etc.
- **Middleware** - Functions that have access to request and response objects, Can modify them or terminate the request-response cycle
- **Guards** - Determine if a request should be handled by the route handler, Often used for authentication and authorization
- **Interceptors** - Add extra logic before/after method execution, Transform the result returned from a method