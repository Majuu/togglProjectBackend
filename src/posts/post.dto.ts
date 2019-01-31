import { IsString } from 'class-validator';

class CreatePostDto {
    // @IsString()
    // public author: string;
    //
    // @IsString()
    // public content: string;
    //
    // @IsString()
    // public title: string;

    @IsString()
    public projectName: string;

    @IsString()
    public projectTime: string;
    }

export default CreatePostDto;
