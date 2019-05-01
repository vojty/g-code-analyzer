export type Line = {
  modal: Modal
  startPoint: Point
  endPoint: Point
}

export type Curve = {
  modal: Modal
  startPoint: Point
  endPoint: Point
  fixedPoint: Point
}

export type Point = {
  x: number
  y: number
  z: number
}

export type Motion =
  | 'G0' // rapid move - move mode
  | 'G1' // linear move - work mode
  | 'G2' // curve - clockwise
  | 'G3' // curve
  | 'G38.2'
  | 'G38.3'
  | 'G38.4'
  | 'G38.5'
  | 'G80'

type Plane =
  | 'G17' // xy-plane
  | 'G18' // xz-plane
  | 'G19' // yz-plane

type Coolant = 'M7' | 'M8' | 'M9'

type Spindle = 'M3' | 'M4' | 'M5'

type Program = 'M0' | 'M1' | 'M2' | 'M3'

type Feedrate =
  | 'G93' // Inverse time mode
  | 'G94' // Units per minute
  | 'G95' // Units per rev

type Wcs = 'G54' | 'G55' | 'G56' | 'G57' | 'G58' | 'G59'

export type Units =
  | 'G20' // Inches
  | 'G21' // Millimeters

type Distance =
  | 'G90' // Absolute
  | 'G91' // Relative

export type Modal = {
  motion: Motion
  wcs: Wcs
  plane: Plane
  units: Units
  distance: Distance
  feedrate: Feedrate
  program: Program
  spindle: Spindle
  coolant: Coolant
  tool: number
}
