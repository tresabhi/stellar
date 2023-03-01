export default function discriminate<Type>(
  discriminators: (source: Type) => unknown,
) {
  return !discriminators();
}
