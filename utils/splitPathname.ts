import { NextRouter } from 'next/router';

export const splitPathname = (routerFn: NextRouter): string => {
  const pathname = routerFn.pathname;
  const splitPath = pathname.split('/')[1];
  return splitPath;
};
