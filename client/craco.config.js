// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const CracoAlias = require('craco-alias')

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json'
      }
    }
  ]
}
