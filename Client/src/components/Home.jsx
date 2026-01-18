import ActivitiesBanner from "./ActivitiesBanner";
import { Link } from "react-router-dom";
import homeBanner from "../assets/homeBanner.png";

function Home() {
  return (
    <div>
      <section
        className="bg-no-repeat bg-center h-screen flex items-center justify-center text-white text-center p-4 pt-20"
        style={{
          backgroundImage:
            `url(${homeBanner})`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8 p-8 rounded-lg">
          <h1 className="text-5xl font-bold text-hero">Gokarna</h1>
          <p className="text-xl text-hero">
            {" "}
            Discover pristine beaches and untouched natural beauty{" "}
          </p>
          
        </div>
      </section>

      <ActivitiesBanner />
    </div>
  );
}

export default Home;
