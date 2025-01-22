import fsp from 'fs/promises'
import { jsShell } from 'lazy-js-utils'
;(async () => {
  // build:js
  // eslint-disable-next-line no-console
  console.log('js building...')
  await jsShell('tsup ./src/index.ts --format cjs,esm --dts --clean --minify')
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
