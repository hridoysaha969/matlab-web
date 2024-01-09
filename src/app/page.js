import Banner from "@/components/Banner";
import Reward from "@/components/Reward";
import Students from "@/components/Student";

export default function Home() {
  return (
    <div className="container">
      <Banner />
      <Reward />
      <Students />
    </div>
  );
}
