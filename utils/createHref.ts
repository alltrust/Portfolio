import { ReactNode } from "react";

export const createHref = (
    hrefString: string[] | string | ReactNode | ReactNode[]
  ) => {
    return hrefString?.toString().replaceAll(' ', '-').toLowerCase();
  };