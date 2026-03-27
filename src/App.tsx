import { BikeJourneyProvider } from "./context/BikeJourneyContext";
import { BikeJourneyApp } from "./bike/BikeJourneyApp";

export default function App() {
  return (
    <BikeJourneyProvider>
      <BikeJourneyApp />
    </BikeJourneyProvider>
  );
}
