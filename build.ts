import fsp from 'fs/promises'
import { spawn } from 'node:child_process'

function runShell(command: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, { shell: true, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0)
        resolve()
      else
        reject(new Error(`Command failed (${code ?? 'unknown'}): ${command}`))
    })
  })
}
void (async () => {
  // build:js
  // eslint-disable-next-line no-console
  console.log('js building...')
  await runShell('tsup ./src/index.ts --format cjs,esm --dts --clean')
  // eslint-disable-next-line no-console
  console.log('js build success')
  // eslint-disable-next-line no-console
  console.log('css building...')
  const css = await fsp.readFile('./src/index.css', 'utf-8')
  await fsp.writeFile(
    './dist/index.css',
    css.replace(/\n/g, '').replace(/\s+/g, ' '),
  )
  // eslint-disable-next-line no-console
  console.log('css build success')
})()
