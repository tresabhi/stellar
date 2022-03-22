export interface ExportedPartWithTemperature {
  t: '-Infinity';
}
export interface SavedPartWithTemperature extends ExportedPartWithTemperature {}

abstract class PartWithTemperature {
  readonly t = '-Infinity';
}
export default PartWithTemperature;
