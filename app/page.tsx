import Link from "next/link";
import HeaderComponent from "./components/ui/headerComponent/HeaderComponent";
import { AuroraBackground } from "./components/ui/aurora-background";

export default function Home() {
  return (
   <>
    <HeaderComponent />
      <AuroraBackground className="w-[100dvw] h-[100dvh]">
        <h1 className="text-[12rem] text-white font-bold text-center">FilmRate</h1>
        <p className="text-[#999] w-[50%] text-center text-[1.2rem]">Don't let big companies make an opinion on your life.</p>
        <Link href="" className="tryButton mt-[50px] relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="tryNow text-[1.5rem] pl-[20px] pr-[20px] pt-[10px] pb-[10px] inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 font-medium text-white backdrop-blur-3xl">
            Try Now
          </span>
        </Link>
      </AuroraBackground>
   </>
  );
}
