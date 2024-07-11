import * as R from 'ramda'
import express from 'express'
import signs from '@syncpoint/signs'
const { Symbol } = signs

const config = {
  port: 8891
}

const MODIFIERS = {
  aa: 'specialHeadquarters',
  ad: 'platformType',
  ae: 'equipmentTeardownTime',
  af: 'commonIdentifier',
  ah: 'headquartersElement',
  ao: 'engagementBar',
  ap: 'targetNumber',
  aq: 'guardedUnit',
  ar: 'specialDesignator',
  c: 'quantity', // also modifier R
  f: 'reinforcedReduced',
  j: 'evaluationRating',
  k: 'combatEffectiveness',
  g: 'staffComments',
  h: 'additionalInformation',
  m: 'higherFormation',
  n: 'hostile',
  p: 'iffSif',
  q: 'direction',
  r: 'quantity', // also modifier C
  t: 'uniqueDesignation',
  v: 'type',
  x: 'altitudeDepth',
  y: 'location',
  z: 'speed',
  w: 'dtg'
}


const symbolModifiers = properties => Object.entries(properties)
  .filter(([key, value]) => MODIFIERS[key] && value)
  .reduce((acc, [key, value]) => R.tap(acc => (acc[MODIFIERS[key]] = value), acc), {})

const handler = (request, response) => {
  try {
    const options = request.query ? request.query : {}
    const s = new Symbol(request.params.SIDC, symbolModifiers(options))
    if (!s || !s.asSVG) {
      const message = `Failed to create a symbol for SIDC ${request.params.SIDC}`
      console.error(message)
      response.status(500).json({
        message
      })
      return 
    }
    response.type('image/svg+xml').send(s.asSVG())
  } catch (error) {
    console.error(error)
    return response.sendStatus(500)
  }
}


const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(express.query())
  
app.get('/signs/:SIDC', handler)
  
app.listen(config.port, () => {
  console.log(`signs-server is ready on port ${config.port}`)
})
