export const qualityProcess = [
  { code: '01', title: 'Requirement', body: 'Application, load, speed, environment and delivery expectations are clarified.' },
  { code: '02', title: 'Engineering', body: 'The technical route is evaluated against the bearing duty and specification.' },
  { code: '03', title: 'Evaluation', body: 'Material, component and design considerations are reviewed for suitability.' },
  { code: '04', title: 'Inspection', body: 'Dimensional, geometric and visual checks support consistent product decisions.' },
  { code: '05', title: 'Testing', body: 'Relevant performance, noise and vibration checks inform verification.' },
  { code: '06', title: 'Release', body: 'Quality documentation and final verification support dispatch.' }
] as const;

export const qualityCapabilities = [
  ['Precision engineering', 'Application-led technical review for bearing selection and performance.'],
  ['Dimensional inspection', 'Controlled checks for dimensions, fit and geometric accuracy.'],
  ['Design verification', 'Technical review connects product intent with operating requirements.'],
  ['Surface and profile evaluation', 'Surface condition, form and rolling profiles remain part of the quality conversation.'],
  ['Noise and vibration checks', 'Rotational behavior can be evaluated against the needs of the application.'],
  ['Process monitoring', 'Quality is treated as a connected process, with feedback between stages.'],
  ['Quality documentation', 'Clear records help align supply, specification and customer confidence.'],
  ['Continuous improvement', 'Corrective and preventive thinking turns feedback into better practice.']
] as const;

export const qualityImprovement = [
  { code: '01', title: 'Plan', body: 'Set the requirement and the evidence needed to verify it.' },
  { code: '02', title: 'Check', body: 'Review product, process and customer feedback.' },
  { code: '03', title: 'Improve', body: 'Address causes and strengthen the next decision.' },
  { code: '04', title: 'Verify', body: 'Confirm the change supports consistent performance.' }
] as const;

export const qualityApplicationFlow = [
  'Application',
  'Technical evaluation',
  'Bearing selection',
  'Quality verification',
  'Reliable operation'
] as const;
