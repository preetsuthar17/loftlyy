export const EXIT_CODE = {
  ARGUMENT_ERROR: 2,
  DATA_FAILURE: 1,
  RUNTIME_ERROR: 3,
} as const

export class CliError extends Error {
  readonly exitCode: number

  constructor(message: string, exitCode: number) {
    super(message)
    this.name = "CliError"
    this.exitCode = exitCode
  }
}
