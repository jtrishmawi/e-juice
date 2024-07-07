import { Bottle } from "@/components/bottle";

export default function Home() {
  return (
    <div className="container relative">
      <Bottle volume={70} base={40} nicotine={21} aroma={8} />
    </div>
  );
}
