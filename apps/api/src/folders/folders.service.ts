import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FoldersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const folders = await this.prisma.folder.findMany();
    return folders;
  }
}
