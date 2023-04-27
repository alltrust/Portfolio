import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  children: ReactNode;
}

const Portal = ({ children }: IPortal) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const portal = document.querySelector('#portal');

  if (portal) {
    return mounted ? createPortal(children, portal) : null;
  }
  return
  <></>
};

export default Portal;
