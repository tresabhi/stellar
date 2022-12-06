import produce from 'immer';
import usePopups, { UsePopups } from 'stores/popups';

export const mutatePopups = (recipe: (draft: UsePopups) => void) => {
  usePopups.setState(produce(recipe));
};
