export function getQuickSortAnimations(array) {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(array, left, right, animations) {
  if (left < right) {
    const pivot = partition(array, left, right, animations);
    quickSort(array, left, pivot - 1, animations);
    quickSort(array, pivot + 1, right, animations);
  }
}

function partition(array, left, right, animations) {
  let pivot = array[right];
  let i = left;
  for (let j = left; j < right; j++) {
    animations.push({ bars: [j, right], color: 'red' });
    animations.push({ bars: [j, right], color: '#222' });
    if (array[j] < pivot) {
      animations.push([i, array[j]]);
      animations.push([j, array[i]]);
      swap(array, i, j);
      i++;
    }
  }
  animations.push({ bars: [i, right], color: 'red' });
  animations.push({ bars: [i, right], color: '#222' });
  animations.push([i, array[right]]);
  animations.push([right, array[i]]);
  swap(array, i, right);
  return i;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
