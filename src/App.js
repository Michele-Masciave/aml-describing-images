import './App.css';
import CarouselCompoent from './components/CarouselComponent'
import {useState} from 'react'

function App() {

  const [descriptions, setDescriptions] = useState([])
  let counter = 0; //change me when re-run for not overriding

  const addDescription = (json) => {
    const current = descriptions;
    setDescriptions([...current, json])
  }

  const writeDescriptions = () => {
    console.log("length: ", descriptions.length)
    const jsonString = JSON.stringify(descriptions);
    console.log(jsonString)
    const element = document.createElement("a");
    const file = new Blob([jsonString], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "descriptions_"+counter+".json";
    document.body.appendChild(element);
    element.click();
    counter += 1
  }

  return (
    <div className="App-header">
      <CarouselCompoent addDescription={addDescription} writeDescriptions={writeDescriptions}/>
    </div>
  );
}

export default App;
