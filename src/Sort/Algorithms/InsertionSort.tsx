interface Animation {
  type: any;
  newHeights: any;
  indices: [number, number];
  swapIndices: number[];
  newArray: number[];
}

export const getInsertionSortAnimations = (
  array: number[],
  arraySize: number
): Animation[] => {
  const animations: Animation[] = [];
  insertionSort(array, arraySize, animations);
  return animations;
};

const insertionSort = (
  array: number[],
  arraySize: number,
  animations: Animation[]
): void => {
  let i: number, key: number, j: number;
  for (i = 1; i < arraySize; i++) {
    key = array[i];
    j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push({
        swapIndices: [j, j + 1], newArray: [...array],
        type: undefined,
        newHeights: undefined,
        indices: [j, j+1]
      });
      array[j + 1] = array[j];
      animations.push({
        swapIndices: [j + 1, array[j + 1]], newArray: [...array],
        type: undefined,
        newHeights: undefined,
        indices: [j, j+1]
      });

      animations.push({
        swapIndices: [j, j + 1], newArray: [...array],
        type: undefined,
        newHeights: undefined,
        indices: [j,j+1]
      });
    }
    animations.push({
      swapIndices: [j + 1, j + 1], newArray: [...array],
      type: undefined,
      newHeights: undefined,
      indices: [j,j+1]
    });
    array[j + 1] = key;
    animations.push({
      swapIndices: [j + 1, array[j + 1]], newArray: [...array],
      type: undefined,
      newHeights: undefined,
      indices: [j, j+1]
    });
    animations.push({
      swapIndices: [j + 1, j + 1], newArray: [...array],
      type: undefined,
      newHeights: undefined,
      indices: [j, j+1]
    });
  j=j+1
  }
};
