import { IsUUID } from 'class-validator';

export class FindByIdDto {
  @IsUUID('4', { message: 'O id deve ser um UUID válido (v4).' })
  id: string;
}
