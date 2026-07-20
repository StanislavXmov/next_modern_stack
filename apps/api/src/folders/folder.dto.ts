import { ApiProperty, ApiSchema } from "@nestjs/swagger";

@ApiSchema({ name: "Folder" })
export class FolderDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: "Work" })
  name: string;

  @ApiProperty({ example: null })
  parentId?: number | null;

  @ApiProperty({ example: null })
  parent?: FolderDto | null;

  @ApiProperty({ example: [] })
  children: FolderDto[];

  @ApiProperty({ example: "2024-01-01T00:00:00.000Z" })
  createdAt: string;
}
