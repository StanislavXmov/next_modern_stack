import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { NoteDto } from "./note.dto";
import { NotesService } from "./notes.service";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get(":id")
  @ApiOperation({ summary: "Get a note by ID", operationId: "getNoteById" })
  @ApiResponse({
    status: 200,
    description: "The note has been successfully retrieved.",
    type: NoteDto,
  })
  findOne(@Param("id") id: string) {
    return this.notesService.findOne(+id);
  }
}
