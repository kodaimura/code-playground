import { 
    Controller,
    Get, 
} from '@nestjs/common';

import { Languages, FileExtensions } from './constants';


@Controller()
export class AppController {

    @Get('langs')
    getLangs(): string[] {
        return Languages;
    }

    @Get('file-extensions')
    getFileExtensions(): {[lang: string]: string} {
        return FileExtensions;
    }
}

