import React, { useEffect, useState } from 'react'
import 'react-edit-text/dist/index.css'
import { CCardText, CContainer, CTextarea } from '@coreui/react'
import ReactMarkdown from 'react-markdown'

/* eslint-disable */
const Dashboard: React.FC<{}> = () => {
  const [value, setValue] = React.useState(
    `# {{name}}

**Version:** {{version}}

{{#with validFor}}This SLA is valid between **{{startDateTime as "DD/MM/YYYY"}}** and **{{endDateTime as "DD/MM/YYYY"}}**.{{/with}}

### Named Parties
{{#ulist relatedParty}}
{{href}}: {{role}} ({{name}}). {{#with validFor}}Valid since {{startDateTime as "DD/MM/YYYY"}} until {{endDateTime as "DD/MM/YYYY"}}.{{/with}}
{{/ulist}}

{{description}}

In the event of a conflict between the terms of this SLA and the terms of any other agreement with the named SLAProvider governing your use of the Service (the 'Agreement'), the terms and conditions of this SLA apply, but only to the extent of such conflict. Capitalized terms used herein but not defined herein shall have the meanings set forth in the Agreement.

## Service Commitment
The named SLAProvider will use commercially reasonable efforts to make the Service available with a Monthly Uptime Percentage, as described below, during any monthly billing cycle (the 'Service Commitment'). In the event a Service does not meet the Service Commitment, you will be eligible to receive a Service Credit as described below.

## Service Credits
Service Credits are calculated as a percentage of the total charges paid by you for the applicable Service for the billing cycle in which the Monthly Uptime Percentage fell within the ranges set forth in the table below.

For all requests not otherwise specified below:

{{#olist rule}}
{{id}} : {{metric}} - {{unit}} ({{referenceValue}}). Operator: {{operator}}, tolerance: {{tolerance}}, service credit percentage (%): {{consequence}}.
{{/olist}}

We will apply any Service Credits only against future payments otherwise due from you for the Service. At our discretion, we may issue the Service Credit 
to the credit card you used to pay for the billing cycle in which the Service did not meet the Service Commitment. Service Credits will not entitle you 
to any refund or other payment from the named SLAProvider. A Service Credit will be applicable and issued only if the credit amount for the applicable monthly billing cycle is greater than one dollar 
($1 USD). Service Credits may not be transferred or applied to any other account. Unless otherwise provided in the Order Agreement, your sole and 
exclusive remedy for any unavailability, non-performance, or other failure by us to provide the Service is the receipt of a Service Credit (if eligible) 
in accordance with the terms of this SLA.

## SLA Exclusions
The Service Commitment does not apply to any unavailability, suspension or termination of the Service, or any other Service performance issues: 
(i) caused by factors outside of our reasonable control, including any force majeure event or Internet access or related problems beyond the 
demarcation point of the Service; (ii) that result from any actions or inactions of you or any third party; (iii) that result from your equipment, 
software or other technology and/or third party equipment, software or other technology (other than third party equipment within our direct control); 
or (iv) arising from our suspension or termination of your right to use the Service in accordance with the Order Agreement (collectively, 
the "SLA Exclusions"). If availability is impacted by factors other than those used in our calculation of the Monthly Uptime Percentage, 
then we may issue a Service Credit considering such factors at our discretion.

## Definitions
- "Error Rate" means: (i) the total number of internal server errors returned by the Service as error status “InternalError” or 
“ServiceUnavailable” divided by (ii) the total number of requests for the applicable request type during that 5-minute interval.
 We will calculate the Error Rate for each 5-minute interval in the monthly billing cycle. The calculation of the number of internal 
 server errors will not include errors that arise directly or indirectly as a result of any of the SLA Exclusions.
- "Monthly Uptime Percentage" is calculated by subtracting from 100% the average of the Error Rates from each 5-minute 
interval in the monthly billing cycle. If you did not make any requests in a given 5-minute interval, that interval is 
assumed to have a 0% Error Rate.
- A "Service Credit" is a dollar credit, calculated as set forth above, that we may credit back to an eligible account.`
  )

  return (
    <CContainer style={{ marginBottom: '80px', paddingTop: '20px', paddingBottom: '20px' }}>
      <ReactMarkdown>{value}</ReactMarkdown>
    </CContainer>
  )
}

export default Dashboard
