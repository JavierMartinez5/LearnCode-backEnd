import { IsDefined, IsNotEmpty } from 'class-validator';
import { UpdateChapterDto } from './update-chapter-dto';
import { UpdateSectionDto } from './update-section.dto';

export class UpdateBlockDto {
  @IsDefined()
    @IsNotEmpty()
    public section: UpdateSectionDto

    @IsDefined()
    public chapters: UpdateChapterDto[]
}
