export function getHeapSortAnimations(array) {
  const animations = [];
  heapSort(array, animations);
  return animations;
}

function heapSort(array, animations) {
  let n = array.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }
  for (let i = n - 1; i >= 0; i--) {
    animations.push({ bars: [0, i], color: 'red' });
    animations.push({ bars: [0, i], color: '#222' });
    animations.push([0, array[i]]);
    animations.push([i, array[0]]);
    swap(array, 0, i);
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations) {
  let root = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[root]) {
    root = left;
  }
  if (right < n && array[right] > array[root]) {
    root = right;
  }
  if (root !== i) {
    animations.push({ bars: [i, root], color: 'red' });
    animations.push({ bars: [i, root], color: '#222' });
    animations.push([i, array[root]]);
    animations.push([root, array[i]]);
    swap(array, i, root);
    heapify(array, n, root, animations);
  }
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}