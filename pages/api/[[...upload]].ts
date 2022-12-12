// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Server } from '@tus/server'
import { FileStore } from '@tus/file-store'

const tusServer = new Server({
  path: '/api/upload',
  datastore: new FileStore({ directory: './files' }),
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return tusServer.handle(req, res)
}
