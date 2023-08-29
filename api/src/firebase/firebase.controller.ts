import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { CreateFirebaseDto } from './dto/create-firebase.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  create(@Body() createFirebaseDto: CreateFirebaseDto) {
    return this.firebaseService.set(createFirebaseDto);
  }
  @Get()
  find() {
    return this.firebaseService.get();
  }
}
