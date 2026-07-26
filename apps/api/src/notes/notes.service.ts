import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(id: number) {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }
}
