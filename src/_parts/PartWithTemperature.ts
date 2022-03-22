import Part, { ExportedPart, SavedPart } from './Part';

export interface ExportedPartWithTemperature extends ExportedPart {
  t: '-Infinity';
}
export interface SavedPartWithTemperature extends SavedPart {
  temperature: '-Infinity';
}

abstract class PartWithTemperature extends Part<
  ExportedPartWithTemperature,
  SavedPartWithTemperature
> {
  readonly temperature = '-Infinity';
}
export default PartWithTemperature;
