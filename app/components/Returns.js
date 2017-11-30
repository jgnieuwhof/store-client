
import React from 'react'

import Page, { Section } from './Page'

export default () => (
  <Page title="Returns" center>
    <Section>
      Please review all photos, details and measurements before purchasing.
      Orders cannot be cancelled once the item has been marked “shipped”.
      We will review jewelry considered defective on a case-by-case basis.
      Any issue with your products must be addressed within 14 days of your package delivery.
    </Section>
    <Section>
      We offer returns/exchanges on pre-made products. This does not apply to custom orders.
      All we ask is that you cover the shipping costs (tracking is mandatory!) to both
      return the item and have the new one sent back to you.
    </Section>
    <Section>
      If you have any questions, do not hesitate to email us
      at <a href='mailto:rambleonsilver@gmail.com'>rambleonsilver@gmail.com</a>
    </Section>
  </Page>
)
