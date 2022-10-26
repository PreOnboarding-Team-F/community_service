import { httpException } from './http.exception.js';

export class BadRequestException extends httpException {
  constructor(message) {
    super(400, message);
  }
}
