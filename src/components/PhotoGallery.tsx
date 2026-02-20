"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

function Lightbox({ src, alt, onClose, onPrev, onNext, hasPrev, hasNext }: { src: string; alt: string; onClose: () => void; onPrev: () => void; onNext: () => void; hasPrev: boolean; hasNext: boolean }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 z-20"
        aria-label="닫기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      {hasPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 z-20"
          aria-label="이전"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 z-20"
          aria-label="다음"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      )}
      <div className="relative w-[90vw] h-[80vh] max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </div>
    </div>
  );
}

// 원본 이미지 경로 (라이트박스에서만 사용)
const GALLERY_IMAGES = [
  "/image/100_0055_(2).jpg",
  "/image/100_0167_(2).jpg",
  "/image/100_0344_(2).jpg",
  "/image/100_0594_(2).jpg",
  "/image/100_0994_(2).jpg",
  "/image/100_1388_(2).jpg",
  "/image/100_1461_(2).jpg",
  "/image/100_5397_(2).jpg",
  "/image/100_5415_(2).jpg",
  "/image/100_6249_(2).jpg",
  "/image/100_6419_(2).jpg",
  "/image/100_6508_(2).jpg",
  "/image/100_6748_(2).jpg",
  "/image/100_6914_(2).jpg",
  "/image/100_7207_(2).jpg",
  "/image/100_7382_(2).jpg",
  "/image/100_7752_(2).jpg",
  "/image/100_7973_(2).jpg",
  "/image/100_8470_(2).jpg",
  "/image/100_8473_(2).jpg",
  "/image/100_8508_(2).jpg",
  "/image/100_8514_(2).jpg",
  "/image/100_9359_(2).jpg",
  "/image/100_9671_(2).jpg",
  "/image/200_7362_(2).jpg",
  "/image/200_7500_(2).jpg",
  "/image/200_8146_(2).jpg",
  "/image/200_8151_(2).jpg",
  "/image/200_8162_(2).jpg",
  "/image/200_8359_(2).jpg",
  "/image/200_8363_(2).jpg",
  "/image/200_8505_(2).jpg",
  "/image/200_8870_(2).jpg",
  "/image/200_9753_(2).jpg",
  "/image/200_9822_(2).jpg",
  "/image/_DSC0382.JPG",
  "/image/_DSC0382a.JPG",
  "/image/_DSC0533.jpg",
  "/image/_DSC0533a.jpg",
  "/image/_DSC0591.JPG",
  "/image/_DSC0631.JPG",
  "/image/_DSC0649.JPG",
  "/image/_DSC0732.JPG",
  "/image/_DSC0732a.JPG",
  "/image/_DSC0770.JPG",
  "/image/_DSC0797.JPG",
];

