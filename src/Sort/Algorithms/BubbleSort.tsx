import swap from "../helper/Swap";

type ArrayType = number[];
type AnimationType = [number, number, number, number][];

export const getBubbleSortAnimations = (array: ArrayType, arraySize: number): AnimationType => {
    const animations: AnimationType = [];
    bubbleSort(array, arraySize, animations);
    return animations;
}

function bubbleSort(array: ArrayType, arraySize: number, animations: AnimationType): void {
    let i: number, j: number;
    for (i = 0; i < arraySize - 1; i++) {
        for (j = 0; j < arraySize - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                animations.push([j, array[j], j + 1, array[j + 1]]);
                swap(array, j, j + 1);
            }
        }
    }
}
