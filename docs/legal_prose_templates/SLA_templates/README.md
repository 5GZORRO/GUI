# Legal Prose Templates - SLA Templates

## SLA Information Model
```json
{
  "id": "string",
  "href": "string",
  "name": "string",
  "description": "string",
  "version": "string",
  "validFor": {
    "endDateTime": "string",
    "startDateTime": "string"
  },
  "templateRef": {
    "href": "string",
    "name": "string",
    "description": "string"
  },
  "state": "string",
  "approved": true,
  "approvalDate": "2022-01-04T15:04:51.074Z",
  "rule": [
    {
      "id": "string",
      "metric": "string",
      "unit": "string",
      "referenceValue": "string",
      "operator": "string",
      "tolerance": "string",
      "consequence": "string"
    }
  ],
  "relatedParty": [
    {
      "href": "string",
      "role": "string",
      "name": "string",
      "validFor": {
        "endDateTime": "string",
        "startDateTime": "string"
      } 
    } 
  ] 
}
```
### Example of SLA payload sent to SCLCM
```json
{
  "id": "EmBwQ7Bkx9xPsqtu1ZXfni",
  "href": "",
  "name": "test_sla",
  "description": "test sla",
  "version": "",
  "validFor": {
    "endDateTime": "2022-07-20",
    "startDateTime": "2022-07-14"
  },
  "templateRef": {
    "href": "http://172.28.3.6:31084/legal-prose-repository/api/v1/legal-prose-templates/EmBwQ7Bkx9xPsqtu1ZXfni",
    "name": "availability_template",
    "description": "availability template"
  },
  "state": "ACTIVE",
  "approved": true,
  "approvalDate": "2022-07-11T13:58:11.589767",
  "autoscalingPolicies": [
    {
      "id": "",
      "metric": "",
      "unit": "",
      "referenceValue": "",
      "operator": "",
      "consequence": "",
      "excludedThirdParties": [
        null
      ]
    }
  ],
  "rule": [
    {
      "metric": "availability",
      "referenceValue": "99.95",
      "operator": ".l",
      "tolerance": "0.05"
    }
  ],
  "relatedParty": [
    {
      "role": "Administrator",
      "name": "Operator-a",
      "validFor": {
        "endDateTime": "",
        "startDateTime": ""
      }
    }
  ]
}
```

## Use Cases

### UC1

UC1 uses the **availability_template** and ``availability`` metric. Two SLAs must be created: "core_availability" SLA for operatorA and "edge_availability" SLA for operatorB.

- Template Rule
  1. A **{{metric}}** value becomes a breach when it is **{{operator}}** than **{{referenceValue}}** minus **{{tolerance}}**.

  ```
  1. A **{{availability}}** value becomes a breach when it is **{{.l}}** than **{{99.95}}** minus **{{0.05}}**.
  ```

- Template data

  ```json
  {
    ...
    "name": "core_availability",
    "description": "OTA core availability sla",   
    "validFor": {
        "endDateTime": "2022-06-7T09:08:06.788Z",
        "startDateTime": "2022-07-7T09:08:06.788Z"
    }
    ...
    "rule": [
      {
        "metric": "availability",
        "referenceValue": "99.95",
        "operator": ".l",
        "tolerance": "0.05"
      }
    ],
    ...
  }
  ```

  ```json
  {
    ...
    "name": "edge_availability",
    "description": "OTA edge availability sla",   
    "validFor": {
        "endDateTime": "2022-06-7T09:08:06.788Z",
        "startDateTime": "2022-07-7T09:08:06.788Z"
    }
    ...
    "rule": [
      {
        "metric": "availability",
        "referenceValue": "99.95",
        "operator": ".l",
        "tolerance": "0.05"
      }
    ],
    ...
  }
  ```

### UC2

UC2 uses the **spectrum_template** and the ``interference`` and ``transmission_power`` (aka "Effective Isotropic Radiated Power (EIRP)") metrics. An "interference_transmission" SLA must be created for operatorB.

- Template Rule 

  1. A  **{{metric}}** (dBm) value becomes a breach when it is **{{operator}}** than **{{referenceValue}}** plus **{{tolerance}}**.
  2. A  **{{metric_2}}** (dBm) value becomes a breach when it is **{{operator_2}}** than **{{referenceValue_2}}** plus **{{tolerance_2}}**.

  ```
  1. A  **{{interference}}** (dBm) value becomes a breach when it is **{{.g}}** than **{{-60}}** plus **{{6}}**.
  2. A  **{{transmission_power}}** (dBm) value becomes a breach when it is **{{.g}}** than **{{43}}** plus **{{2}}**.
  ```

- Template Data

  ```json
  {
    ...
    "name": "interference_transmission",
    "description": "This SLA rules the correct usage of a spectrum resource. The spectrum resource is leased, which implies the temporary transfer of rights and obligations of that particular resource.",   
    "validFor": {
        "endDateTime": "2022-05-10T12:00:00.788Z",
        "startDateTime": "2022-06-30T12:00:00.788Z"
    }
    ...
    "rule": [
      {
        "metric": "interference",
        "referenceValue": "-60",
        "operator": ".g",
        "tolerance": "6"
      },
      {
        "metric": "transmission_power",
        "referenceValue": "43",
        "operator": ".g",
        "tolerance": "2"
      }
    ],
    ...
  }
  ```

### UC3
UC3 uses the **requests_template** and the ``osm_requests`` metric. An "SLA for CDN slice" SLA must be created for operatorA.

- Template Rule
  1. A **{{metric}}** value becomes a breach when it is **{{operator}}** than **{{referenceValue}}** plus **{{tolerance}}**.

  ```
  1. A **{{osm_requests}}** value becomes a breach when it is **{{.g}}** than **{{2600}}** plus **{{0.05}}**.
  ```

- Template Data
  ```json
  {
    ...
    "name": "SLA for CDN slice",
    "description": "This is an SLA agreement for the CDN Use Case. The goal of the present SLA is to limit the number of requests/minute sent to a CDN edge cache",   
    "validFor": {
        "endDateTime": "2022-07-02T12:00:00.788Z",
        "startDateTime": "2022-06-02T12:00:00.788Z"
    }
    ...
    "rule": [
      {
        "metric": "osm_requests",
        "referenceValue": "2600",
        "operator": ".g",
        "tolerance": "0.05"
      }
    ],
    ...
  }
  ```
