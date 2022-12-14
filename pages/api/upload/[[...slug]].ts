// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Server, Upload } from '@tus/server'
import { FileStore } from '@tus/file-store'
import { IncomingMessage, ServerResponse } from 'http';
import { rename } from "fs/promises"
import { join } from "path"

/**
 * this file will declare a route handler for /api/upload and /api/upload/*
 */



/**
 * this tells next to not parse the body
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 * this is required for tus to work
 */
export const config = {
  api: {
    bodyParser: false,
  },
};


/**
 * here we confige the tus server
 */
const tusServer = new Server({

  //when the upload is finished we rename the file
  async onUploadFinish(req: IncomingMessage, res: ServerResponse, upload: Upload) {
    const parsed = decodeMetaData(upload?.metadata || '')
    const oldPath = join('./files', upload?.id)
    const newPath = join('./files', upload?.id + "_" + parsed.filename)
    await rename(oldPath, newPath)
    return res
  },
  // this needs to match the route declared by the next file router 
  // ie /api/upload
  path: '/api/upload',

  // this will store the files in the ./files directory
  datastore: new FileStore({ directory: './files', }),
})


// this is the route handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return tusServer.handle(req, res)
}

/**
 * parses the meta data string from tus upload
 * @param metadata the metadata string from the tus upload 
 * @returns <Record<string, string>> the metadata as an object
 */
function decodeMetaData(metadata: string) {
  const arr = metadata.split(',')
  const obj: Record<string, string> = {}
  arr.forEach((item) => {
    const [key, value] = item.split(' ')
    let buff = Buffer.from(value, 'base64')
    let text = buff.toString('ascii');
    obj[key] = text
  })
  return obj

}

