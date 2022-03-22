import Part from './Part';

abstract class PartWithTemperature extends Part {
  readonly temperature = '-Infinity';
}
export default PartWithTemperature;
