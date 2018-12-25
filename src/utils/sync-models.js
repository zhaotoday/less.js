require('../').$model.sync().then(() => {
  console.log('\nmodels synced.')
  process.exit()
})
