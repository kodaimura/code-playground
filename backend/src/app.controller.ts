import { 
    Controller,
    Get, 
} from '@nestjs/common';
import { AppService } from './app.service';

import {LangAndVersions, FileExtensions} from './constants';


@Controller()
export class AppController {

    @Get('langs')
    getLangs(): {[lang: string]: string[]} {
        return LangAndVersions;
    }

    @Get('file-extensions')
    getFileExtensions(): {[lang: string]: string} {
        return FileExtensions;
    }
}

