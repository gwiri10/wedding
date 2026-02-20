"use client";

import { useCallback } from "react";

const ACCOUNT_INFO = `국민은행 123-45-678901
예금주: 홍길동`;

export default function ActionButtons() {
  const handleCopyAccount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_INFO);
      alert("계좌번호가 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다. 계좌번호를 직접 확인해 주세요.");
    }
  }, []);

  const handleKakaoShare = useCallback(() => {
    if (typeof window === "undefined") return;
    const shareUrl = window.location.href;
    const shareTitle = "청첩장";
    const shareDescription = "함께해 주셔서 감사합니다";
    const kakaoShareUrl = `https://story.kakao.com/share?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(kakaoShareUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section className="py-8">
      <h2 className="sr-only">공유 및 계좌</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleCopyAccount}
          className="w-full py-4 px-6 rounded-2xl bg-[#E3C9A8] text-[#333] font-sans font-medium text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          계좌번호 복사
        </button>
        <button
          onClick={handleKakaoShare}
          className="w-full py-4 px-6 rounded-2xl bg-[#E3C9A8] text-[#333] font-sans font-medium text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          카카오톡 공유
        </button>
      </div>
    </section>
  );
}
