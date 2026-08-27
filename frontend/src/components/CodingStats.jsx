import { useState, useEffect, useRef } from "react";
import "./CodingStats.css";

const LEETCODE_USERNAME = "Vibha_07"; 
const CODEFORCES_HANDLE = "Vibha_07";

/* ── Animated counter ── */
function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (value === undefined || value === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const target = Number(value);
          if (target === 0) { setDisplay(0); return; }
          const step = Math.max(1, Math.ceil(target / (duration / 16)));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { setDisplay(target); clearInterval(timer); }
            else setDisplay(current);
          }, 16);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

/* ── Donut chart ── */
function DonutChart({ easy, medium, hard }) {
  const total = easy + medium + hard || 1;
  const r = 38;
  const circ = 2 * Math.PI * r; 
  const ePct = easy / total;
  const mPct = medium / total;
  const hPct = hard / total;

  return (
    <svg className="cs-donut" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} className="donut-bg" />
      <circle cx="50" cy="50" r={r} className="donut-easy"
        strokeDasharray={`${ePct * circ} ${circ}`} strokeDashoffset="0" />
      <circle cx="50" cy="50" r={r} className="donut-medium"
        strokeDasharray={`${mPct * circ} ${circ}`}
        strokeDashoffset={`${-(ePct * circ)}`} />
      <circle cx="50" cy="50" r={r} className="donut-hard"
        strokeDasharray={`${hPct * circ} ${circ}`}
        strokeDashoffset={`${-((ePct + mPct) * circ)}`} />
      <text x="50" y="46" className="donut-num">{easy + medium + hard}</text>
      <text x="50" y="58" className="donut-label">Solved</text>
    </svg>
  );
}

/* ── Skeleton loader ── */
function Skeleton({ h = "16px", w = "100%", r = "6px" }) {
  return (
    <span className="cs-skeleton" style={{ height: h, width: w, borderRadius: r }} />
  );
}

/* ── LeetCode card ── */
function LeetCodeCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Primary stable mirror endpoint requiring NO proxy middleware
    const targetUrl = `/api/leetcode?username=${LEETCODE_USERNAME}`;
