export default function swap(arr: number[], xp: number, yp: number): void {
  let temp: number = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}
