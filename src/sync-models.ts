#!/usr/bin/env node
import { createApp } from './index'

const app = await createApp()

if (!app.$model)
  throw new Error('Cannot sync models because app.$config.DB is not configured.')

await app.$model.sync()
console.log('\nmodels synced.')
