NestJS provides built-in support for building RPC-style APIs using gRPC, a popular RPC framework. Here's a simple guide to implementing RPC in NestJS using gRPC:

1. **Install Dependencies:**
   ```bash
   npm install --save @nestjs/microservices grpc
   ```

2. **Create a gRPC Service:**
   Create a proto file (e.g., `src/proto/app.proto`) to define your service:

   ```proto
   syntax = "proto3";

   service MyService {
     rpc SayHello (HelloRequest) returns (HelloResponse);
   }

   message HelloRequest {
     string name = 1;
   }

   message HelloResponse {
     string message = 1;
   }
   ```

3. **Generate TypeScript Definitions:**
   Run the following command to generate TypeScript definitions from your proto file:

   ```bash
   npx grpc_tools_node_protoc --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts --grpc_out=src/generated --js_out=import_style=commonjs,binary:src/generated --ts_out=src/generated src/proto/*.proto
   ```

4. **Create a NestJS Module:**
   Create a module (e.g., `src/app.module.ts`) to configure the gRPC microservice:

   ```typescript
   import { Module } from '@nestjs/common';
   import { AppController } from './app.controller';
   import { AppService } from './app.service';
   import { ClientsModule, Transport } from '@nestjs/microservices';
   import { join } from 'path';

   @Module({
     imports: [
       ClientsModule.register([
         {
           name: 'MY_SERVICE',
           transport: Transport.GRPC,
           options: {
             url: 'localhost:5000',
             package: 'app',
             protoPath: join(__dirname, 'proto/app.proto'),
           },
         },
       ]),
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   ```

5. **Create a Controller and Service:**
   Create a controller (e.g., `src/app.controller.ts`) and a service (e.g., `src/app.service.ts`) to handle the gRPC requests:

   ```typescript
   // app.controller.ts
   import { Controller } from '@nestjs/common';
   import { GrpcMethod } from '@nestjs/microservices';
   import { AppService } from './app.service';

   @Controller()
   export class AppController {
     constructor(private readonly appService: AppService) {}

     @GrpcMethod('MyService', 'SayHello')
     sayHello(data: any): { message: string } {
       return this.appService.sayHello(data);
     }
   }
   ```

   ```typescript
   // app.service.ts
   import { Injectable } from '@nestjs/common';

   @Injectable()
   export class AppService {
     sayHello(data: { name: string }): { message: string } {
       return { message: `Hello, ${data.name}!` };
     }
   }
   ```

6. **Run the Application:**
   Update your `main.ts` file to bootstrap the NestJS application:

   ```typescript
   import { NestFactory } from '@nestjs/core';
   import { AppModule } from './app.module';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);
     await app.listen(3000);
   }

   bootstrap();
   ```

   Run your NestJS application:

   ```bash
   npm run start
   ```

Now, you have a basic NestJS application that implements an RPC-style service using gRPC. You can use tools like [BloomRPC](https://github.com/uw-labs/bloomrpc) to test your gRPC service.

Remember to adapt the code to your specific use case and extend the gRPC service as needed.