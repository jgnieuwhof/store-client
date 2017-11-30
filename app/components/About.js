
import React from 'react'

import Page, { Section, Image } from './Page'
import about from '../img/content/about.jpg'

export default () => (
  <Page title="About" center>
    <Section>
      Ramble On Silver Co is a one woman show based out of Toronto, Ontario.
      Inspired by the sweet, sweet blues of the turquoise stone, Ramble On Silver is
      primarily centered around sterling silver and American turquoise pieces.
      All pieces are handcrafted using sterling silver and stones that
      have been personally selected.
    </Section>
    <Image src={about} />
  </Page>
)
