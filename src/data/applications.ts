export interface Application {
  code: string;
  name: string;
  body: string;
  bearings: string[];
}

export const applications: Application[] = [
{
  code: 'APP / 01',
  name: 'Industrial Machinery',
  body: 'Rotating assemblies inside industrial machinery where load and continuity define the specification.',
  bearings: ['Cylindrical Ball Bearings', 'Spherical Roller Bearings']
},
{
  code: 'APP / 02',
  name: 'Manufacturing Equipment',
  body: 'Bearings supporting production equipment across plants served by the KHS-LG range.',
  bearings: ['Deep Groove Ball Bearings', 'Taper Roller Bearings']
},
{
  code: 'APP / 03',
  name: 'Automotive Assemblies',
  body: 'Automobile applications supplied to OEMs and aftermarket distributors.',
  bearings: ['Taper Roller Bearings', 'Deep Groove Ball Bearings']
},
{
  code: 'APP / 04',
  name: 'Automation Systems',
  body: 'Guided and compact motion for automation, positioning and small drive systems.',
  bearings: ['Linear Motion Bearings', 'Miniature Ball Bearings']
}];


export const performanceAxes = [
{ code: 'P01', name: 'Load', body: 'Geometry selected for the load the assembly actually sees.' },
{ code: 'P02', name: 'Speed', body: 'Rolling elements and cages matched to the operating range.' },
{ code: 'P03', name: 'Precision', body: 'Inspected before dispatch, batch after batch.' },
{ code: 'P04', name: 'Durability', body: 'Built for continuous industrial duty.' },
{ code: 'P05', name: 'Efficiency', body: 'Low-friction motion across the product range.' }];