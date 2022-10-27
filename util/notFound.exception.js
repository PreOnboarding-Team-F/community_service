import { httpException } from './http.exception.js';

export class NotFoundException extends httpException {
  constructor(message) {
    super(404, message);
  }
}
