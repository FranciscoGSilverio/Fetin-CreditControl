import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { UpdateFirebaseDto } from './dto/update-firebase.dto';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  create(@Body() updateFirebaseDto: UpdateFirebaseDto) {
    return this.firebaseService.reset(updateFirebaseDto);
  }
  @Get()
  find() {
    return this.firebaseService.get();
  }
}
