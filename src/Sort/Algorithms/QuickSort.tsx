import swap from "../helper/Swap";

interface Animation {
  swapIndices: number[];
  newArray: number[];
}

export const getQuickSortAnimations = (
  array: number[],
  arraySize: number
): Animation[] => {
  const animations: Animation[] = [];
  quickSort(array, 0, arraySize - 1, animations);
  return animations;
};

const quickSort = (
  array: number[],
  low: number,
  high: number,
  animations: Animation[]
): void => {
  if (low < high) {
    const pivotIdx = partition(array, low, high, animations);
    quickSort(array, low, pivotIdx - 1, animations);
    quickSort(array, pivotIdx + 1, high, animations);
  }
};

const partition = (
  array: number[],
  low: number,
  high: number,
  animations: Animation[]
): number => {
  const pivot: number = array[high];
  let i: number = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      animations.push({ swapIndices: [i, j], newArray: [...array] });
      swap(array, i, j);
      animations.push({ swapIndices: [i, array[i], j, array[j]], newArray: [...array] });
      animations.push({ swapIndices: [i, j], newArray: [...array] });
    }
  }

  animations.push({ swapIndices: [i + 1, high], newArray: [...array] });
  swap(array, i + 1, high);
  animations.push({ swapIndices: [i + 1, array[i + 1], high, array[high]], newArray: [...array] });
  animations.push({ swapIndices: [i + 1, high], newArray: [...array] });

  return i + 1;
};
