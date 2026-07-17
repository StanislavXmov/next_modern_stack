import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  async getHealth() {
    await this.prismaService.$queryRaw`SELECT 1`;
    return { status: "ok", db: "connected" };
  }
}
