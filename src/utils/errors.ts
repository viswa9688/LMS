export class ApiError extends Error {
  constructor(
    message: string,
    public originalError?: Error,
    public validationErrors?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends Error {
  constructor(public errors: Record<string, string>) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}