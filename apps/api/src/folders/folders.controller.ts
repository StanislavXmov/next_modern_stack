import { Controller, Get } from "@nestjs/common";
import { FoldersService } from "./folders.service";

@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  async findAll() {
    const folders = await this.foldersService.findAll();
    return folders;
  }
}
