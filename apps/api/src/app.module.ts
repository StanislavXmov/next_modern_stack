import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FoldersModule } from "./folders/folders.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, FoldersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
