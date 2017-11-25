
import React from 'react'

import Page, { Section, Image } from './Page'
import about from '../img/content/about.jpg'

export default () => (
  <Page title="About" center>
    <Section>
      Ramble On Silver Co is a one woman show based out of Toronto, Ontario.
      Inspired by those sweet, sweet blues of turquoise, Ramble On Silver is
      primarily centered around sterling silver and American Turquoise pieces.
      All pieces are handcrafted using stones that have been personally selected and sterling silver
    </Section>
    <Image src={about} />
  </Page>
)
