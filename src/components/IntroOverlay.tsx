"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXT = "저희 결혼합니다";
const CHAR_DELAY_MS = 350;
const TOTAL_DURATION_MS = 3000;

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [displayLength, setDisplayLength] = useState(0);

  useEffect(() => {
    // 한 글자씩 써내려가는 애니메이션
    const typeInterval = setInterval(() => {
      setDisplayLength((prev) => {
        if (prev >= TEXT.length) {
          clearInterval(typeInterval);
          return prev;
        }
        return prev + 1;
      });
    }, CHAR_DELAY_MS);

    // 총 3초 후 오버레이 사라짐
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, TOTAL_DURATION_MS);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <p
            className="font-serif text-2xl tracking-wide"
            style={{ color: "#E3C9A8" }}
          >
            {TEXT.slice(0, displayLength)}
            {displayLength < TEXT.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="inline-block w-[2px] h-6 ml-0.5 align-middle bg-[#E3C9A8]"
              />
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
