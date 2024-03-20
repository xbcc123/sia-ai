import { useState } from 'react';

export default () => {
  const [generating, setGenerating] = useState(false);
  return { generating, setGenerating };
};
