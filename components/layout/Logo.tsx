import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} style={{display:'flex', padding: '5px'}}>
      <Image
        src={'/images/new_logo.png'}
        alt="A for logo"
        width={50}
        height={50}
      />
    </Link>
  );
};

export default Logo;
