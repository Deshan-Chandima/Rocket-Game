import React, { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = 'http://localhost:5000/api';
const DIRECT_BANANA_URL = 'https://marcconrad.com/uob/banana/api.php?out=json';

// Multi-Level Progression Configurations (Level 1: 35s, Level 2: 25s, Level 3: 20s)
export const LEVEL_CONFIGS = {
  1: {
    number: 1,
    name: 'EARTH ORBITAL ESCAPE',
    sector: 'SECTOR 01',
    maxTime: 35,
    pointsPerCorrect: 1000,
    fuelPerCorrect: 25,
    bonusPerSecond: 40,
    clearBonus: 2000,
    badge: '🌍 EARTH ORBIT',
    atmosphere: 'EARTH STRATOSPHERE',
    ladderTags: ['DEEP SPACE', 'ORBIT', 'MESO', 'STRATO', 'PAD']
  },
  2: {
    number: 2,
    name: 'ASTEROID BELT TRANSIT',
    sector: 'SECTOR 02',
    maxTime: 25,
    pointsPerCorrect: 1500,
    fuelPerCorrect: 25,
    bonusPerSecond: 60,
    clearBonus: 3000,
    badge: '☄️ ASTEROID BELT',
    atmosphere: 'ASTEROID CORRIDOR',
    ladderTags: ['WARP GATE', 'FLARE ZONE', 'ASTEROID', 'DEBRIS', 'ORBIT']
  },
  3: {
    number: 3,
    name: 'HYPER-WARP GATEWAY',
    sector: 'SECTOR 03',
    maxTime: 20,
    pointsPerCorrect: 2000,
    fuelPerCorrect: 25,
    bonusPerSecond: 80,
    clearBonus: 5000,
    badge: '⚡ HYPER-WARP',
    atmosphere: 'DEEP SPACE NEBULA',
    ladderTags: ['HYPERSPACE', 'SINGULARITY', 'RELATIVISTIC', 'WARP INFLUX', 'SUB-LIGHT']
  }
};

export default function GameArena({ user, onNavigate, initialLevel = 1 }) {
  const isGuest = user?.isGuest;
  const nickname = user?.nickname || (isGuest ? 'Guest Pilot' : 'Pilot');

  // Game state
  const [level, setLevel] = useState(initialLevel || 1);
  const currentConfig = LEVEL_CONFIGS[level] || LEVEL_CONFIGS[1];

  const [puzzle, setPuzzle] = useState(null); // { question, solution }
  const [loadingPuzzle, setLoadingPuzzle] = useState(true);
  const [score, setScore] = useState(0);
  const [fuel, setFuel] = useState(0); // 0 to 100%
  const [shields, setShields] = useState(3); // 3 lives
  const [timeLeft, setTimeLeft] = useState(currentConfig.maxTime);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'sector_cleared' | 'won' | 'gameover'
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong' | 'timeout', text: string }
  const [rocketAnimation, setRocketAnimation] = useState('idle'); // 'idle' | 'boost' | 'wobble' | 'launch'

  const timerRef = useRef(null);
  const isSubmittingRef = useRef(false);

  // Fetch puzzle from Banana API (via Express or direct fallback)
  const fetchNextPuzzle = useCallback(async (targetLvl = level) => {
    const config = LEVEL_CONFIGS[targetLvl] || LEVEL_CONFIGS[1];
    setLoadingPuzzle(true);
    setFeedback(null);
    setRocketAnimation('idle');
    isSubmittingRef.current = false;

    try {
      // First try local backend API (Full-Stack Interoperability)
      let data = null;
      try {
        const response = await fetch(`${API_BASE}/game/banana-puzzle`);
        if (response.ok) {
          data = await response.json();
        }
      } catch {
        // Fallback to direct external Banana API
      }

      if (!data || !data.question) {
        const directRes = await fetch(DIRECT_BANANA_URL);
        const directData = await directRes.json();
        data = {
          question: directData.question,
          solution: Number(directData.solution)
        };
      }

      setPuzzle({
        question: data.question,
        solution: Number(data.solution)
      });
      setTimeLeft(config.maxTime);
    } catch (err) {
      console.error('Failed to fetch Banana API puzzle:', err);
      // Emergency fallback
      setPuzzle({
        question: 'https://www.sanfoh.com/uob/banana/data/t03ba22752fc047471f63eed3d5n116.png',
        solution: 6
      });
      setTimeLeft(config.maxTime);
    } finally {
      setLoadingPuzzle(false);
    }
  }, [level]);

  // Initial load
  useEffect(() => {
    fetchNextPuzzle(level);
  }, [fetchNextPuzzle, level]);

  // Handle Game Victory or Game Over - Score saving
  const handleGameEnd = useCallback((finalScore, result, endLevel = level) => {
    setGameState(result);
    clearInterval(timerRef.current);
    if (result === 'won') {
      setRocketAnimation('launch');
    }

    // Save score to local storage
    if (user) {
      const currentBest = Number(localStorage.getItem(`spacefuel_top_${user.id || user.nickname}`)) || 0;
      if (finalScore > currentBest) {
        localStorage.setItem(`spacefuel_top_${user.id || user.nickname}`, finalScore);
      }

      // If registered pilot, save to MySQL database
      if (!isGuest) {
        fetch(`${API_BASE}/game/save-score`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            nickname: user.nickname,
            score: finalScore,
            level: endLevel
          })
        }).catch(err => console.warn('Could not post score to server:', err));
      }
    }
  }, [user, isGuest, level]);

  // Countdown Timer Hook (Event-Driven)
  useEffect(() => {
    if (gameState !== 'playing' || loadingPuzzle) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return currentConfig.maxTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState, loadingPuzzle, puzzle, level, currentConfig.maxTime]);

  // Handle Timeout Event
  const handleTimeout = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setRocketAnimation('wobble');

    setShields((prevShields) => {
      const updated = prevShields - 1;
      if (updated <= 0) {
        handleGameEnd(score, 'gameover', level);
      } else {
        setFeedback({
          type: 'timeout',
          text: '⚠️ REACTOR TIMEOUT! SHIELD DAMAGED'
        });
        setTimeout(() => fetchNextPuzzle(level), 1200);
      }
      return updated;
    });
  };

  // Handle User Input (Clicking Keypad or typing 0-9)
  const handleAnswer = (selectedNum) => {
    if (gameState !== 'playing' || loadingPuzzle || isSubmittingRef.current || !puzzle) return;
    isSubmittingRef.current = true;

    const isCorrect = selectedNum === puzzle.solution;

    if (isCorrect) {
      // Calculate score with time bonus
      const bonus = timeLeft * currentConfig.bonusPerSecond;
      const earned = currentConfig.pointsPerCorrect + bonus;
      const newScore = score + earned;
      const newFuel = Math.min(100, fuel + currentConfig.fuelPerCorrect);

      setScore(newScore);
      setFuel(newFuel);
      setRocketAnimation('boost');
      setFeedback({
        type: 'correct',
        text: `✅ FORMULA STABILIZED! +${earned.toLocaleString()} PTS (+${currentConfig.fuelPerCorrect}% FUEL)`
      });

      // Check win condition (Fuel Tank reaches 100%)
      if (newFuel >= 100) {
        if (level < 3) {
          // Sector Cleared! Show transition modal
          setTimeout(() => {
            clearInterval(timerRef.current);
            setGameState('sector_cleared');
          }, 800);
        } else {
          // All 3 Levels cleared! Final Grand Victory!
          const grandTotal = newScore + currentConfig.clearBonus;
          setScore(grandTotal);
          setTimeout(() => {
            handleGameEnd(grandTotal, 'won', 3);
          }, 800);
        }
      } else {
        setTimeout(() => {
          fetchNextPuzzle(level);
        }, 1100);
      }
    } else {
      // Wrong answer
      const updatedShields = shields - 1;
      setShields(updatedShields);
      setRocketAnimation('wobble');
      setFeedback({
        type: 'wrong',
        text: `⚠️ CALIBRATION MISMATCH! (Correct: ${puzzle.solution})`
      });

      if (updatedShields <= 0) {
        setTimeout(() => {
          handleGameEnd(score, 'gameover', level);
        }, 1000);
      } else {
        setTimeout(() => {
          fetchNextPuzzle(level);
        }, 1200);
      }
    }
  };

  // Advance to Next Level / Sector
  const handleAdvanceSector = () => {
    const nextLevel = level + 1;
    const nextConfig = LEVEL_CONFIGS[nextLevel];
    const scoreWithBonus = score + currentConfig.clearBonus;

    setScore(scoreWithBonus);
    setLevel(nextLevel);
    setFuel(0);
    setShields((prev) => Math.min(3, prev + 1)); // Reward: +1 Shield repair
    setTimeLeft(nextConfig.maxTime);
    setGameState('playing');
    setRocketAnimation('idle');
    setFeedback({
      type: 'correct',
      text: `🚀 ENTERING ${nextConfig.name}! TIME PER PUZZLE: ${nextConfig.maxTime}s`
    });
    fetchNextPuzzle(nextLevel);
  };

  // Keyboard Event Listener (0 - 9)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 0 && num <= 9) {
        handleAnswer(num);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Reset & Play Again
  const handleRestart = () => {
    setScore(0);
    setFuel(0);
    setShields(3);
    setLevel(1);
    setTimeLeft(LEVEL_CONFIGS[1].maxTime);
    setGameState('playing');
    setRocketAnimation('idle');
    fetchNextPuzzle(1);
  };

  // Altitude text helper
  const getAltitudeStageName = () => {
    const stages = currentConfig.ladderTags;
    if (fuel >= 100) return stages[0];
    if (fuel >= 75) return stages[1];
    if (fuel >= 50) return stages[2];
    if (fuel >= 25) return stages[3];
    return stages[4];
  };

  return (
    <div className="retro-auth-card game-arena-card w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-space-border shadow-glow-coral">
      {/* Top HUD Terminal Header */}
      <div className="card-terminal-bar game-hud-bar flex items-center justify-between px-4 py-2 bg-space-surface border-b border-space-border">
        <div className="hud-left flex items-center gap-2">
          <span className="terminal-dot green"></span>
          <span className="hud-callsign font-arcade text-xs text-space-green font-bold">👨‍🚀 {nickname}</span>
          {isGuest && <span className="guest-badge-sm font-arcade text-xs px-1.5 py-0.5 rounded bg-space-dark text-space-amber border border-space-amber">GUEST</span>}
        </div>
        <div className="hud-center">
          <span className="hud-mission-title font-pixel text-xs sm:text-sm text-space-coral tracking-wider">STAR PLASMA SYNTHESIZER</span>
        </div>
        <div className="hud-right flex items-center gap-1.5 font-arcade text-xs">
          <span className="hud-score-label text-space-muted">SCORE:</span>
          <span className="hud-score-val text-space-amber font-bold font-pixel text-sm">{score.toLocaleString()}</span>
        </div>
      </div>

      {/* Cockpit Gauges Bar: Fuel & Shields & Timer */}
      <div className="cockpit-telemetry-row flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-space-surface/90 border-b border-space-border">
        {/* Fuel Gauge */}
        <div className="fuel-gauge-box flex-1 min-w-[140px]">
          <div className="gauge-label-row flex justify-between font-arcade text-xs mb-1">
            <span className="gauge-label text-space-teal">🚀 ROCKET FUEL</span>
            <span className="gauge-val text-space-amber font-bold">{fuel}%</span>
          </div>
          <div className="fuel-progress-track w-full h-2 rounded bg-space-dark overflow-hidden">
            <div
              className="fuel-progress-fill h-full transition-all duration-300"
              style={{
                width: `${fuel}%`,
                background: fuel >= 75 ? '#4ade80' : fuel >= 40 ? '#f7ca74' : '#f59779'
              }}
            ></div>
          </div>
        </div>

        {/* Shields / Lives */}
        <div className="shields-box flex items-center gap-2">
          <span className="shields-label font-arcade text-xs text-space-muted">SHIELDS:</span>
          <div className="shields-icons flex gap-1">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`shield-heart text-sm transition-transform duration-200 ${s <= shields ? 'active scale-100' : 'depleted opacity-40 scale-90'}`}
              >
                {s <= shields ? '❤️' : '🖤'}
              </span>
            ))}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className={`countdown-timer-box flex items-center gap-1 px-2.5 py-1 rounded bg-space-dark border border-space-border font-arcade text-xs ${timeLeft <= 5 ? 'timer-critical text-space-red border-red-500 animate-pulse' : 'text-space-amber'}`}>
          <span className="timer-icon">⏱️</span>
          <span className="timer-val font-bold">{timeLeft}s</span>
        </div>

        {/* Level / Sector HUD Badge */}
        <div className="sector-hud-badge font-arcade text-xs px-2.5 py-1 rounded bg-teal-950/40 text-space-teal border border-space-teal">
          <span>{currentConfig.badge} &bull; LVL 0{level}/3</span>
        </div>
      </div>

      {/* Main Split Gameplay Area: Upgraded Left Visual Silo + Right Synthesizer Terminal */}
      <div className="gameplay-split-deck">
        {/* LEFT PANEL: High-Detail Visual Rocket Flight Silo */}
        <div className="rocket-silo-panel">
          <div className="silo-header">
            <span className="silo-title">{currentConfig.sector}</span>
            <span className="silo-indicator">{fuel}% &bull; {getAltitudeStageName()}</span>
          </div>

          <div className="silo-chamber">
            {/* Atmospheric Background Layers (Stars, Orbit Moon, Clouds) */}
            <div className="silo-atmosphere-layer" aria-hidden="true">
              <span className="silo-star star-p1">✦</span>
              <span className="silo-star star-p2">★</span>
              <span className="silo-star star-p3">✦</span>
              <span className="silo-orbit-planet">{level === 1 ? '🪐' : level === 2 ? '☄️' : '🌌'}</span>
              <span className="silo-cloud cloud-1">{level === 1 ? '☁️' : '✨'}</span>
              <span className="silo-cloud cloud-2">{level === 1 ? '☁️' : '⚡'}</span>
            </div>

            {/* Left Lane: Non-overlapping Altitude Ladder with Pointer */}
            <div className="altitude-ladder-lane">
              <div className={`ladder-step ${fuel >= 100 ? 'ladder-active' : ''}`}>
                <span className="ladder-mark">100%</span>
                <span className="ladder-tag">{currentConfig.ladderTags[0]}</span>
              </div>
              <div className={`ladder-step ${fuel >= 75 && fuel < 100 ? 'ladder-active' : ''}`}>
                <span className="ladder-mark">75%</span>
                <span className="ladder-tag">{currentConfig.ladderTags[1]}</span>
              </div>
              <div className={`ladder-step ${fuel >= 50 && fuel < 75 ? 'ladder-active' : ''}`}>
                <span className="ladder-mark">50%</span>
                <span className="ladder-tag">{currentConfig.ladderTags[2]}</span>
              </div>
              <div className={`ladder-step ${fuel >= 25 && fuel < 50 ? 'ladder-active' : ''}`}>
                <span className="ladder-mark">25%</span>
                <span className="ladder-tag">{currentConfig.ladderTags[3]}</span>
              </div>
              <div className={`ladder-step ${fuel < 25 ? 'ladder-active' : ''}`}>
                <span className="ladder-mark">0%</span>
                <span className="ladder-tag">{currentConfig.ladderTags[4]}</span>
              </div>
            </div>

            {/* Center/Right Flight Channel: Clear path for Rocket Ascent */}
            <div className="rocket-flight-channel">
              {/* Ascending Rocket Ship */}
              <div
                className={`visual-rocket-wrapper animation-${rocketAnimation}`}
                style={{ bottom: `calc(${fuel * 0.72}% + 14px)` }}
              >
                {/* Visual Altitude Needle */}
                <span className="altitude-pointer-indicator" aria-hidden="true">◀</span>

                {/* Pixel Rocket Ship Graphic */}
                <div className="rocket-ship-graphic">
                  <svg
                    width="46"
                    height="76"
                    viewBox="0 0 46 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rocket-svg"
                  >
                    {/* Glowing Beacon Antenna */}
                    <line x1="23" y1="0" x2="23" y2="4" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="23" cy="1" r="2" fill="#ef4444" className="antenna-beacon" />

                    {/* Rocket Nose Cone with shading */}
                    <path d="M23 4L13 22H33L23 4Z" fill="#f59779" stroke="#0c121b" strokeWidth="1.5" />
                    <path d="M23 4L23 22H33L23 4Z" fill="#ea7a57" />

                    {/* Main Fuselage Body */}
                    <rect x="13" y="22" width="20" height="34" rx="3" fill="#fdfbf7" stroke="#0c121b" strokeWidth="1.5" />
                    <rect x="23" y="22" width="10" height="34" rx="0" fill="#f1ece1" />

                    {/* Cockpit Porthole Window with Inner Pilot View */}
                    <circle cx="23" cy="34" r="5.5" fill="#0c121b" />
                    <circle cx="23" cy="34" r="4.5" fill="#8ec5c2" />
                    <circle cx="21" cy="32" r="1.5" fill="#ffffff" />

                    {/* Body Racing Stripes */}
                    <rect x="13" y="44" width="20" height="3" fill="#f59779" />
                    <rect x="13" y="49" width="20" height="2" fill="#f7ca74" />

                    {/* Left Heavy Booster Wing */}
                    <path d="M13 38L3 56H13V38Z" fill="#f7ca74" stroke="#0c121b" strokeWidth="1.5" />
                    <rect x="5" y="48" width="5" height="7" fill="#e5b355" />

                    {/* Right Heavy Booster Wing */}
                    <path d="M33 38L43 56H33V38Z" fill="#f7ca74" stroke="#0c121b" strokeWidth="1.5" />
                    <rect x="36" y="48" width="5" height="7" fill="#d49f3e" />

                    {/* Center Tail Fin */}
                    <path d="M21 56H25V60H21V56Z" fill="#f59779" stroke="#0c121b" strokeWidth="1" />

                    {/* Dual Engine Thruster Nozzles */}
                    <rect x="15" y="56" width="6" height="4" rx="1" fill="#334155" stroke="#0c121b" strokeWidth="1" />
                    <rect x="25" y="56" width="6" height="4" rx="1" fill="#334155" stroke="#0c121b" strokeWidth="1" />
                  </svg>

                  {/* Multi-Layered Animated Plasma Thruster Flames */}
                  <div className={`thruster-flame-container ${rocketAnimation === 'boost' ? 'boost-flame' : ''}`}>
                    <div className="flame-plume flame-plume-left">
                      <div className="plasma-flame flame-outer"></div>
                      <div className="plasma-flame flame-inner"></div>
                    </div>
                    <div className="flame-plume flame-plume-right">
                      <div className="plasma-flame flame-outer"></div>
                      <div className="plasma-flame flame-inner"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Launch Gantry Service Tower */}
              <div className="launch-gantry-tower" aria-hidden="true">
                <div className="gantry-beacon beacon-top"></div>
                <div className="gantry-lattice lattice-1"></div>
                <div className="gantry-lattice lattice-2"></div>
                <div className="gantry-lattice lattice-3"></div>
                <div className="gantry-arm arm-top"></div>
                <div className="gantry-arm arm-mid"></div>
              </div>
            </div>

            {/* Launchpad Base Floor with Hazard Stripes & Steam */}
            <div className="launchpad-gantry-base">
              <div className="hazard-stripes-bar"></div>
              <div className="gantry-steam steam-1"></div>
              <div className="gantry-steam steam-2"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Banana API Fuel Synthesizer Terminal & Keypad */}
        <div className="synthesizer-panel">
          <div className="synthesizer-screen">
            <div className="crt-terminal-header">
              <span className="crt-badge">INTEROPERABILITY API: BANANA PUZZLE</span>
              <span className="crt-instructions">SOLVE THE EQUATION TO SYNTHESIZE FUEL</span>
            </div>

            {/* Feedback alert (Correct / Wrong / Timeout) */}
            {feedback && (
              <div className={`puzzle-feedback-banner feedback-${feedback.type}`}>
                {feedback.text}
              </div>
            )}

            {/* Puzzle Image Container */}
            <div className="crt-screen-content">
              {loadingPuzzle ? (
                <div className="puzzle-loading-state">
                  <span className="loading-radar">⚡</span>
                  <p className="loading-text">SYNTHESIZING STAR PLASMA FORMULA...</p>
                  <span className="loading-sub">[ QUERYING BANANA REST API ]</span>
                </div>
              ) : puzzle?.question ? (
                <div className="puzzle-image-wrap">
                  <img
                    src={puzzle.question}
                    alt="Star Plasma Formula Puzzle"
                    className="puzzle-image"
                    loading="eager"
                  />
                </div>
              ) : (
                <div className="puzzle-loading-state">
                  <p className="loading-text">⚠️ SENSOR INTERFERENCE DETECTED</p>
                </div>
              )}
            </div>
          </div>

          {/* Arcade Keypad (0 - 9) */}
          <div className="arcade-keypad-section">
            <span className="keypad-prompt font-arcade text-xs text-space-muted">
              INPUT MISSING VALUE (CLICK BUTTON OR PRESS KEY 0-9):
            </span>
            <div className="arcade-keypad-grid grid grid-cols-5 gap-2 mt-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  className="keypad-btn transition-all duration-150 hover:scale-105 active:scale-95 font-pixel text-lg py-2.5"
                  disabled={loadingPuzzle || isSubmittingRef.current || gameState !== 'playing'}
                  onClick={() => handleAnswer(digit)}
                >
                  {digit}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Abort Option */}
      <div className="game-footer-actions">
        <button
          type="button"
          className="retro-btn btn-outline btn-sm abort-btn"
          onClick={() => onNavigate('welcome')}
        >
          ✕ RETURN TO COCKPIT HUD
        </button>
      </div>

      {/* SECTOR CLEARED TRANSITION MODAL (LEVEL 1 & LEVEL 2) */}
      {gameState === 'sector_cleared' && (
        <div className="game-overlay-modal">
          <div className="overlay-modal-card sector-cleared-modal">
            <span className="overlay-icon">🎉</span>
            <h2 className="overlay-title">SECTOR 0{level} CLEARED!</h2>
            <p className="overlay-subtitle">{currentConfig.name} ACCOMPLISHED</p>

            <div className="sector-rewards-box">
              <div className="reward-line">
                <span className="reward-title">SECTOR BONUS:</span>
                <span className="reward-val">+{currentConfig.clearBonus.toLocaleString()} PTS</span>
              </div>
              <div className="reward-line">
                <span className="reward-title">SHIELD REPAIRED:</span>
                <span className="reward-val" style={{ color: '#4ade80' }}>+1 GENERATOR (❤️)</span>
              </div>
              <div className="reward-line">
                <span className="reward-title">NEXT SECTOR:</span>
                <span className="reward-val" style={{ color: '#38bdf8' }}>
                  LEVEL 0{level + 1} ({LEVEL_CONFIGS[level + 1]?.maxTime}s TIMER)
                </span>
              </div>
            </div>

            <div className="overlay-actions">
              <button
                type="button"
                className="retro-btn btn-coral"
                onClick={handleAdvanceSector}
              >
                🚀 ENGAGE SECTOR 0{level + 1} ({LEVEL_CONFIGS[level + 1]?.maxTime}s)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME WON MODAL (ALL 3 LEVELS CLEARED) */}
      {gameState === 'won' && (
        <div className="game-overlay-modal">
          <div className="overlay-modal-card win-modal">
            <span className="overlay-icon">🏆</span>
            <h2 className="overlay-title">GALAXY CHAMPION!</h2>
            <p className="overlay-subtitle">ALL 3 MISSION SECTORS CONQUERED • HYPER-WARP ACHIEVED</p>

            <div className="overlay-score-summary">
              <span className="summary-label">FINAL FLIGHT SCORE (LEVEL 03)</span>
              <span className="summary-score">{score.toLocaleString()} PTS</span>
            </div>

            {isGuest ? (
              <p className="guest-win-notice">
                💡 Flying as Guest. Register an identity to submit high scores to the Galaxy Leaderboard!
              </p>
            ) : (
              <p className="auth-win-notice">
                🏆 Score saved to pilot records! Leaderboard standings updated at Level 3.
              </p>
            )}

            <div className="overlay-actions">
              <button
                type="button"
                className="retro-btn btn-coral"
                onClick={handleRestart}
              >
                ▶ PLAY AGAIN
              </button>
              <button
                type="button"
                className="retro-btn btn-outline"
                onClick={() => onNavigate('home')}
              >
                ✕ MAIN MENU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER MODAL */}
      {gameState === 'gameover' && (
        <div className="game-overlay-modal">
          <div className="overlay-modal-card lose-modal">
            <span className="overlay-icon">💥</span>
            <h2 className="overlay-title">MISSION TERMINATED</h2>
            <p className="overlay-subtitle">FAILED AT SECTOR 0{level}: {currentConfig.name}</p>

            <div className="overlay-score-summary">
              <span className="summary-label">TOTAL SCORE HARVESTED</span>
              <span className="summary-score">{score.toLocaleString()} PTS</span>
            </div>

            <div className="overlay-actions">
              <button
                type="button"
                className="retro-btn btn-coral"
                onClick={handleRestart}
              >
                🔄 RETRY MISSION
              </button>
              <button
                type="button"
                className="retro-btn btn-outline"
                onClick={() => onNavigate('home')}
              >
                ✕ RETURN TO BASE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
