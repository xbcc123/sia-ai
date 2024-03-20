import { useLocation } from '@umijs/max';
import {useEffect, useState, useRef} from 'react';

const Iframe = () => {
  const [src, setSrc] = useState('');
  const urlParams = useRef<any>();
  const location = useLocation()

  useEffect(() => {
	urlParams.current = new URLSearchParams(location.search);
	const url = urlParams.current.get('url') || ''
	setSrc(url)
  }, [location.search])

  return (
    <div>
      <iframe src={src} style={{
		border: 'none',
		width: '100%',
		height: "calc(100vh - 50px)"
	  }}></iframe>
    </div>
  );
};

export default Iframe;