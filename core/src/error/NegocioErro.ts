export class NegocioErro extends Error {
    constructor(message: string) {
      super(message);
  
      Object.setPrototypeOf(this, NegocioErro.prototype);
    }
}