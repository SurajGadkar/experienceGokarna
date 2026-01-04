import ActivitiesBanner from "./ActivitiesBanner";

function Home() {
  return (
    <div>
      <section
        className="bg-no-repeat bg-center h-screen flex items-center justify-center text-white text-center p-4 pt-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580713127239-6954a0a33279?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-8 p-8 rounded-lg">
          <h1 className="text-5xl font-bold text-hero">Gokarna</h1>
          <p className="text-xl text-hero">
            {" "}
            Discover pristine beaches and untouched natural beauty{" "}
          </p>
          <button className="text-hero bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300">
            {" "}
            Explore Paradise{" "}
          </button>
        </div>
      </section>

        
      <ActivitiesBanner />
    </div>
  );
}

export default Home;
