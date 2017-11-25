
import React from 'react'

import Page, { Section } from './Page'

export default () => (
  <Page title="Shipping" className={`shipping-container`} center>
    <Section>
      Free shipping on orders over $200 within Canada and the United States.<br />
      Domestic Shipping (Canada and United States) - $12.00<br />
      International Shipping - Please email for quote.
    </Section>
    <Section title="Domestic Orders" center>
      For all domestic orders, we ship Canada Post Regular Mail.
      Our processing time ranges from 1-4 business days.
      All orders are insured for total value including shipping.
      If you would like an order expedited, please send us an email
      before placing an order to confirm.
    </Section>
    <Section title="International Orders" center>
      We ship almost everywhere! International customers are able to order from our website,
      but are liable for all import customs & duties. No, we will not adjust the declaration
      amount on your parcel. Don’t even ask! Please email us if placing an international order
      so that we can quote your shipping price. An invoice may be sent to you to cover extra
      shipping costs and will require payment before the order is mailed.
      Any overages will be payed back to you.
      All orders are insured for total value including shipping.
      We ship via Canada Post Tracked Packet International unless otherwise specified.
      We are not responsible for shipping delays once the product leaves Canada and
      can not track packages past the Canadian border.
    </Section>
    <Section title="Where is my order?" center>
      Sometimes sh*t happens and things get lost. There are a number of reasons why your
      package may be missing and unfortunately these incidents are not in our control and we
      will not be able to refund you your lost order. We will, however do everything we can
      to help you locate it! We want you wearing that bad a** ring as much as you do.
      If there is an issue, please contact us ASAP and we will do our best to help you
      locate your parcel.
    </Section>
  </Page>
)
