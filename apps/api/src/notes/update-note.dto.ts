import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: "UpdateNote" })
export class UpdateNoteDto {
  @ApiProperty({ description: "The updated text content of the note" })
  text: string;
}
