import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import image from "../public/brototype_logo-removebg-preview.png";
import Form from "./Components/Form";

function App() {
  useEffect(() => {
    async function call() {
      try {
        let fetchData = await axios.get("http://localhost:3000/check");
        console.log(fetchData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    call();
  }, []);

  return (
    <div
      className="h-screen min-h-full relative"
      style={{
        background:
          "radial-gradient(circle, rgba(89,89,89,1) 0%, rgba(17,17,17,1) 100%)",
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          position: "absolute",
          top: -65,
          left: 0,
          width: "35vh",
          height: "auto",
        }}
      />
      <div className="flex justify-center items-center pt-36 ">
        <button className="mr-2">Add User</button>
        <button>User Details</button>
      </div>
      <Form />
    </div>
  );
}

export default App;
