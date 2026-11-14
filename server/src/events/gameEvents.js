const EventEmitter = require('events');

class GameEventEmitter extends EventEmitter {}

const gameEvents = new GameEventEmitter();

// Event listeners for system logging and audit trails
gameEvents.on('scoreRecorded', (data) => {
  console.log(`📡 [Event: ScoreRecorded] Pilot: ${data.nickname} | Score: ${data.score} | Sector: ${data.level || 1}`);
});

gameEvents.on('userRegistered', (data) => {
  console.log(`👨‍🚀 [Event: UserRegistered] New Pilot Enlisted: ${data.nickname} (${data.email})`);
});

gameEvents.on('userLoggedIn', (data) => {
  console.log(`🔑 [Event: UserLoggedIn] Pilot Authenticated: ${data.nickname}`);
});

module.exports = gameEvents;
