import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";

export default function Loading() {
  return (
    <div className="bg-accent flex min-h-screen flex-col text-center content-center items-center pb-1">
      <NavBar />
      <h1>Loading..</h1>
    </div>
  );
}
