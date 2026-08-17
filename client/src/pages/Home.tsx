/**
 * 디자인 원칙: ‘해안 도감’ — 모래색 기록물 바탕, 청록 항로, 현무암 시간 레일, 감귤색 핵심 일정.
 * 모바일에서 날짜·시간·지도 이동을 빠르게 확인하는 편집형 여행 여정 화면을 유지한다.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Camera,
  CalendarClock,
  Car,
  ChevronRight,
  Clock3,
  CloudRain,
  CloudSun,
  Cloudy,
  Coffee,
  ExternalLink,
  Hotel,
  Info,
  Luggage,
  MapPinned,
  Mountain,
  Navigation,
  Plane,
  Route,
  ShipWheel,
  Star,
  Sun,
  Utensils,
  Waves,
  Wind,
} from "lucide-react";

type Stop = {
  time: string;
  label: string;
  title: string;
  type: string;
  memo: string;
  address: string;
  image: string;
  highlight?: boolean;
  map?: boolean;
};

type Day = {
  id: string;
  date: string;
  weekday: string;
  route: string;
  stay: string;
  note: string;
  image: string;
  weatherDate: string;
  driving: string;
  trafficQuery: string;
  stops: Stop[];
};

type WeatherSummary = {
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  precipitationProbability: number;
};

const photos = {
  airport:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
  car: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85",
  food: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=85",
  seafood:
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=85",
  cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  coast: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=85",
  mountain: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1000&q=85",
  sunset: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1000&q=85",
  stay: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
  snorkel:
    "https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&w=900&q=85",
  walk: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
  ranch: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=900&q=85",
  drive: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=85",
  photo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
};

const days: Day[] = [
  {
    id: "01",
    date: "8/30",
    weekday: "일",
    route: "제주공항 → 서쪽 이동",
    stay: "세리민박",
    note: "12시 도착 후 렌터카를 인수하고, 협재와 신창의 서쪽 바다를 따라갑니다.",
    image: photos.beach,
    weatherDate: "2026-08-30",
    driving: "공항 → 협재 약 45분 · 협재 → 신창 약 25분",
    trafficQuery: "제주국제공항 협재해수욕장 신창풍차해안",
    stops: [
      { time: "12:00", label: "도착", title: "제주국제공항", type: "공항", memo: "12시 도착", address: "제주시 공항로 2", image: photos.airport },
      { time: "12:30", label: "렌트카", title: "롯데렌터카 제주공항점", type: "렌터카", memo: "차량 인수 · 예약번호 확인", address: "제주공항 인근", image: photos.car },
      { time: "13:30", label: "점심", title: "바다술상", type: "식사", memo: "공항 인근 또는 애월 해안도로변에서 점심", address: "제주 제주시 한림읍 한림해안로 582 1, 2층", image: photos.food },
      { time: "14:00", label: "해수욕장", title: "협재해수욕장", type: "레저", memo: "에메랄드빛 바다에서 첫 휴식", address: "제주 제주시 한림읍 협재리 2497-1", image: photos.beach },
      { time: "15:00", label: "해안도로", title: "신창 풍차해안", type: "전망", memo: "풍차와 해안 풍경 감상", address: "제주 제주시 한경면 신창리 1290-3", image: photos.coast },
      { time: "17:00", label: "숙박", title: "세리민박", type: "민박", memo: "1·2일차 숙소 · 예약처 주소 확인", address: "예약 확인 필요", image: photos.stay, highlight: true },
    ],
  },
  {
    id: "02",
    date: "8/31",
    weekday: "월",
    route: "서쪽 해안 · 수월봉 · 노을",
    stay: "세리민박",
    note: "판포에서 시작해 수월봉까지 이어지는 바닷길과 고산리의 노을을 만나는 날입니다.",
    image: photos.coast,
    weatherDate: "2026-08-31",
    driving: "판포 → 수월봉 약 25분 · 수월봉 → 고산리 약 5분",
    trafficQuery: "판포포구 수월봉 고산리",
    stops: [
      { time: "오전", label: "레저", title: "IGH오션레포츠 판포포구점", type: "수상·해양레저", memo: "판포포구 스노클링·해양레저 (선택)", address: "제주시 한경면 판포리 2850-12", image: photos.snorkel },
      { time: "10:00", label: "해안", title: "해안누리길 46코스", type: "도보코스", memo: "무릉리 바닷길 산책", address: "서귀포시 대정읍 무릉리 4097-38", image: photos.walk },
      { time: "12:00", label: "관광", title: "수월봉", type: "봉우리·전망", memo: "화산쇄설층과 서쪽 바다 파노라마", address: "제주시 한경면 고산리", image: photos.mountain },
      { time: "13:00", label: "점심", title: "만덕본가", type: "해물·생선요리", memo: "고산리 현지 식당", address: "제주시 한경면 고산리 3592-1", image: photos.seafood },
      { time: "15:30", label: "카페", title: "CAFE&PUB 바람과노을", type: "카페·디저트", memo: "고산리 노을 전망 카페", address: "제주시 한경면 고산리 3613", image: photos.cafe },
      { time: "18:30", label: "저녁", title: "종배네", type: "돼지고기구이", memo: "흑돼지 저녁", address: "제주 제주시 한경면 고락로 2 1층", image: photos.food },
      { time: "21:00", label: "숙박", title: "세리민박", type: "민박", memo: "2일차 숙소", address: "예약 확인 필요", image: photos.stay },
    ],
  },
  {
    id: "03",
    date: "9/1",
    weekday: "화",
    route: "산방산 → 목장 홀리랜드 → 조천",
    stay: "해 우 (민박)",
    note: "산방산 아래 사계 해안에서 시작해 목장 카페를 거쳐 조천의 숙소로 이동합니다.",
    image: photos.mountain,
    weatherDate: "2026-09-01",
    driving: "산방산 → 대한목장 약 70분 · 대한목장 → 조천 약 45분",
    trafficQuery: "사계해안 대한목장 조천읍",
    stops: [
      { time: "10:00", label: "관광", title: "산양큰엉곶", type: "사진", memo: "사진 스팟", address: "제주 제주시 한경면 연명로 179", image: photos.photo },
      { time: "11:00", label: "해수욕장", title: "사계해안", type: "해변", memo: "산방산과 형제섬 조망", address: "서귀포시 안덕면 사계리", image: photos.mountain },
      { time: "12:30", label: "점심", title: "사계바다 통갈치조림구이 제주산방산점", type: "해물·생선요리", memo: "갈치조림·통갈치", address: "서귀포시 안덕면 사계리 2147-13", image: photos.seafood },
      { time: "13:30", label: "카페", title: "원앤온리", type: "카페·디저트", memo: "사계 바다뷰 카페", address: "서귀포시 안덕면 사계리 86", image: photos.cafe },
      { time: "15:00", label: "목장 카페", title: "대한목장 (홀리랜드)", type: "카페·디저트", memo: "목장 홀리랜드 카페", address: "서귀포시 남원읍 신례리 1918-1", image: photos.ranch, highlight: true },
      { time: "17:00", label: "저녁 준비", title: "조천수산", type: "수산물", memo: "회 포장 → 숙소에서 저녁", address: "제주시 조천읍 조천리 2725-5", image: photos.seafood, highlight: true },
      { time: "20:00", label: "숙박", title: "해 우 (민박)", type: "민박", memo: "3·4일차 숙소", address: "제주시 조천읍 대흘리 1113-83", image: photos.stay, highlight: true },
    ],
  },
  {
    id: "04",
    date: "9/2",
    weekday: "수",
    route: "함덕 · 김녕 → 성산일출봉 일몰",
    stay: "해 우 (민박)",
    note: "동부 해안의 맑은 바다를 따라 달린 뒤 성산일출봉과 광치기해변에서 해 질 무렵을 맞습니다.",
    image: photos.sunset,
    weatherDate: "2026-09-02",
    driving: "함덕 → 김녕 약 20분 · 김녕 → 성산 약 50분",
    trafficQuery: "함덕해수욕장 김녕성세기해변 성산일출봉",
    stops: [
      { time: "09:00", label: "해수욕장", title: "함덕해수욕장", type: "해변", memo: "에메랄드빛 해변 · 숙소 인근", address: "제주시 조천읍 함덕리", image: photos.beach },
      { time: "10:00", label: "해수욕장", title: "김녕성세기해변", type: "해변", memo: "김녕의 맑은 바다", address: "제주시 구좌읍 김녕리", image: photos.coast },
      { time: "11:00", label: "레저", title: "코난비치 스노쿨링 월정점", type: "해양레저", memo: "월정리 스노클링", address: "제주시 구좌읍 월정리 891-7", image: photos.snorkel },
      { time: "13:30", label: "점심", title: "김녕해녀촌", type: "해물·생선요리", memo: "물회·해물", address: "제주시 구좌읍 김녕리 1223-11", image: photos.seafood },
      { time: "14:30", label: "카페", title: "카페공작소", type: "카페", memo: "세화리 카페", address: "제주시 구좌읍 세화리 1477-4", image: photos.cafe },
      { time: "16:00", label: "드라이브", title: "종달리해안도로", type: "해안도로", memo: "종달에서 성산으로 이어지는 해안 드라이브", address: "제주시 구좌읍 종달리 630-1", image: photos.drive },
      { time: "17:30", label: "저녁", title: "복자씨연탄구이 성산본점", type: "돼지고기구이", memo: "성산 저녁 · 연탄구이", address: "서귀포시 성산읍 오조리 367-1", image: photos.food },
      { time: "19:00", label: "일몰", title: "성산일출봉", type: "봉우리·전망", memo: "일몰 감상 · 인근 광치기해변도 추천", address: "서귀포시 성산읍 성산리 1", image: photos.sunset, highlight: true },
      { time: "21:00", label: "숙박", title: "해 우 (민박)", type: "민박", memo: "4일차 숙소", address: "제주시 조천읍 대흘리 1113-83", image: photos.stay },
    ],
  },
  {
    id: "05",
    date: "9/3",
    weekday: "목",
    route: "체크아웃 → 렌터카 반납 → 출발",
    stay: "여행의 끝",
    note: "짐을 정리하고 렌터카를 반납한 뒤, 오전 10시까지 공항에 도착해 12시 항공편을 탑승합니다.",
    image: photos.airport,
    weatherDate: "2026-09-03",
    driving: "대흘리 → 렌터카 반납 약 30분 · 반납점 → 공항 약 10분",
    trafficQuery: "제주시 조천읍 대흘리 롯데렌터카 제주공항점",
    stops: [
      { time: "08:30", label: "체크아웃", title: "해 우 (민박)", type: "민박", memo: "짐 정리 · 반납 준비", address: "제주시 조천읍 대흘리 1113-83", image: photos.stay },
      { time: "09:00", label: "렌트카 반납", title: "롯데렌터카 제주공항점", type: "렌터카", memo: "공항 인근 차량 반납", address: "제주공항 인근", image: photos.car },
      { time: "10:00", label: "도착", title: "제주국제공항", type: "공항", memo: "10시 공항 도착", address: "제주시 공항로 2", image: photos.airport },
      { time: "12:00", label: "출발", title: "항공편 탑승", type: "이동", memo: "12시 비행기", address: "", image: photos.airport, map: false },
    ],
  },
];

function iconFor(type: string) {
  if (type.includes("공항") || type === "이동") return <Plane aria-hidden="true" />;
  if (type.includes("렌터카")) return <Car aria-hidden="true" />;
  if (type.includes("민박")) return <BedDouble aria-hidden="true" />;
  if (type.includes("식사") || type.includes("요리") || type.includes("구이")) return <Utensils aria-hidden="true" />;
  if (type.includes("카페")) return <Coffee aria-hidden="true" />;
  if (type.includes("해변") || type.includes("레저")) return <Waves aria-hidden="true" />;
  if (type.includes("전망") || type.includes("봉우리")) return <Mountain aria-hidden="true" />;
  if (type.includes("사진")) return <Camera aria-hidden="true" />;
  if (type.includes("도로") || type.includes("도보")) return <Route aria-hidden="true" />;
  return <Navigation aria-hidden="true" />;
}

function mapHref(stop: Stop) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stop.title} ${stop.address}`.trim())}`;
}

function kakaoMapHref(stop: Stop) {
  return `https://map.kakao.com/?q=${encodeURIComponent(`${stop.title} ${stop.address}`.trim())}`;
}

function trafficHref(query: string, provider: "google" | "kakao") {
  if (provider === "google") return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
}

function weatherLabel(code: number) {
  if (code === 0) return { label: "맑음", icon: <Sun aria-hidden="true" /> };
  if ([1, 2].includes(code)) return { label: "대체로 맑음", icon: <CloudSun aria-hidden="true" /> };
  if (code === 3 || [45, 48].includes(code)) return { label: "흐림", icon: <Cloudy aria-hidden="true" /> };
  return { label: "비 가능성", icon: <CloudRain aria-hidden="true" /> };
}

function WeatherPanel({ date }: { date: string }) {
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
    endpoint.search = new URLSearchParams({
      latitude: "33.38",
      longitude: "126.53",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "Asia/Seoul",
      start_date: date,
      end_date: date,
    }).toString();
    setIsLoading(true);
    setWeather(null);
    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("weather unavailable");
        return response.json();
      })
      .then((data) => {
        const daily = data.daily;
        if (!daily?.time?.length) throw new Error("weather unavailable");
        setWeather({ weatherCode: daily.weather_code[0], temperatureMax: Math.round(daily.temperature_2m_max[0]), temperatureMin: Math.round(daily.temperature_2m_min[0]), precipitationProbability: Math.round(daily.precipitation_probability_max[0]) });
      })
      .catch(() => setWeather(null))
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [date]);

  const forecastHref = `https://www.google.com/search?q=${encodeURIComponent(`제주도 ${date} 날씨`)}`;
  const condition = weather ? weatherLabel(weather.weatherCode) : null;

  return (
    <article className="utility-card weather-card">
      <div className="utility-icon"><CloudSun aria-hidden="true" /></div>
      <div className="utility-copy">
        <p className="utility-label">당일 예보</p>
        {isLoading ? <strong className="utility-loading">예보 불러오는 중</strong> : weather && condition ? <><strong className="weather-main">{condition.icon}{condition.label} <span>{weather.temperatureMin}° / {weather.temperatureMax}°</span></strong><small>강수확률 최대 {weather.precipitationProbability}% · 제주 북부 기준</small></> : <><strong className="utility-loading">예보 제공 기간 전 또는 갱신 중</strong><small>여행일이 가까워지면 상세 예보가 표시됩니다.</small></>}
      </div>
      <a className="utility-link" href={forecastHref} target="_blank" rel="noreferrer">예보 보기 <ExternalLink aria-hidden="true" /></a>
    </article>
  );
}

function StayPanel({ day }: { day: Day }) {
  const hasStay = day.id !== "05";
  const stayAddress = day.stay === "해 우 (민박)" ? "제주시 조천읍 대흘리 1113-83" : "예약처에서 주소·연락처 확인";
  const stayQuery = day.stay === "해 우 (민박)" ? `${day.stay} ${stayAddress}` : `${day.stay} 제주`;

  return (
    <article className="utility-card stay-card">
      <div className="utility-icon"><Hotel aria-hidden="true" /></div>
      <div className="utility-copy">
        <p className="utility-label">{hasStay ? "숙소 확인" : "출발 준비"}</p>
        <strong>{hasStay ? day.stay : "체크아웃 · 렌터카 반납"}</strong>
        <small>{hasStay ? `${stayAddress} · 체크인 시간은 숙소에 확인` : "항공편 전 렌터카 연료와 반납 위치를 확인하세요."}</small>
      </div>
      {hasStay ? <a className="utility-link" href={`https://map.kakao.com/?q=${encodeURIComponent(stayQuery)}`} target="_blank" rel="noreferrer">숙소 찾기 <ExternalLink aria-hidden="true" /></a> : <CalendarClock aria-hidden="true" className="utility-end-icon" />}
    </article>
  );
}

export default function Home() {
  const [activeDay, setActiveDay] = useState(0);
  const currentDay = days[activeDay];

  return (
    <div className="coastal-app">
      <header className="topbar">
        <a className="brand" href="#schedule" aria-label="제주도 해안 도감 일정으로 이동">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA2NCA2NCc+PGNpcmNsZSBjeD0nMzInIGN5PSczMicgcj0nMzEnIGZpbGw9JyMwODdlOGInLz48cGF0aCBkPSdNMzIgMTMgTDM2IDMwIEwzMiAyOCBMMjggMzAgWicgZmlsbD0nI2ZmZmZmZicvPjxwYXRoIGQ9J00zMiA0MyBMMjggMzAgTDMyIDMyIEwzNiAzMCBaJyBmaWxsPScjOWZkNmRhJy8+PHBhdGggZD0nTTEzIDMyIEwzMCAyOCBMMjggMzIgTDMwIDM2IFonIGZpbGw9JyNmZmZmZmYnIG9wYWNpdHk9JzAuODUnLz48cGF0aCBkPSdNNTEgMzIgTDM0IDM2IEwzNiAzMiBMMzQgMjggWicgZmlsbD0nI2ZmZmZmZicgb3BhY2l0eT0nMC44NScvPjxwYXRoIGQ9J00xOCA0NyBxNyAtNSAxNCAwIHQxNCAwJyBmaWxsPSdub25lJyBzdHJva2U9JyNmZmZmZmYnIHN0cm9rZS13aWR0aD0nMi40JyBzdHJva2UtbGluZWNhcD0ncm91bmQnLz48L3N2Zz4=" alt="해안 항로 로고" />
          <span>
            <b>JEJU</b>
            <em>COASTAL ATLAS</em>
          </span>
        </a>
        <a className="topbar-link" href="#travel-note">여행 메모 <ChevronRight aria-hidden="true" /></a>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img src={photos.beach} alt="협재해수욕장의 제주 바다 풍경" className="hero-image" />
          <div className="hero-scrim" />
          <div className="hero-content">
            <p className="eyebrow">2026 JEJU ISLAND · RENTAL CAR TRIP</p>
            <h1 id="hero-title">길을 따라,<br />바다를 오래 봅니다.</h1>
            <p className="hero-description">8월 30일 일요일부터 9월 3일 목요일까지. 제주 서쪽의 노을과 동쪽의 일몰을 잇는 4박 5일의 항로입니다.</p>
            <div className="trip-stats" aria-label="여행 요약">
              <span><strong>4박 5일</strong> 제주 일주</span>
              <span><strong>롯데렌터카</strong> 이용</span>
            </div>
          </div>
          <div className="hero-route" aria-hidden="true"><span /> <i /> <span /></div>
          <div className="hero-atlas-route" aria-hidden="true"><b /><i /><b /><i /><b /></div>
        </section>

        <section className="route-summary" aria-label="전체 여행 동선">
          <div className="summary-mark"><ShipWheel aria-hidden="true" /></div>
          <div>
            <p className="section-kicker">TRIP ROUTE</p>
            <p>제주공항 <b>→</b> 한림·한경 <b>→</b> 산방산 <b>→</b> 조천·성산 <b>→</b> 제주공항</p>
          </div>
        </section>

        <nav className="day-tabs" aria-label="여행 날짜 선택">
          <div className="day-tabs-inner">
            {days.map((day, index) => (
              <button
                type="button"
                key={day.id}
                className={index === activeDay ? "day-tab is-active" : "day-tab"}
                onClick={() => setActiveDay(index)}
                aria-pressed={index === activeDay}
              >
                <small>DAY {day.id}</small>
                <strong>{day.date}</strong>
                <span>{day.weekday}</span>
              </button>
            ))}
          </div>
        </nav>

        <section id="schedule" className="schedule-section" aria-live="polite">
          <motion.div
            key={currentDay.id}
            className="day-intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="day-image-wrap">
              <img src={currentDay.image} alt={`${currentDay.route}의 제주 풍경`} />
              <div className="day-image-wash" />
              <p>DAY {currentDay.id}</p>
            </div>
            <div className="day-copy">
              <p className="section-kicker">{currentDay.date} · {currentDay.weekday}요일</p>
              <h2>{currentDay.route}</h2>
              <p>{currentDay.note}</p>
              <div className="stay-line"><Luggage aria-hidden="true" /> 오늘의 숙소 <b>{currentDay.stay}</b></div>
            </div>
          </motion.div>

          <motion.section key={`tools-${currentDay.id}`} className="day-utilities" aria-label={`${currentDay.date} 여행 준비 정보`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.04, ease: [0.23, 1, 0.32, 1] }}>
            <WeatherPanel date={currentDay.weatherDate} />
            <article className="utility-card traffic-card">
              <div className="utility-icon"><Clock3 aria-hidden="true" /></div>
              <div className="utility-copy"><p className="utility-label">운전 참고 시간</p><strong>{currentDay.driving}</strong><small><Wind aria-hidden="true" /> 실시간 교통은 출발 직전에 다시 확인하세요.</small></div>
              <div className="traffic-links" aria-label="실시간 교통 지도 링크"><a href={trafficHref(currentDay.trafficQuery, "kakao")} target="_blank" rel="noreferrer">카카오맵</a><a href={trafficHref(currentDay.trafficQuery, "google")} target="_blank" rel="noreferrer">구글 지도</a></div>
            </article>
            <StayPanel day={currentDay} />
          </motion.section>

          <div className="timeline">
            {currentDay.stops.map((stop, index) => (
              <motion.article
                key={`${currentDay.id}-${stop.time}-${stop.title}`}
                className={stop.highlight ? "stop-card is-highlight" : "stop-card"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.035, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="time-rail" aria-hidden="true">
                  <time>{stop.time}</time>
                  <span className="rail-dot">{iconFor(stop.type)}</span>
                  {index !== currentDay.stops.length - 1 && <i className="rail-line" />}
                </div>
                <div className="stop-body">
                  <img className="stop-image" src={stop.image} alt={`${stop.title} 관련 제주 여행 풍경`} loading={index < 2 ? "eager" : "lazy"} />
                  <div className="stop-overlay" />
                  <div className="stop-content">
                    <div className="stop-topline">
                      <span className="stop-label">{stop.label}</span>
                      {stop.highlight && <span className="priority"><Star aria-hidden="true" /> 핵심</span>}
                    </div>
                    <h3>{stop.title}</h3>
                    <p>{stop.memo}</p>
                    {stop.map !== false && <div className="map-buttons" aria-label={`${stop.title} 지도 링크`}><a className="map-button" href={kakaoMapHref(stop)} target="_blank" rel="noreferrer" aria-label={`${stop.title} 카카오맵에서 열기`}><MapPinned aria-hidden="true" /> 카카오맵 <ExternalLink aria-hidden="true" /></a><a className="map-button map-button-secondary" href={mapHref(stop)} target="_blank" rel="noreferrer" aria-label={`${stop.title} 구글 지도에서 열기`}>구글 지도 <ExternalLink aria-hidden="true" /></a></div>}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="travel-note" className="travel-note" aria-labelledby="note-title">
          <div className="note-icon"><Info aria-hidden="true" /></div>
          <div>
            <p className="section-kicker">TRAVEL NOTE</p>
            <h2 id="note-title">지도는 지금 열고, 풍경은 현장에서 오래 보세요.</h2>
            <p>장소 카드에서 <b>카카오맵</b>과 <b>구글 지도</b>를 바로 열 수 있습니다. 예상 운전 시간은 여행 계획용 참고값이며, 출발 직전에는 지도 서비스에서 실제 교통 상황과 영업시간을 확인해 주세요.</p>
          </div>
        </section>
      </main>

      <footer>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA2NCA2NCc+PGNpcmNsZSBjeD0nMzInIGN5PSczMicgcj0nMzEnIGZpbGw9JyMwODdlOGInLz48cGF0aCBkPSdNMzIgMTMgTDM2IDMwIEwzMiAyOCBMMjggMzAgWicgZmlsbD0nI2ZmZmZmZicvPjxwYXRoIGQ9J00zMiA0MyBMMjggMzAgTDMyIDMyIEwzNiAzMCBaJyBmaWxsPScjOWZkNmRhJy8+PHBhdGggZD0nTTEzIDMyIEwzMCAyOCBMMjggMzIgTDMwIDM2IFonIGZpbGw9JyNmZmZmZmYnIG9wYWNpdHk9JzAuODUnLz48cGF0aCBkPSdNNTEgMzIgTDM0IDM2IEwzNiAzMiBMMzQgMjggWicgZmlsbD0nI2ZmZmZmZicgb3BhY2l0eT0nMC44NScvPjxwYXRoIGQ9J00xOCA0NyBxNyAtNSAxNCAwIHQxNCAwJyBmaWxsPSdub25lJyBzdHJva2U9JyNmZmZmZmYnIHN0cm9rZS13aWR0aD0nMi40JyBzdHJva2UtbGluZWNhcD0ncm91bmQnLz48L3N2Zz4=" alt="" />
        <p>JEJU COASTAL ATLAS · 2026.08.30 — 09.03</p>
      </footer>
    </div>
  );
}
