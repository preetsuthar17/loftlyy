export const writeStderr = (message: string): void => {
  process.stderr.write(message.endsWith("\n") ? message : `${message}\n`)
}

export const writeStdout = (message: string): void => {
  process.stdout.write(message.endsWith("\n") ? message : `${message}\n`)
}
