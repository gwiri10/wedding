"use client";

import { motion } from "framer-motion";
import IntroOverlay from "@/components/IntroOverlay";
import HeroSection from "@/components/HeroSection";
import WeddingInfo from "@/components/WeddingInfo";
import Introduction from "@/components/Introduction";
import PhotoGallery from "@/components/PhotoGallery";
import LocationMap from "@/components/LocationMap";
import ActionButtons from "@/components/ActionButtons";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Home() {
  return (
    <>
      <IntroOverlay />
      <main className="w-full max-w-[360px] mx-auto min-h-screen overflow-x-hidden bg-white">
      <HeroSection />

      <div className="px-6 pb-20 space-y-20">
        <motion.section {...fadeInUp}>
          <WeddingInfo />
        </motion.section>

        <motion.section {...fadeInUp}>
          <Introduction />
        </motion.section>

        <motion.section {...fadeInUp}>
          <PhotoGallery />
        </motion.section>

        <motion.section {...fadeInUp}>
          <LocationMap />
        </motion.section>

        <motion.section {...fadeInUp}>
          <ActionButtons />
        </motion.section>
      </div>
    </main>
    </>
  );
}
