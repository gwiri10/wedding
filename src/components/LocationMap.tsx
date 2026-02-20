"use client";

const KAKAO_MAP_URL =
  "https://map.kakao.com/?q=%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EC%A4%91%EC%95%99%EB%8C%80%EB%A1%9C%20640";
const NAVER_MAP_URL =
  "https://map.naver.com/v5/search/%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC%20%EC%A4%91%EC%95%99%EB%8C%80%EB%A1%9C%20640";
const VENUE_NAME = "라온웨딩홀 23층";
const PHONE = "051-631-2121";
const ADDRESS = "부산광역시 부산진구 중앙대로 640";
const OSM_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=129.041%2C35.142%2C129.071%2C35.172&layer=mapnik&marker=35.157%2C129.056";

export default function LocationMap() {
  return (
    <section className="py-8">
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
          <iframe
            src={OSM_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="오시는 길 지도"
            className="absolute inset-0 w-full h-full"
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
