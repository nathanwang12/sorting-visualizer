import React from 'react';
import { getMergeSortAnimations } from '../algos/mergeSort.js';
import { getQuickSortAnimations } from '../algos/quickSort.js';
import { getHeapSortAnimations } from '../algos/heapSort.js';
import { getBubbleSortAnimations } from '../algos/bubbleSort.js';
import './Visualizer.css';

export default class Visualizer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 90,
      numberOfArrayBars: 60,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const { numberOfArrayBars } = this.state;
    const array = [];
    for (let i = 0; i < numberOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, 630));
    }

    this.setState({ array });
  }

  mergeSort() {
    const { array } = this.state;
    const animations = getMergeSortAnimations(array);
    this.renderAnimations(animations);
  }

  quickSort() {
    const { array } = this.state;
    const animations = getQuickSortAnimations(array);
    this.renderAnimations(animations);
  }

  heapSort() {
    const { array } = this.state;
    const animations = getHeapSortAnimations(array);
    this.renderAnimations(animations);
  }

  bubbleSort() {
    const { array } = this.state;
    const animations = getBubbleSortAnimations(array);
    this.renderAnimations(animations);
  }

  handleAnimationSpeedChange = (event) => {
    const animationSpeed = parseInt(event.target.value);
    this.setState({ animationSpeed });
  };

  handleNumberOfArrayBarsChange = (event) => {
    const numberOfArrayBars = parseInt(event.target.value);
    this.setState({ numberOfArrayBars });
  };

  renderAnimations(animations) {
    if (this.state.isSorting) {
      return;
    }
    const { animationSpeed } = this.state;
    const speed = 100 - animationSpeed;
    let delay = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const animation = animations[i];
      if (animation.color) {
        const [left, right] = animation.bars;
        const styleI = arrayBars[left].style;
        const styleJ = arrayBars[right].style;
        setTimeout(() => {
          styleI.backgroundColor = animation.color;
          styleJ.backgroundColor = animation.color;
        }, delay);
      } else {
        setTimeout(() => {
          const [i, newHeight] = animation;
          const styleI = arrayBars[i].style;
          styleI.height = `${newHeight}px`;
        }, delay);
      }
      delay += speed;
    }
  }

  render() {
    const { array, animationSpeed, numberOfArrayBars } = this.state;

    return (
      <div className="content-container">
        <div className="title">
          <h1>Sorting Algorithm Visualizer</h1>
        </div>
        <div className="top-section">
          <div className="slider-container">
            <div className="slider-item">
              <label>Animation Speed:</label>
              <input
                type="range"
                min="1"
                max="100"
                value={animationSpeed}
                onChange={this.handleAnimationSpeedChange}
              />
              <span>{animationSpeed}</span>
            </div>
            <div className="slider-item">
              <label>Number of Array Bars:</label>
              <input
                type="range"
                min="10"
                max="120"
                value={numberOfArrayBars}
                onChange={this.handleNumberOfArrayBarsChange}
              />
              <span>{numberOfArrayBars}</span>
            </div>
          </div>
          <button className="reset" onClick={() => this.resetArray()}>
            GENERATE NEW ARRAY
          </button>
        </div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div className="array-bar-container" key={idx}>
              <div className="array-bar" style={{ height: `${value}px` }}></div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button className="visualizer-function" onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
          <button className="visualizer-function" onClick={() => this.quickSort()}>
            Quick Sort
          </button>
          <button className="visualizer-function" onClick={() => this.heapSort()}>
            Heap Sort
          </button>
          <button className="visualizer-function" onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}