"use client";

import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-05-16T16:00:00");
const GROOM_NAME = "이승준";
const BRIDE_NAME = "김인혜";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalDays: days,
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function Calendar({ year, month, highlightDate }: { year: number; month: number; highlightDate: number }) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDay }, (_, i) => daysInPrevMonth - firstDay + i + 1);
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const nextMonthDays = Array.from({ length: 42 - firstDay - daysInMonth }, (_, i) => i + 1);

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-gowun">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`py-1 ${i === 0 ? "text-red-500" : "text-[#333]"}`}
          >
            {day}
          </div>
        ))}
        {prevMonthDays.map((d) => (
          <div key={`p-${d}`} className="py-1.5 text-[#999]">
            {d}
          </div>
        ))}
        {currentMonthDays.map((d) => {
          const isSunday = (firstDay + d - 1) % 7 === 0;
          const isHighlight = d === highlightDate;
          return (
            <div
              key={d}
              className={`py-1.5 ${
                isHighlight
                  ? "bg-[#555] text-white rounded-full mx-auto w-7 flex items-center justify-center"
                  : isSunday
                    ? "text-red-500"
                    : "text-[#333]"
              }`}
            >
              {d}
            </div>
          );
        })}
        {nextMonthDays.map((d) => (
          <div key={`n-${d}`} className="py-1.5 text-[#999]">
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Introduction() {
  const { days, hours, minutes, seconds, totalDays } = useCountdown(WEDDING_DATE);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="py-8 bg-[#f5f5f5]">
      <div className="text-center space-y-6">
        <h2 className="font-caramel text-xl leading-4 font-normal text-thema-04-point mb-2 italic">
          Wedding day
        </h2>
        <div className="space-y-1 font-gowun text-[#333] text-sm">
          <p>2026년 05월 16일</p>
          <p>토요일 오후 4시</p>
        </div>

        <div className="py-4">
          <Calendar year={2026} month={5} highlightDate={16} />
        </div>

        <div className="flex items-center justify-center gap-2 font-gowun">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm min-w-[60px]">
            <p className="text-[#333] font-semibold text-lg">{pad(days)}</p>
            <p className="text-[#999] text-xs">DAYS</p>
          </div>
          <span className="text-[#333] font-semibold">:</span>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm min-w-[60px]">
            <p className="text-[#333] font-semibold text-lg">{pad(hours)}</p>
            <p className="text-[#999] text-xs">HOUR</p>
          </div>
          <span className="text-[#333] font-semibold">:</span>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm min-w-[60px]">
            <p className="text-[#333] font-semibold text-lg">{pad(minutes)}</p>
            <p className="text-[#999] text-xs">MIN</p>
          </div>
          <span className="text-[#333] font-semibold">:</span>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm min-w-[60px]">
            <p className="text-[#333] font-semibold text-lg">{pad(seconds)}</p>
            <p className="text-[#999] text-xs">SEC</p>
          </div>
        </div>

        <p className="font-gowun text-[#333] text-sm pt-2">
          {GROOM_NAME} <span className="text-red-500">♥</span> {BRIDE_NAME}의
          결혼식이 {totalDays}일 남았습니다.
        </p>
      </div>
    </section>
  );
}
