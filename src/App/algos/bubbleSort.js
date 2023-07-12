export function getBubbleSortAnimations(array) {
  const animations = [];
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(array, animations) {
  let n = array.length - 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      animations.push({ bars: [j, j + 1], color: 'red' });
      animations.push({ bars: [j, j + 1], color: '#222' });
      if (array[j] > array[j + 1]) {
        animations.push([j, array[j + 1]]);
        animations.push([j + 1, array[j]]);
        swap(array, j, j + 1);
      }
    }
  }
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}