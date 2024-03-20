interface SenceConfig {
  prompt: string;
  model: string;
  cus: boolean;
  ar: string;
  chaos: number;
  s: number;
  q: number;
  tile: boolean;
  v: number;
  images: string[];
  isPublic: boolean;
}

interface SenceType {
  drawType: 'textToImg' | 'mixedImage' | 'spellAnalysis';
  sceneName: string;
  sceneType: string;
  url: string;
  config: any;
}
