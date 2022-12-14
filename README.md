# Example Tus Server running with Next.js

This example shows how [Tus Server](https://github.com/tus/tus-node-server) can be connected up to a [Next.js api routes](https://nextjs.org/docs/api-routes/introduction).

To run a test script located in the scripts folder

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Uppy Dashboard and upload widget.

You can also run

`yarn test-upload`  
or  
`npm run test-upload`

to run a test upload scripts

uploaded files will be put into the ./files directory

### How to

look at the api route `api/upload/[[...file]].ts`

look at `./scripts/test-upoad.js` for an example with the tus javascript client

look at `pages/index.ts` for an examplke with Uppy.