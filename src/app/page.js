import Banner from "@/components/Banner";

import ImageSlider from "@/components/ImageSlider";
import Reward from "@/components/Reward";
import Students from "@/components/Student";

export default function Home() {
  // const targetDate = new Date("2024-03-17T17:59:59");
  return (
    <>
      {" "}
      <Banner />
      <div className="container">
        <ImageSlider />
        <Reward />
        <Students />
      </div>
    </>
  );
}
