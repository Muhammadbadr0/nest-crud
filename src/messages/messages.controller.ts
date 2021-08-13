import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messageService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDTO) {
    return this.messageService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.findOne(id);

    if (!message) throw new NotFoundException('Message Not Found');

    return message;
  }

  @Delete('/:id')
  @HttpCode(202)
  async deleteMessage(@Param('id') id: string) {
    this.messageService.delete(id);
  }
}
