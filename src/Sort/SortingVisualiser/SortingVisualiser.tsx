import React, { useState, useEffect, useRef } from "react";

//Importing animations
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getSelectionSortAnimations } from "../Algorithms/SelectionSort";
import { getQuickSortAnimations } from "../Algorithms/QuickSort";
import { getHeapSortAnimations } from "../Algorithms/HeapSort";
import { getInsertionSortAnimations } from "../Algorithms/InsertionSort";
import "../style.scss";

//Default Values
const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_ANIMATION_SPEED = 80;
const ARRAY_MIN_VALUE = 10;
const ARRAY_MAX_VALUE = 500;

const SortingVisualiser: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(DEFAULT_ARRAY_SIZE);
  const [animationSpeed, setAnimationSpeed] = useState<number>(
    DEFAULT_ANIMATION_SPEED
  );
  const [array, setArray] = useState<number[]>([]);
  const [disableButtons, setDisableButtons] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const duplicateArray = array.slice();

  useEffect(() => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  }, [arraySize]);

  const resetArray = () => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  };

  //Function to give random values between a specified range
  const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //Function to do the animations
  const animateSorting = (animations: any) => {
    setDisableButtons(true);
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
        const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
          const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * (101 - animationSpeed));
      }
    }

    setTimeout(() => {
      setDisableButtons(false);
    }, animations.length * (101 - animationSpeed));
  };

  const bubbleSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getBubbleSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const selectionSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getSelectionSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const quickSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getQuickSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const heapSort = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getHeapSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const insertionSort = () => {
    setDisableButtons(true);
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    const animations = getInsertionSortAnimations(duplicateArray, arraySize);
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const { indices } = animations[i]; // Destructure indices from animations[i]
        const [barOneIdx, barTwoIdx] = indices;
        const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
        const barTwoStyle = (arrayBars[barTwoIdx] as HTMLElement).style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          const { newHeights } = animations[i]; // Destructure newHeights from animations[i]
          const [barIdx, newHeight] = newHeights;
          const barStyle = (arrayBars[barIdx] as HTMLElement).style;
          barStyle.height = `${newHeight}px`;
        }, i * (101 - animationSpeed));
      }
    }
    setTimeout(() => {
      setDisableButtons(false);
    }, animations.length * (101 - animationSpeed));
  };
  
  const barWidth: number = arraySize > 50 ? 12 : arraySize > 25 ? 17 : 24;

  return (
    <div className="sorting">
      <div className="navbar">
        <div className="sliderContainer">
          <div className="size">
            <label htmlFor="slider">Size of Array</label>
            <input
              type="range"
              id="slider"
              className="slider"
              min={10}
              max={100}
              value={arraySize}
              onChange={(e) => {
                setArraySize(parseInt(e.target.value));
              }}
              disabled={disableButtons}
            />
          </div>
          <div className="speed">
            <label htmlFor="Speedslider">Sorting Speed</label>
            <input
              type="range"
              id="Speedslider"
              className="slider"
              min={1}
              max={100}
              value={animationSpeed}
              onChange={(e) => {
                setAnimationSpeed(parseInt(e.target.value));
              }}
              disabled={disableButtons}
            />
          </div>
        </div>

        <div className="buttons">
          <button
            className="ui button generate"
            disabled={disableButtons}
            onClick={resetArray}
          >
            Generate New Array
          </button>
          <button
            className="ui button"
            disabled={disableButtons}
            onClick={bubbleSort}
          >
            Bubble Sort
          </button>
          <button
            className="ui button"
            disabled={disableButtons}
            onClick={selectionSort}
            >
              Selection Sort
            </button>
            <button
              className="ui button"
              disabled={disableButtons}
              onClick={quickSort}
            >
              Quick Sort
            </button>
            <button
              className="ui button"
              disabled={disableButtons}
              onClick={heapSort}
            >
              Heap Sort
            </button>
            <button
              className="ui button"
              disabled={disableButtons}
              onClick={insertionSort}
            >
              Insertion Sort
            </button>
          </div>
        </div>
  
        <div className="main" ref={ref}>
          {array.map((value, index) => {
            return (
              <div
                className="arrayBar"
                key={index}
                style={{
                  height: `${value}px`,
                  width: `${barWidth}px`,
                  color: "white",
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default SortingVisualiser ;
  
