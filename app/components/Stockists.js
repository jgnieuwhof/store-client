
import React from 'react'

import GoogleMap from './GoogleMap'
import Page, { Section } from './Page'

const stockists = [
  {
    address: `Medulla & Co, 809 Queen St. West, Toronto ON, M6J 1G1`,
    lat: 43.6460774, lng: -79.411125,
    info: [`http://www.medullaco.com`, `Medulla & Co`],
  },
].map(x => ({
  ...x,
  info: <a href={x.info[0]} target='_blank'>{ x.info[1] }</a>,
}))

const Stockists = () => (
  <Page title="Stockists" center>
    { stockists.map(({ address }, i) => (
      <Section key={i}>{ address }</Section>
    ))}
    <GoogleMap
      defaultZoom={12}
      defaultCenter={stockists[0]}
      positions={stockists}
    />
  </Page>
)

export default Stockists
