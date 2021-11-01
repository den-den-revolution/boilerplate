import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import DocumentValidatorService from './document-validator.service';
import { Readable } from 'stream';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt.guard';

@Controller('documents')
@ApiTags('document-validator')
export default class DocumentValidatorController {
  constructor(private readonly service: DocumentValidatorService) {}

  @Post('validate')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload file with list of emails',
    description:
      'upload file with *.txt extension, provide list of emails, line separated',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    const pathTroughStream = this.service.validate(Readable.from(file.buffer));
    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="result.txt"',
    });
    return pathTroughStream.pipe(res);
  }
}
