abstract class Part {
  parentID: string | undefined;
  abstract ID: string;

  label = 'Unnamed Part';
  selected = false;
  hidden = false;
  locked = false;
}
export default Part;
