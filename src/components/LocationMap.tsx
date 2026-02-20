"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const KAKAO_MAP_APPKEY = "84f815fb0c0f4e73c21aa079c2eeaf49";
const KAKAO_MAP_URL =
  "https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EC%A4%91%EC%95%99%EB%8C%80%EB%A1%9C%20640";
const NAVER_MAP_URL =
  "https://map.naver.com/v5/search/%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EC%A4%91%EC%95%99%EB%8C%80%EB%A1%9C%20640";
const VENUE_NAME = "라온웨딩홀 23층";
const PHONE = "051-631-2121";
const ADDRESS = "부산광역시 부산진구 중앙대로 640";
const MAP_CENTER = { lat: 35.1497327738588, lng: 129.059753113622 };

declare global {
  interface Window {
    kakao?: {
      maps: {
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: unknown) => unknown;
        Marker: new (options: unknown) => { setMap: (map: unknown) => void };
      };
    };
  }
}

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !mapRef.current || !window.kakao?.maps) return;
    const kakao = window.kakao;
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      MAP_CENTER.lat,
      MAP_CENTER.lng
    );
    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(map);
  }, [scriptReady]);

  return (
    <section className="py-8">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APPKEY}`}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <h2 className="font-serif text-xl text-[#333] text-center mb-8">
        오시는 길
      </h2>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-xl p-6 text-center space-y-1">
          <p className="font-sans font-medium text-[#333] text-base">
            {VENUE_NAME}
          </p>
          <p className="font-sans text-[#555] text-sm">{ADDRESS}</p>
          <a href={`tel:${PHONE.replace(/-/g, "")}`} className="font-sans text-[#555] text-sm hover:text-thema-04-point">
            {PHONE}
          </a>
        </div>
        <div className="overflow-hidden w-[100vw] max-w-[360px] relative left-1/2 -translate-x-1/2">
          <div className="w-full aspect-[4/3] max-h-[220px] relative border-y border-gray-200">
            <div
              ref={mapRef}
              className="absolute inset-0 w-full h-full"
              style={{ minHeight: 180 }}
              title="오시는 길 지도"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <a
            href={KAKAO_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FEE500] text-[#191919] font-sans font-medium text-sm shadow-md hover:shadow-lg transition-shadow"
          >
            카카오맵
          </a>
          <a
            href={NAVER_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#03C75A] text-white font-sans font-medium text-sm shadow-md hover:shadow-lg transition-shadow"
          >
            네이버맵
          </a>
        </div>
      </div>
    </section>
  );
}
