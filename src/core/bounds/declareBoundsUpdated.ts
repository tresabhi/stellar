export const declareBoundsUpdated = (id: string) => {
  window.dispatchEvent(new CustomEvent(`boundsupdated${id}`));
};
