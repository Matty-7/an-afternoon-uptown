'use client';

import { useState } from 'react';

export function MortgageCheck({
  id,
  question,
  answer,
}: {
  id: string;
  question: string;
  answer: string;
}) {
  const [revealed, set_revealed] = useState(false);
  return (
    <section className="atlas-check" aria-label="Check your understanding">
      <h3>Check your understanding</h3>
      <p>
        <strong>{question}</strong>
      </p>
      <button
        className="atlas-text-button"
        aria-expanded={revealed}
        aria-controls={`answer-${id}`}
        onClick={() => set_revealed(!revealed)}
      >
        {revealed ? 'Hide answer' : 'Reveal answer'}
      </button>
      <p id={`answer-${id}`} hidden={!revealed}>
        {answer}
      </p>
    </section>
  );
}
