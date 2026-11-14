const BANANA_API_URL = process.env.BANANA_API_URL || 'https://marcconrad.com/uob/banana/api.php?out=json';

/**
 * Consumes Prof. Marc Conrad's external Banana API with automatic local fallback.
 */
const fetchBananaPuzzle = async () => {
  try {
    const response = await fetch(BANANA_API_URL);
    if (!response.ok) {
      throw new Error(`External Banana API responded with HTTP ${response.status}`);
    }
    const data = await response.json();
    return {
      success: true,
      source: 'Marc Conrad Banana API (UOB Interoperability)',
      question: data.question,
      solution: Number(data.solution)
    };
  } catch (error) {
    console.warn('⚠️ Banana API external fetch issue:', error.message);
    // Reliable fallback puzzle if external server is momentarily unreachable
    return {
      success: true,
      source: 'Local Fallback Space Synthesizer',
      question: 'https://www.sanfoh.com/uob/banana/data/t03ba22752fc047471f63eed3d5n116.png',
      solution: 6
    };
  }
};

module.exports = {
  fetchBananaPuzzle
};
