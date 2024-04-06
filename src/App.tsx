import { useState } from "react";
import GridBoard from "./components/GridBoard";
import SortingVisualizer from "./Sort/SortingVisualiser/SortingVisualiser"
const App = () => {
  const [state, setState] = useState(false)
  return (
    <>
    <nav className="flex items-center justify-around">
      <button onClick={()=>setState(prev=>!prev)} className={`bg-violet-400 p-3 w-[50%] bg-${state?"grey":"via-violet-400"}`}>Sorting Algoritms</button>
      <button onClick={()=>setState(prev=>!prev)} className={`bg-violet-400 p-3 w-[50%] border-2`}>Pathfinding Algorithms</button>
    </nav>
    {state ? <GridBoard/> : <SortingVisualizer/>}
    </>
  );
};

export default App;
