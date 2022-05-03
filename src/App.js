import './App.css';
import CarouselCompoent from './components/CarouselComponent'
import {useState} from 'react'

function App() {

  const [descriptions, setDescriptions] = useState([])

  const addDescription = (json) => {
    const current = descriptions;
      setDescriptions([...current, json])
  }

  const writeDescriptions = (start, index) => {
    const end = parseInt(start)+parseInt(index)-1
    console.log("length: ", descriptions.length)
    const jsonString = JSON.stringify(descriptions);
    console.log(jsonString)
    const element = document.createElement("a");
    const file = new Blob([jsonString], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "descriptions_"+start+"_"+end+".json";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="App-header">
      <CarouselCompoent desc={descriptions} addDescription={addDescription} writeDescriptions={writeDescriptions}/>
    </div>
  );
}

export default App;
