import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

//perhaps import state and is !showModal
interface IPortal {
  children: ReactNode;
}

const Portal = ({ children }: IPortal) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const portal = document.getElementById('portal') as HTMLElement;

  return mounted ? createPortal(children, portal) : null;
};

export default Portal;
