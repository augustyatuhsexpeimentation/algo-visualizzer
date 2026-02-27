export function generateRandomArray(
  size: number,
  min: number = 5,
  max: number = 100
): number[] {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function shuffleArray(array: number[]): number[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createNearlySortedArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) =>
    Math.floor((i / size) * 95) + 5
  );
  const swaps = Math.floor(size * 0.1);
  for (let s = 0; s < swaps; s++) {
    const i = Math.floor(Math.random() * size);
    const j = Math.floor(Math.random() * size);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createReversedArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) =>
    Math.floor(((size - 1 - i) / (size - 1)) * 95) + 5
  );
}