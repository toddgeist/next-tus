import type { NextPage } from 'next'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'


const uppy = new Uppy({
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
  debug: true,
})

uppy.use(Tus, { endpoint: '/api/upload' })

uppy.on('complete', (result) => {
  const url = result.successful[0].uploadURL
  console.log('file uploaded ' + url)
})



const Home: NextPage = () => {

  return (
    <Dashboard
      uppy={uppy}
    />
  )
}

export default Home
