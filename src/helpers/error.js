'use strict';

class DomainError extends Error {
  constructor(code = 500, message = 'Internal Server Error') {
    super(message, code);
    this.code = code;
    this.message = message;
  }
}

export default DomainError;
