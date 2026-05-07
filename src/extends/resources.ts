import type Router from '@koa/router'
import type { ResourceController } from '../types'

const methods = ['get', 'post', 'put', 'del'] as const

/** Registers RESTful resource routes for a controller. */
export function resources(router: Router, path: string, controller: ResourceController) {
  methods.forEach((method) => {
    if (!controller[method])
      return

    router[method](method === 'post' ? path : `${path}/:id?`, async (ctx, next) => {
      if (controller.requiresAuth) {
        const verifyRes = await controller.verify?.(ctx)
        await controller[method](ctx, next, verifyRes)
      }
      else {
        await controller[method](ctx, next)
      }

      await next()
    })
  })
}
