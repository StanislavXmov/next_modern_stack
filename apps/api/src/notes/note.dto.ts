import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: "Note" })
export class NoteDto {
  @ApiProperty({ description: "The unique identifier of the note" })
  id: number;

  @ApiProperty({ description: "The text content of the note" })
  text: string;

  @ApiProperty({ description: "The ID of the folder this note belongs to" })
  folderId: number;

  @ApiProperty({ description: "The date and time when the note was created" })
  createdAt: Date;
}
