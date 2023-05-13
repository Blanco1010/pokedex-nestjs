import { IsString, IsInt, IsPositive, IsNotEmpty, Min } from 'class-validator';


export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;
    
    @IsString()
    @IsNotEmpty()
    name: string;

}
