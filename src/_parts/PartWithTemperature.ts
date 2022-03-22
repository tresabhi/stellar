import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithTemperature extends ExportedPart {
  t: '-Infinity';
}
export interface SavedPartWithTemperature
  extends SavedPart,
    ExportedPartWithTemperature {}

abstract class PartWithTemperature extends Part<
  ExportedPartWithTemperature,
  SavedPartWithTemperature
> {
  readonly t = '-Infinity';
}
export default PartWithTemperature;
