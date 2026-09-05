import React, { useState, useEffect, useRef } from 'react';
import './DecryptedText.css';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const DecryptedText = ({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  animateOn = 'hover',
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  const iterationRef = useRef(0);

  const getNextChar = (originalChar) => {
    if (originalChar === ' ') return ' ';
    if (useOriginalCharsOnly) {
      const chars = text.replace(/\s/g, '');
      return chars[Math.floor(Math.random() * chars.length)];
    }
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const scramble = () => {
    let currentIteration = 0;
    setIsScrambling(true);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              const progress = currentIteration / maxIterations;
              const threshold =
                revealDirection === 'end'
                  ? 1 - index / text.length
                  : index / text.length;
              if (progress > threshold) return char;
            } else if (currentIteration >= maxIterations) {
              return char;
            }
            return getNextChar(char);
          })
          .join('');
      });

      currentIteration++;
      iterationRef.current = currentIteration;

      if (currentIteration > maxIterations + (sequential ? text.length : 0)) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isScrambling) {
      scramble();
    }
  };

  const handleMouseLeave = () => {};

  return (
    <span
      className={`decrypted-text-wrapper ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={`decrypted-text ${className}`}>{displayText}</span>
    </span>
  );
};

export default DecryptedText;
