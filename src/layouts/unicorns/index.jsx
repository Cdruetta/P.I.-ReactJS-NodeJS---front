import { UnicornProvider } from "../context/UnicornContext";
import UnicornsContainer from "./UnicornsContainer";


const UnicornsWrapper = () => { 
  return (
    <UnicornProvider>
      <UnicornsContainer />
    </UnicornProvider>
  );
};

export default UnicornsWrapper;
