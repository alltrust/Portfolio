import NextImage from 'next/image';
import {useTheme} from 'next-themes'
import { CSSProperties } from 'react';

interface IThemedImage{
    src?: string,
    alt: string,
    sizes: string,
    isMobile?: boolean,
    style?: CSSProperties | undefined
    priority?: boolean
}

const ThemedImage = ({src, alt, sizes, isMobile, style, priority}:IThemedImage)=>{
const  {resolvedTheme } = useTheme()


  const imgOrientation = isMobile ? 'portrait' : 'landscape';
  const imgMode = resolvedTheme === 'dark' ? 'dark' : 'light';

  const heroImg = `/images/hero/${imgOrientation}-${imgMode}.jpg`;

return(
    <NextImage src={src || heroImg} fill alt={alt} sizes={sizes} style={style} priority={priority}/>
)
};

export default ThemedImage;