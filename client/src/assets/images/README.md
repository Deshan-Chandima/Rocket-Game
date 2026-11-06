# Images Folder

Place your game images, background illustrations, and assets in this folder.

### How to use in React or CSS:

1. **In CSS (`client/src/index.css`):**
   ```css
   background-image: url('./assets/images/background.png');
   ```

2. **In a React Component (`client/src/components/...`):**
   ```jsx
   import bgImage from '../assets/images/background.png';

   <img src={bgImage} alt="Background" />
   ```

