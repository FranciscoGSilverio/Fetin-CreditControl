import { Injectable } from '@nestjs/common';
import { database } from './firebase.config';
import { UpdateFirebaseDto } from './dto/update-firebase.dto';

@Injectable()
export class FirebaseService {
  async get(path?: string) {
    const ref = database.ref();
    const snapshot = await ref.once('value');
    return snapshot.val();
  }
  async reset(value: UpdateFirebaseDto, path?: string) {
    const ref = database.ref(path);
    await ref.set(value);
  }

  async update(path: string, value: any) {
    const ref = database.ref(path);
    await ref.update(value);
  }

  async delete(path: string) {
    const ref = database.ref(path);
    await ref.remove();
  }
}
