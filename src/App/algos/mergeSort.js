export function getMergeSortAnimations(array) {
  const animations = [];
  const aux = array.slice();
  mergeSort(array, aux, 0, array.length - 1, animations);
  return animations;
}

function mergeSort(array, aux, left, right, animations) {
  if (left === right) return;
  const mid = Math.floor((left + right) / 2);
  mergeSort(aux, array, left, mid, animations);
  mergeSort(aux, array, mid + 1, right, animations);
  merge(array, aux, left, mid, right, animations);
}

function merge(array, aux, left, mid, right, animations) {
  let i = left;
  let j = mid + 1;
  let k = left;
  while (i <= mid && j <= right) {
    animations.push({ bars: [i, j], color: 'red' });
    animations.push({ bars: [i, j], color: '#222' });
    if (aux[i] <= aux[j]) {
      animations.push([k, aux[i]]);
      array[k++] = aux[i++];
    } else {
      animations.push([k, aux[j]]);
      array[k++] = aux[j++];
    }
  } 
  while (i <= mid) {
    animations.push({ bars: [i, i], color: 'red' });
    animations.push({ bars: [i, i], color: '#222' });
    animations.push([k, aux[i]]);
    array[k++] = aux[i++];
  }
  while (j <= right) {
    animations.push({ bars: [j, j], color: 'red' });
    animations.push({ bars: [j, j], color: '#222' });
    animations.push([k, aux[j]]);
    array[k++] = aux[j++];
  }
}

