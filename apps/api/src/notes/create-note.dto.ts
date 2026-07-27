import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: "CreateNote" })
export class CreateNoteDto {
  @ApiProperty({ description: "The text content of the note" })
  text: string;

  @ApiProperty({ description: "The ID of the folder this note belongs to" })
  folderId: number;
}