// 썸네일/메인 표시용 webp 경로 (라이트박스 제외)
function toThumbPath(original: string): string {
  return original.replace(/^\/?image\//, "/image/thumb/").replace(/\.[^.]+$/i, ".webp");
}

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? GALLERY_IMAGES.length - 1 : i - 1));
    setIsLoaded(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i >= GALLERY_IMAGES.length - 1 ? 0 : i + 1));
    setIsLoaded(false);
  }, []);

  const goToIndex = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setIsLoaded(false);
  }, []);

  const stripRef = useRef<HTMLDivElement>(null);
  const stripWrapRef = useRef<HTMLDivElement>(null);
  const scrollbarFillRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 커스텀 스크롤바 위치 업데이트
  const updateScrollbar = useCallback(() => {
    const wrap = stripWrapRef.current;
    const fill = scrollbarFillRef.current;
    if (!wrap || !fill) return;
    const maxScroll = wrap.scrollWidth - wrap.clientWidth;
    if (maxScroll <= 0) {
      fill.style.width = "100%";
      fill.style.marginLeft = "0";
      return;
    }
    const ratio = wrap.clientWidth / wrap.scrollWidth;
    const thumbWidth = Math.max(20, ratio * 100);
    fill.style.width = `${thumbWidth}%`;
    const move = (wrap.scrollLeft / maxScroll) * (100 - thumbWidth);
    fill.style.marginLeft = `${move}%`;
  }, []);

  useEffect(() => {
    const wrap = stripWrapRef.current;
    if (!wrap) return;
    wrap.addEventListener("scroll", updateScrollbar);
    const timer = setTimeout(updateScrollbar, 300);
    return () => {
      wrap.removeEventListener("scroll", updateScrollbar);
      clearTimeout(timer);
    };
  }, [updateScrollbar, GALLERY_IMAGES.length]);

  // 갤러리 섹션이 화면에 보이면 썸네일 스크롤 영역 활성화 (포커스)
  useEffect(() => {
    const section = sectionRef.current;
    const wrap = stripWrapRef.current;
    if (!section || !wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) wrap.focus();
      },
      { threshold: 0.15, rootMargin: "-20px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 선택된 썸네일이 보이도록 스크롤
  useEffect(() => {
    const el = thumbRefs.current[currentIndex];
    if (el && stripRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    setTimeout(updateScrollbar, 350);
  }, [currentIndex, updateScrollbar]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  // 다음/이전 이미지 미리 로드 (캐시에 적재해 전환 속도 개선)
  const nextIdx = (currentIndex + 1) % GALLERY_IMAGES.length;
  const prevIdx = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;

  // 썸네일 가상화: 현재 선택 ±8 범위만 실제 이미지 로드 (최대 17개)
  const WINDOW = 8;
  const isInWindow = (idx: number) =>
    Math.abs(idx - currentIndex) <= WINDOW ||
    Math.abs(idx - currentIndex - GALLERY_IMAGES.length) <= WINDOW ||
    Math.abs(idx - currentIndex + GALLERY_IMAGES.length) <= WINDOW;

  if (GALLERY_IMAGES.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-8 group">
      <div className="flex items-center justify-center">
        <div className="font-caramel text-xl leading-4 font-normal text-thema-04-point mb-2 italic">Gallery</div>
      </div>
      <h2 className="font-serif text-xl text-[#333] text-center mb-8">
        사진 갤러리
      </h2>

      <p className="text-xs text-gray-500 text-center mb-2">
        ← 좌우로 스와이프 →
      </p>
      {/* 상단 전체 리스트 (가로 스크롤) - 선택 주변만 실제 이미지 로드 */}
      <div
        ref={stripWrapRef}
        tabIndex={0}
        role="region"
        aria-label="썸네일 목록"
        className="thumb-scroll mb-4 -mx-4 py-3 px-2 bg-gray-50 border-y border-gray-200 overflow-x-scroll overflow-y-hidden scroll-smooth outline-none"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          overscrollBehaviorX: "contain",
        }}
      >
        <div ref={stripRef} className="flex gap-2 px-2 w-max min-w-full">
        {GALLERY_IMAGES.map((_, idx) => (
          <button
            key={idx}
            ref={(el) => { thumbRefs.current[idx] = el; }}
            type="button"
            onClick={(e) => { e.stopPropagation(); goToIndex(idx); }}
            style={{ touchAction: "pan-x" }}
            className={`relative w-14 h-[56px] flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
              idx === currentIndex
                ? "border-thema-04-point ring-2 ring-thema-04-point/30"
                : "border-transparent opacity-70 hover:opacity-100"
            } ${!isInWindow(idx) ? "bg-gray-200" : ""}`}
            aria-label={`${idx + 1}번 사진 선택`}
          >
            {isInWindow(idx) ? (
              <Image
                src={toThumbPath(GALLERY_IMAGES[idx])}
                alt={`미리보기 ${idx + 1}`}
                fill
                className="object-cover select-none pointer-events-none"
                sizes="56px"
                loading="lazy"
                quality={50}
                draggable={false}
              />
            ) : (
              <span className="text-xs text-gray-400 font-gowun">{idx + 1}</span>
            )}
          </button>
        ))}
        </div>
      </div>
      <div className="mx-4 mb-4 h-1.5 bg-gray-200 rounded-full overflow-hidden thumb-scrollbar-track">
        <div ref={scrollbarFillRef} className="thumb-scrollbar-fill h-full w-[20%]" style={{ marginLeft: 0 }} />
      </div>

      <div
        className="relative w-full flex justify-center bg-gray-100 cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          {/* 현재 이미지 (썸네일과 동일한 webp) */}
          <Image
            src={toThumbPath(GALLERY_IMAGES[currentIndex])}
            alt={`갤러리 사진 ${currentIndex + 1}`}
            fill
            className={`object-cover transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="360px"
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? "eager" : undefined}
            onLoad={() => setIsLoaded(true)}
          />
          {/* 다음/이전 이미지 미리 로드 (캐시 적재 → 전환 시 즉시 표시) */}
          <div className="absolute inset-0 opacity-0 pointer-events-none" aria-hidden>
            <Image key={`pre-${nextIdx}`} src={toThumbPath(GALLERY_IMAGES[nextIdx])} alt="" fill className="object-cover" sizes="360px" />
            <Image key={`pre-${prevIdx}`} src={toThumbPath(GALLERY_IMAGES[prevIdx])} alt="" fill className="object-cover" sizes="360px" />
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-[#333] opacity-60 group-hover:opacity-100 hover:bg-white/70 transition-all z-10"
          aria-label="이전 사진"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-[#333] opacity-60 group-hover:opacity-100 hover:bg-white/70 transition-all z-10"
          aria-label="다음 사진"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <p className="font-gowun text-[#555] text-center text-sm mt-4">
        {currentIndex + 1} / {GALLERY_IMAGES.length}
      </p>

      {lightboxOpen && (
        <Lightbox
          src={GALLERY_IMAGES[currentIndex]}
          alt={`갤러리 사진 ${currentIndex + 1}`}
          onClose={() => setLightboxOpen(false)}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={true}
          hasNext={true}
        />
      )}
    </section>
  );
}
