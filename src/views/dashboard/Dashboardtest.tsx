import React, { useState } from 'react'
import EditSLA from 'views/lpts/edit'
import { EditText, EditTextarea } from 'react-edit-text'
import 'react-edit-text/dist/index.css'
import { CCardText, CContainer, CTextarea } from '@coreui/react'

const Dashboard: React.FC<{}> = () => {
  const [name, setName] = useState('')
  const [version, setVersion] = useState('')
  const [validFor, setValidFor] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [relatedPartyList, setRelatedPartyList] = useState([])
  const [relatedPartyHref, setRelatedPartyHref] = useState('')
  const [relatedPartyRole, setRelatedPartyRole] = useState('')
  const [relatedPartyEndTime, setRelatedPartyEndTime] = useState('')
  const [relatedPartyName, setRelatedPartyName] = useState('')
  const [relatedPartyStartTime, setRelatedPartyStartTime] = useState('')
  const [description, setDescription] = useState('')
  const [ruleList, setRuleList] = useState([])
  const [ruleId, setRuleId] = useState('')
  const [ruleMetric, setRuleMetric] = useState('')
  const [ruleUnit, setRuleUnit] = useState('')
  const [ruleReferenceValue, setRuleReferenceValue] = useState('')
  const [ruleOperator, setRuleOperator] = useState('')
  const [ruleTolerance, setRuleTolerance] = useState('')
  const [rulePercentage, setRulePercentage] = useState('')
  const [ruleConsequence, setRuleConsequence] = useState('')

  /* eslint-disable */
  return (
    <CContainer style={{ marginBottom: '80px', paddingTop: '20px', paddingBottom: '20px' }}>
      <>
        <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <EditText
            name="name"
            style={{ width: 'auto', fontSize: '2rem' }}
            defaultValue={name}
            onChange={setName}
            placeholder="Name"
          />
        </div>
        <div className={'py-2 d-flex'}>
          <h4>Version: </h4>
          <EditText
            name="version"
            style={{ width: '200px', marginLeft: '4px' }}
            defaultValue={version}
            inline
            onChange={setVersion}
            placeholder="version"
          />
        </div>

        <div className={'py-2 d-flex align-items-start'}>
          <h4>This SLA is valid between: </h4>

          <EditText
            name="startTime"
            type="date"
            style={{ width: 'auto', height: 'auto' }}
            defaultValue={startTime}
            inline
            onChange={setStartTime}
            placeholder="start date"
          />
          <span>
            <h4 className="mx-1">and</h4>
          </span>
          <EditText
            name="endTime"
            type="date"
            style={{ width: 'auto' }}
            defaultValue={endTime}
            inline
            onChange={setEndTime}
            placeholder="end date"
          />
        </div>
        <div style={{ whiteSpace: 'nowrap' }}>
          <h4>Named Parties</h4>
        </div>
        <div style={{ whiteSpace: 'nowrap' }}>
          <EditText
            name="relatedPartyHref"
            style={{ width: '200px' }}
            defaultValue={relatedPartyHref}
            inline
            onChange={setRelatedPartyHref}
            placeholder="href"
          />

          <strong>
            <label className="mr-2">:</label>
          </strong>
          <EditText
            name="relatedPartyRole"
            style={{ width: '200px' }}
            defaultValue={relatedPartyRole}
            inline
            onChange={setRelatedPartyRole}
            placeholder="role"
          />
          <EditText
            name="relatedPartyName"
            style={{ width: '200px' }}
            defaultValue={relatedPartyName}
            inline
            onChange={setRelatedPartyName}
            placeholder="name"
          />
          <strong>
            <label>. Valid since </label>
          </strong>
          <EditText
            name="startTime"
            type="date"
            style={{ width: '200px' }}
            defaultValue={relatedPartyStartTime}
            inline
            onChange={setRelatedPartyStartTime}
            placeholder="start date"
          />
          <strong>
            <label>until </label>
          </strong>
          <EditText
            name="endTime"
            type="date"
            style={{ width: '200px' }}
            defaultValue={relatedPartyEndTime}
            inline
            onChange={setRelatedPartyEndTime}
            placeholder="end date"
          />
        </div>
        <EditTextarea
          name="description"
          rows={4}
          style={{ paddingTop: 0 }}
          placeholder="Enter a description"
          defaultValue={description}
          onChange={setDescription}
        />
        <CCardText style={{ maxWidth: '80%' }}>
          In the event of a conflict between the terms of this SLA and the terms of any other agreement with the named
          SLAProvider governing your use of the Service (the 'Agreement'), the terms and conditions of this SLA apply,
          but only to the extent of such conflict. Capitalized terms used herein but not defined herein shall have the
          meanings set forth in the Agreement.
        </CCardText>
        <div>
          <strong>
            <label>Service Commitment</label>
          </strong>
          <CCardText style={{ maxWidth: '80%' }}>
            The named SLAProvider will use commercially reasonable efforts to make the Service available with a Monthly
            Uptime Percentage, as described below, during any monthly billing cycle (the 'Service Commitment'). In the
            event a Service does not meet the Service Commitment, you will be eligible to receive a Service Credit as
            described below.
          </CCardText>
        </div>

        <div>
          <strong>
            <label>Service Credits</label>
          </strong>
          <CCardText style={{ maxWidth: '80%' }}>
            Service Credits are calculated as a percentage of the total charges paid by you for the applicable Service
            for the billing cycle in which the Monthly Uptime Percentage fell within the ranges set forth in the table
            below. For all requests not otherwise specified below:
          </CCardText>
          <div style={{ whiteSpace: 'nowrap' }}>
            <EditText
              name="ruleId"
              style={{ width: '200px' }}
              defaultValue={ruleId}
              inline
              onChange={setRuleId}
              placeholder="ID"
            />

            <strong>
              <label>:</label>
            </strong>
            <EditText
              name="ruleMetric"
              style={{ width: '200px' }}
              defaultValue={ruleMetric}
              inline
              onChange={setRuleMetric}
              placeholder="metric"
            />
            <strong>
              <label> - </label>
            </strong>
            <EditText
              name="ruleUnit"
              style={{ width: '200px' }}
              defaultValue={ruleUnit}
              inline
              onChange={setRuleUnit}
              placeholder="unit"
            />
            <strong>
              <label>. Valid since </label>
            </strong>
            <EditText
              name="ruleReferenceValue"
              type="date"
              style={{ width: '200px' }}
              defaultValue={ruleReferenceValue}
              inline
              onChange={setRuleReferenceValue}
              placeholder="reference value"
            />
            <strong>
              <label>. Operator: </label>
            </strong>
            <EditText
              name="ruleOperator"
              style={{ width: '200px' }}
              defaultValue={ruleOperator}
              inline
              onChange={setRuleOperator}
              placeholder="operator"
            />
            <strong>
              <label>, tolerance: </label>
            </strong>
            <EditText
              name="ruleTolerance"
              style={{ width: '200px' }}
              defaultValue={ruleTolerance}
              inline
              onChange={setRuleTolerance}
              placeholder="tolerance"
            />
            <strong>
              <label>, service credit percentage: </label>
            </strong>
            <EditText
              name="rulePercentage"
              style={{ width: '200px' }}
              defaultValue={rulePercentage}
              inline
              onChange={setRulePercentage}
              placeholder="%"
            />
            <strong>
              <label>:</label>
            </strong>
            <EditText
              name="ruleConsequence"
              style={{ width: '200px' }}
              defaultValue={ruleConsequence}
              inline
              onChange={setRuleConsequence}
              placeholder="consequence"
            />
          </div>
          <CCardText style={{ maxWidth: '80%' }}>
            We will apply any Service Credits only against future payments otherwise due from you for the Service. At
            our discretion, we may issue the Service Credit to the credit card you used to pay for the billing cycle in
            which the Service did not meet the Service Commitment. Service Credits will not entitle you to any refund or
            other payment from the named SLAProvider. A Service Credit will be applicable and issued only if the credit
            amount for the applicable monthly billing cycle is greater than one dollar ($1 USD). Service Credits may not
            be transferred or applied to any other account. Unless otherwise provided in the Order Agreement, your sole
            and exclusive remedy for any unavailability, non-performance, or other failure by us to provide the Service
            is the receipt of a Service Credit (if eligible) in accordance with the terms of this SLA.
          </CCardText>
        </div>
        <div>
          <strong>
            <label>SLA Exclusions</label>
          </strong>
          <CCardText style={{ maxWidth: '80%' }}>
            The Service Commitment does not apply to any unavailability, suspension or termination of the Service, or
            any other Service performance issues: (i) caused by factors outside of our reasonable control, including any
            force majeure event or Internet access or related problems beyond the demarcation point of the Service; (ii)
            that result from any actions or inactions of you or any third party; (iii) that result from your equipment,
            software or other technology and/or third party equipment, software or other technology (other than third
            party equipment within our direct control); or (iv) arising from our suspension or termination of your right
            to use the Service in accordance with the Order Agreement (collectively, the "SLA Exclusions"). If
            availability is impacted by factors other than those used in our calculation of the Monthly Uptime
            Percentage, then we may issue a Service Credit considering such factors at our discretion.
          </CCardText>
        </div>
        <div>
          <strong>
            <label>Definitions</label>
          </strong>
          <CCardText style={{ maxWidth: '80%' }}>
            "Error Rate" means: (i) the total number of internal server errors returned by the Service as error status
            “InternalError” or “ServiceUnavailable” divided by (ii) the total number of requests for the applicable
            request type during that 5-minute interval. We will calculate the Error Rate for each 5-minute interval in
            the monthly billing cycle. The calculation of the number of internal server errors will not include errors
            that arise directly or indirectly as a result of any of the SLA Exclusions.
          </CCardText>
          <CCardText style={{ maxWidth: '80%' }}>
            "Monthly Uptime Percentage" is calculated by subtracting from 100% the average of the Error Rates from each
            5-minute interval in the monthly billing cycle. If you did not make any requests in a given 5-minute
            interval, that interval is assumed to have a 0% Error Rate.
          </CCardText>
          <CCardText style={{ maxWidth: '80%' }}>
            A "Service Credit" is a dollar credit, calculated as set forth above, that we may credit back to an eligible
            account.
          </CCardText>
        </div>
      </>
    </CContainer>
  )
}

export default Dashboard
