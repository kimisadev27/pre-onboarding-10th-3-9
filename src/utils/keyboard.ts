import { KEYBOARD, START_ACTIVE_INDEX } from './const';

export const calcActiveIndex = (
  key: typeof KEYBOARD.ARROW_DOWN | typeof KEYBOARD.ARROW_UP,
  currentIndex: number,
  maxIndex: number,
) => {
  switch (key) {
    case KEYBOARD.ARROW_DOWN:
      if (currentIndex === maxIndex) {
        return START_ACTIVE_INDEX + 1;
      }
      return currentIndex + 1;

    case KEYBOARD.ARROW_UP:
      if (currentIndex === START_ACTIVE_INDEX || currentIndex === START_ACTIVE_INDEX + 1) {
        return maxIndex;
      }
      return currentIndex - 1;

    default:
      return currentIndex;
  }
};
