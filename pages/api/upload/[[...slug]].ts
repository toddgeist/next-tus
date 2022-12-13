// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Server } from '@tus/server'
import { FileStore } from '@tus/file-store'

export const config = {
  api: {
    bodyParser: false,
  },
};

const tusServer = new Server({
  path: '/api/upload',
  datastore: new FileStore({ directory: './files' }),
})

// this route should catch /api/upload and /api/upload/*

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, method } = req
  console.log('method', method)
  return tusServer.handle(req, res)
}
