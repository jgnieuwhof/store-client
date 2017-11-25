
import React from 'react'

import Page, { Section } from './Page'

const faqs = [
  [`Do you do custom orders?`, `Yes, we love custom order requests. These will be pieces made one of a kind for you! Please visit our contact page and fill out all of the fields as this will help us get an idea of what you’re looking for. Leave any extra requests you have in the “comments” section and we will get back to you as soon as possible with some sketches and stone options.`],
  [`Can you resize rings?`, `Yes and no. I can normally size up a ring by about 1 US ring size. After that the band would just become too thin. I am not able to size a ring down as the stone has already been set in my ready made rings and the process of sizing down can damage the stone. If you’re unsure, just send me a quick inquiry and I can let you know if it’s possible for the ring you’re looking at!`],
  [`When will my order ship?`, `Our processing time for ready made jewelry is 1-4 business days. Please see our Shipping Information page for more info or contact us at info@rambleonsilver.com`],
  [`How do you care for silver jewelry?`, `Jewelry is fragile and should be handled with care. Excessive bending and moisture with damage a piece over time. In order to achieve a long lifespan for your jewelry please keep adjustments to a minimum and do not expose them to continuous moisture. Our pieces are all made using sterling silver and fine silver metals.`],
  [`Do you offer exchanges/refunds?`, `See our returns/exchanges page for the answers to all of these questions!`],
]

export default () => (
  <Page title="FAQ" center>
    { faqs.map((x, i) => (
      <Section key={i} title={`${i + 1}. ${x[0]}`}>
        { x[1] }
      </Section>
    ))}
    <Section>
      For any other inquiries not addressed in this FAQ,
      please email us at <a href='mailto:rambleonsilver@gmail.com'>rambleonsilver@gmail.com</a>
    </Section>
  </Page>
)
