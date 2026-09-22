import { ViewTransition } from "react";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <Hero />
    </ViewTransition>
  );
}
