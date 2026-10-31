import React from 'react';

export default function GenericSection({ view, onNavigate, user }) {
  if (view === 'about') {
    return (
      <div className="retro-section-card">
        <div className="section-header">
          <span className="section-badge">STATION ARCHIVES // SECTOR 07</span>
          <h2 className="section-title">ABOUT SPACE CENTER</h2>
          <div className="section-divider"></div>
        </div>
        <p className="section-lead">
          Founded in orbital quadrant 4X, SPACE CENTER serves as the central interstellar hub for rocket refueling, pilot biometric registration, and galactic deep-space exploration.
        </p>

        <div className="info-grid">
          <div className="info-box">
            <span className="box-icon">🛰️</span>
            <h4>ORBITAL REFUELING</h4>
            <p>Automated quantum fuel extraction stations stationed across planetary asteroid belts.</p>
          </div>
          <div className="info-box">
            <span className="box-icon">🤖</span>
            <h4>AI SENTINELS</h4>
            <p>Autonomous droids maintaining life support, flight telemetry, and docking security.</p>
          </div>
          <div className="info-box">
            <span className="box-icon">🛡️</span>
            <h4>CREW PROTOCOLS</h4>
            <p>Every pilot holds a certified virtual identity logged with tamper-proof encryption.</p>
          </div>
        </div>

        <div className="section-actions">
          <button type="button" className="retro-btn btn-coral" onClick={() => onNavigate('games')}>
            Explore Games
          </button>
          <button type="button" className="retro-btn btn-outline" onClick={() => onNavigate('home')}>
            Back to Center
          </button>
        </div>
      </div>
    );
  }

  if (view === 'games') {
    const gamesList = [
      {
        id: 1,
        title: 'ROCKET FUEL ODYSSEY',
        tag: 'MAIN MISSION',
        desc: 'Pilot your rocket through dangerous asteroid belts while harvesting blue plasma fuel cells.',
        status: 'READY TO LAUNCH',
        accent: 'teal'
      },
      {
        id: 2,
        title: 'NEBULA RAIDER',
        tag: 'ARCADE SHOOTER',
        desc: 'Defend orbital fuel silos from rogue space scavenger drones in fast-paced 8-bit combat.',
        status: 'ONLINE',
        accent: 'coral'
      },
      {
        id: 3,
        title: 'ASTEROID MINER 3000',
        tag: 'RESOURCE SIM',
        desc: 'Survey deep space asteroids, extract rare hyper-matter, and upgrade your thrusters.',
        status: 'EXPEDITION ACTIVE',
        accent: 'amber'
      }
    ];

    return (
      <div className="retro-section-card wide-card">
        <div className="section-header">
          <span className="section-badge">SIMULATION DECK // READY</span>
          <h2 className="section-title">ARCADE & MISSIONS</h2>
          <div className="section-divider"></div>
        </div>

        <div className="games-grid">
          {gamesList.map((game) => (
            <div key={game.id} className={`game-card border-${game.accent}`}>
              <div className="game-card-header">
                <span className={`game-badge badge-${game.accent}`}>{game.tag}</span>
                <span className="game-status">{game.status}</span>
              </div>
              <h3 className="game-title">{game.title}</h3>
              <p className="game-desc">{game.desc}</p>
              <button
                type="button"
                className="retro-btn btn-sm btn-coral"
                onClick={() => {
                  if (user) {
                    onNavigate('welcome');
                  } else {
                    onNavigate('login');
                  }
                }}
              >
                {user ? 'LAUNCH MISSION' : 'LOGIN TO PLAY'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'pricing') {
    const plans = [
      {
        name: 'CADET PASS',
        price: 'FREE',
        period: 'ALWAYS',
        features: [
          'Standard Pilot Identity',
          'Single Rocket Hangar',
          'Standard Plasma Refueling',
          'Access to Public Leaderboards'
        ],
        btnText: 'START FLYING',
        btnAction: () => onNavigate('register'),
        featured: false
      },
      {
        name: 'COMMANDER PRO',
        price: '150 FUEL',
        period: 'PER MONTH',
        features: [
          'Custom Callsign & Emblem',
          'Hyperdrive Warp Thrusters',
          'Priority Docking Rights',
          'Double Fuel Extraction Rate',
          'Exclusive Mission Passes'
        ],
        btnText: 'CLAIM LICENSE',
        btnAction: () => onNavigate(user ? 'welcome' : 'login'),
        featured: true
      },
      {
        name: 'FLEET ADMIRAL',
        price: '400 FUEL',
        period: 'LIFETIME',
        features: [
          'Full Galaxy Map Access',
          'Unlimited Fleet Slots',
          'Direct Comms to Station AI',
          'Immunity to Space Tolls'
        ],
        btnText: 'COMMAND FLEET',
        btnAction: () => onNavigate(user ? 'welcome' : 'register'),
        featured: false
      }
    ];

    return (
      <div className="retro-section-card wide-card">
        <div className="section-header">
          <span className="section-badge">SUPPLY DEPOT // FUEL LICENSES</span>
          <h2 className="section-title">MISSION TIERS</h2>
          <div className="section-divider"></div>
        </div>

        <div className="pricing-grid">
          {plans.map((p, idx) => (
            <div key={idx} className={`pricing-card ${p.featured ? 'featured-plan' : ''}`}>
              {p.featured && <div className="featured-tag">MOST POPULAR</div>}
              <h3 className="plan-name">{p.name}</h3>
              <div className="plan-price-box">
                <span className="price-val">{p.price}</span>
                <span className="price-period">{p.period}</span>
              </div>
              <ul className="plan-features">
                {p.features.map((feat, fidx) => (
                  <li key={fidx}>
                    <span className="bullet">■</span> {feat}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`retro-btn ${p.featured ? 'btn-coral' : 'btn-outline'}`}
                onClick={p.btnAction}
              >
                {p.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'faqs') {
    const faqs = [
      {
        q: 'WHAT IS SPACE CENTER?',
        a: 'SPACE CENTER is an arcade station terminal where pilots register their flight callsign, manage rocket fuel resources, and launch into interactive space simulations.'
      },
      {
        q: 'HOW DO I REGISTER A PILOT CALLSIGN?',
        a: 'Click on the Register button at the top right of the navigation bar, enter your name, nickname, email, and choose a secure password. Your identity will be permanently recorded in the database.'
      },
      {
        q: 'IS MY CREW PASSWORD SECURE?',
        a: 'Yes. All authentication passwords are encrypted using high-grade salted bcrypt hashing before storage in our MySQL flight database.'
      },
      {
        q: 'WHAT HAPPENS ONCE I LOG IN?',
        a: 'You will receive immediate clearance to the Mission Ready terminal with your pilot nickname and authorized system clearance.'
      }
    ];

    return (
      <div className="retro-section-card">
        <div className="section-header">
          <span className="section-badge">FLIGHT INSTRUCTIONS // FAQ</span>
          <h2 className="section-title">FREQUENT QUESTIONS</h2>
          <div className="section-divider"></div>
        </div>

        <div className="faqs-list">
          {faqs.map((item, idx) => (
            <div key={idx} className="faq-item">
              <h4 className="faq-question">
                <span className="faq-q-mark">?</span> {item.q}
              </h4>
              <p className="faq-answer">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="section-actions">
          <button type="button" className="retro-btn btn-coral" onClick={() => onNavigate('login')}>
            Proceed to Login
          </button>
        </div>
      </div>
    );
  }

  // Default: Home View
  return (
    <div className="home-dashboard">
      <div className="quick-action-strip">
        <button
          type="button"
          className="retro-btn btn-coral"
          onClick={() => onNavigate(user ? 'welcome' : 'login')}
        >
          {user ? '🚀 ENTER MISSION DECK' : '⚡ PILOT LOGIN'}
        </button>
        <button
          type="button"
          className="retro-btn btn-outline"
          onClick={() => onNavigate('games')}
        >
          🎮 BROWSE GAMES
        </button>
        {!user && (
          <button
            type="button"
            className="retro-btn btn-teal"
            onClick={() => onNavigate('register')}
          >
            🛡️ ENLIST IDENTITY
          </button>
        )}
      </div>

      <div className="station-features-grid">
        <div className="station-card">
          <div className="card-top">
            <span className="pixel-icon">⛽</span>
            <span className="card-tag">RESOURCE</span>
          </div>
          <h3 className="card-title">PLASMA FUELING</h3>
          <p className="card-desc">
            Harvest pure liquid star fuel directly from stellar flares to propel your vessel through outer orbits.
          </p>
        </div>

        <div className="station-card">
          <div className="card-top">
            <span className="pixel-icon">🛰️</span>
            <span className="card-tag">NAVIGATION</span>
          </div>
          <h3 className="card-title">ORBITAL RADAR</h3>
          <p className="card-desc">
            Advanced sensory arrays detecting gravity wells, black hole anomalies, and approaching spacecraft.
          </p>
        </div>

        <div className="station-card">
          <div className="card-top">
            <span className="pixel-icon">🤖</span>
            <span className="card-tag">DEFENSE</span>
          </div>
          <h3 className="card-title">AUTOMATED SENTINEL</h3>
          <p className="card-desc">
            Autonomous station guardians ensuring safe docking procedures and crew perimeter defense.
          </p>
        </div>
      </div>
    </div>
  );
}
