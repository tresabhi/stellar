export default function declareBoundsUpdated(id: string) {
  window.dispatchEvent(new CustomEvent(`boundsupdated${id}`));
}
