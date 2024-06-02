import Body from "./Components/Body";
import Navbar from "./Components/Navbar";



export default function Home() {



  return (
    <div className="flex flex-col gap-12 bg-gray-100 min-h-screen">
      <Navbar />
      <Body />
    </div>
  );
}