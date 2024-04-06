import swap from "../helper/Swap";

type ArrayType = number[];
type AnimationType = [number, number][]; // Tuple representing indices

export const getHeapSortAnimations = (array: ArrayType, arraySize: number): AnimationType => {
    const animations: AnimationType = [];
    heapSort(array, arraySize, animations);
    return animations;
}

const heapify = (array: ArrayType, n: number, i: number, animations: AnimationType): void => {
    let largest: number = i; 
    let l: number = 2 * i + 1; 
    let r: number = 2 * i + 2;
    
    if (l < n && array[l] > array[largest]) largest = l;
    
    if (r < n && array[r] > array[largest]) largest = r;
    
    if (largest !== i) {
        animations.push([largest, i]);
        swap(array, largest, i);
        heapify(array, n, largest, animations);
    }
};

const buildHeap = (array: ArrayType, n: number, animations: AnimationType): void => {
    for (let i: number = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }
};

const heapSort = (array: ArrayType, arraySize: number, animations: AnimationType): void => {
    const n: number = arraySize;
    buildHeap(array, n, animations);
    for (let i: number = n - 1; i > 0; i--) {
        animations.push([0, i]);
        swap(array, 0, i);
        heapify(array, i, 0, animations);
    }
};
