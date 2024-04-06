import swap from "../helper/Swap";

interface Animation {
  swapIndices: number[];
  newArray: number[];
}

export const getSelectionSortAnimations = (
  array: number[],
  arraySize: number
): Animation[] => {
  const animations: Animation[] = [];
  selectionSort(array, arraySize, animations);
  return animations;
};

function selectionSort(
  arr: number[],
  arraySize: number,
  animations: Animation[]
): void {
  let i, j, minIdx;
  for (i = 0; i < arraySize - 1; i++) {
    minIdx = i;
    for (j = i + 1; j < arraySize; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    // Pushing the indices into animation to change the color
    animations.push({ swapIndices: [i, minIdx], newArray: [...arr] });
    swap(arr, minIdx, i);
    animations.push({
      swapIndices: [minIdx, arr[minIdx], i, arr[i]],
      newArray: [...arr]
    });
    // Again pushing the indices to revert back to original color
    animations.push({ swapIndices: [i, minIdx], newArray: [...arr] });
  }
}
