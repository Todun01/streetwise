import { Contact } from "@/features/landing/components/contact";
import { Hero } from "@/features/landing/components/hero";
import { HowItWorks } from "@/features/landing/components/how-it-works";
import { NearbySpots } from "@/features/landing/components/nearby-spots";

export default function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <NearbySpots />
      <Contact />
    </>
  );
}