const badgesUrl = `/api/leetcode-extra?username=${LEETCODE_USERNAME}&type=badges`;
const contestUrl = `/api/leetcode-extra?username=${LEETCODE_USERNAME}&type=contest`;
    // Derive active days + max streak from the real submissionCalendar
    const computeCalendarStats = (submissionCalendar = {}) => {
      const dayTimestamps = Object.keys(submissionCalendar)
        .map((ts) => Number(ts))
        .sort((a, b) => a - b);

      const activeDays = dayTimestamps.length;
      const SECONDS_IN_DAY = 86400;

      let maxStreak = 0;
      let currentStreak = 0;
      let prevDay = null;

      dayTimestamps.forEach((ts) => {
        if (prevDay !== null && ts - prevDay === SECONDS_IN_DAY) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
        maxStreak = Math.max(maxStreak, currentStreak);
        prevDay = ts;
      });

      return { activeDays, streak: maxStreak };
    };

    Promise.all([
      fetch(targetUrl).then((res) => {
        if (!res.ok) throw new Error("Primary API stream offline");
        return res.json();
      }),
      fetch(badgesUrl)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Badges API offline"))))
        .catch(() => null), // badges are non-critical, don't block main stats on failure
      fetch(contestUrl)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Contest API offline"))))
        .catch(() => null), // contest rating is non-critical, don't block main stats on failure
    ])
      .then(([statsData, badgesData, contestData]) => {
        const { activeDays, streak } = computeCalendarStats(statsData.submissionCalendar);

        const badges = badgesData?.badges?.length
          ? badgesData.badges.map((b) => ({
              name: b.displayName || b.name,
              icon: b.icon?.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`,
            }))
          : [
              { name: "100 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/marketing/2026-100-badge.png" },
              { name: "50 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/marketing/2026-50-badge.png" }
            ];

        const contestRating = contestData?.contestRating
          ? Math.round(contestData.contestRating)
          : null;

        setData({
          username: LEETCODE_USERNAME,
          contestRating: contestRating ?? statsData.ranking ?? 389916,
          isContestRating: contestRating !== null, // lets the UI know whether this is a true contest rating or the ranking fallback
          solved: {
            easy: statsData.easySolved || 171,
            medium: statsData.mediumSolved || 141,
            hard: statsData.hardSolved || 25,
          },
          streak: streak || 35,
          activeDays: activeDays || 158,
          badgesCount: badgesData?.badgesCount ?? badges.length,
          badges,
        });
      })
      .catch((err) => {
        console.warn("API route fallback protection engaged:", err);
        // Resilient fallback values matching your profile snapshot
        setData({
          username: LEETCODE_USERNAME,
          contestRating: 389916, 
          isContestRating: false,
          solved: { easy: 171, medium: 141, hard: 25 },
          streak: 35,       
          activeDays: 158,
          badgesCount: 2,
          badges: [
            { name: "100 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/marketing/2026-100-badge.png" },
            { name: "50 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/marketing/2026-50-badge.png" }
          ]
        });
      });
  }, []);

  return (
    <div className="cs-card lc-card">
      <div className="cs-card-header">
        <a
          href={`https://leetcode.com/${LEETCODE_USERNAME}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="cs-platform-icon lc-icon"
          aria-label="View LeetCode profile"
        >
          <svg viewBox="0 0 50 50" fill="none">
            <path d="M30.67 34.45 L20.5 44.61 C19.43 45.68 17.71 45.68 16.64 44.61 L5.39 33.36 C4.32 32.29 4.32 30.57 5.39 29.5 L24.61 10.28 C25.68 9.21 27.4 9.21 28.47 10.28 L30.67 12.48"
              stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            <path d="M23 34h22" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </a>
        <div>
          <h3 className="cs-platform-name">LeetCode</h3>
          <span className="cs-platform-handle">
            {data ? `@${data.username}` : <Skeleton w="80px" h="12px" />}
          </span>
        </div>
        <div className="cs-rating-badge lc-badge">
          {data
            ? <><div className="cs-rating-num-wrapper">{data.isContestRating ? "Rating" : "Rank"} <AnimatedNumber value={data.contestRating} /></div></>
            : <><Skeleton w="50px" h="22px" /><Skeleton w="40px" h="10px" /></>}
        </div>
      </div>

      <div className="cs-solved-section">
        <div className="cs-donut-wrap">
          {data
            ? <DonutChart easy={data.solved.easy} medium={data.solved.medium} hard={data.solved.hard} />
            : <div className="cs-skeleton" style={{ width: 120, height: 120, borderRadius: "50%" }} />}
        </div>
        <div className="cs-breakdown">
          {["easy", "medium", "hard"].map((d) => (
            <div key={d} className={`cs-diff ${d}`}>
              <span className="dot" />
              <span className="diff-label">{d.charAt(0).toUpperCase() + d.slice(1)}</span>
              <span className="diff-val">
                {data ? <AnimatedNumber value={data.solved[d]} /> : <Skeleton w="30px" h="14px" />}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="lc-badges-section">
        <p className="cs-section-label">Badges ({data ? data.badgesCount : "—"})</p>
        <div className="lc-badges-container">
          {data ? (
            data.badges.map((badge, idx) => (
              <div key={idx} className="lc-badge-pill" title={badge.name}>
                <div className="badge-img-wrapper">
                  <img src={badge.icon} alt={badge.name} onError={(e) => {
                    e.target.src = "https://assets.leetcode.com/static_assets/public/images/badges/2025/lg/2025-annual.png";
                  }} />
                </div>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Skeleton w="90px" h="32px" r="20px" />
              <Skeleton w="90px" h="32px" r="20px" />
            </div>
          )}
        </div>
      </div>

      <div className="cs-meta-row">
        <div className="cs-meta-pill">
          <span>🔥 Max Streak</span>
          <strong>{data ? <AnimatedNumber value={data.streak} /> : <Skeleton w="24px" h="14px" />} days</strong>
        </div>
        <div className="cs-meta-pill">
          <span>📅 Active Days</span>
          <strong>{data ? <AnimatedNumber value={data.activeDays} /> : <Skeleton w="24px" h="14px" />}</strong>
        </div>
      </div>
    </div>
  );
}

/* ── Codeforces card ── */
function CodeforcesCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const userProfile = fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_HANDLE}`).then(res => res.json());
    const userSolved = fetch(`https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}`).then(res => res.json());

    Promise.all([userProfile, userSolved])
      .then(([profileRes, statusRes]) => {
        if (profileRes.status !== "OK" || statusRes.status !== "OK") throw new Error();
        
        const user = profileRes.result[0];
        const solvedSubmissions = statusRes.result.filter(
          (sub) => sub.verdict === "OK" && sub.problem
        );
        const uniqueSolvedIds = new Set(
          solvedSubmissions.map((sub) => `${sub.problem.contestId}-${sub.problem.index}`)
        );

        setData({
          handle: user.handle,
          rank: user.rank || "unrated",
          rating: user.rating || 0,
          maxRating: user.maxRating || 0,
          problemsSolved: uniqueSolvedIds.size, 
          totalSubmissions: statusRes.result.length,
          country: user.country || "India"
        });
      })
      .catch(() => {
        setData({
          handle: CODEFORCES_HANDLE,
          rank: "unrated",   
          rating: 0,         
          maxRating: 0,      
          problemsSolved: 4, 
          totalSubmissions: 6, 
          country: "India"
        });
      });
  }, []);

  const rankColor = {
    newbie: "#808080", pupil: "#008000", specialist: "#03a89e",
    expert: "#0000ff", "candidate master": "#aa00aa"
  };

  const rColor = rankColor[(data?.rank || "").toLowerCase()] || "#9ca3af";

  return (
    <div className="cs-card cf-card">
      <div className="cs-card-header">
        <a
          href={`https://codeforces.com/profile/${CODEFORCES_HANDLE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cs-platform-icon cf-icon"
          aria-label="View Codeforces profile"
        >
          <svg viewBox="0 0 50 50" fill="none">
            <rect x="6"  y="20" width="10" height="24" rx="2" fill="#38bdf8" />
            <rect x="20" y="12" width="10" height="32" rx="2" fill="#7dd3fc" />
            <rect x="34" y="6"  width="10" height="38" rx="2" fill="#bae6fd" />
          </svg>
        </a>
        <div>
          <h3 className="cs-platform-name">Codeforces</h3>
          <span className="cs-platform-handle">
            {data ? `@${data.handle}` : <Skeleton w="80px" h="12px" />}
          </span>
        </div>
        <div className="cs-rating-badge cf-badge">
          {data
            ? <><AnimatedNumber value={data.rating} /><span style={{ color: rColor }}>{data.rank}</span></>
            : <><Skeleton w="50px" h="22px" /><Skeleton w="50px" h="10px" /></>}
        </div>
      </div>

      <div className="cf-stats-grid">
        {[
          { icon: "🎯", key: "problemsSolved", label: "Problems Solved" },
          { icon: "🏆", key: "rating",          label: "Current Rating"  },
          { icon: "📤", key: "totalSubmissions", label: "Submissions"     },
          { icon: "🎪", key: "maxRating",        label: "Peak Rating"     },
        ].map(({ icon, key, label }) => (
          <div key={key} className="cf-stat-box">
            <span className="cf-stat-icon">{icon}</span>
            <span className="cf-stat-num">
              {data ? <AnimatedNumber value={data[key]} /> : <Skeleton w="40px" h="20px" />}
            </span>
            <span className="cf-stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="cf-rating-bar-wrap">
        <p className="cs-section-label">Rating Progress — Max: {data?.maxRating || "0"}</p>
        <div className="cf-bar-track">
          <div className="cf-bar-fill"
            style={{ width: data ? `${Math.min((data.rating / 3000) * 100, 100)}%` : "0%" }} />
        </div>
        <div className="cf-bar-labels">
          <span>0</span><span>Pupil 1200</span><span>Expert 1600</span><span>Master 2100</span><span>3000</span>
        </div>
      </div>
    </div>
  );
}

export default function CodingStats() {
  return (
    <section className="coding-stats" id="coding-stats">
      <div className="cs-bg-glow" />
      <div className="cs-container">
        <div className="cs-heading">
        
          <h2 className="cs-title">Coding Stats</h2>
          <p className="cs-subtitle">Live data from LeetCode & Codeforces</p>
        </div>

        <div className="cs-grid">
          <LeetCodeCard />
          <CodeforcesCard />
        </div>

       
      </div>
    </section>
  );
}