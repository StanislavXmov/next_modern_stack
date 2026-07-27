import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateNoteDto } from "./create-note.dto";
import { NoteDto } from "./note.dto";
import { NotesService } from "./notes.service";
import { UpdateNoteDto } from "./update-note.dto";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: "Create a note", operationId: "createNote" })
  @ApiResponse({
    status: 201,
    description: "The note has been successfully created.",
    type: NoteDto,
  })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto.text, createNoteDto.folderId);
  }

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

  @Patch(":id")
  @ApiOperation({ summary: "Update a note", operationId: "updateNote" })
  @ApiResponse({
    status: 200,
    description: "The note has been successfully updated.",
    type: NoteDto,
  })
  update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto.text);
  }
}
