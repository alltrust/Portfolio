import Head from 'next/head';

interface IMainHead {
  title?: string;
  description?: string;
}

const MainHead = ({ title, description }: IMainHead) => {
  return (
    <Head>
      <title>{title ? title : 'Garcia | Aldo'}</title>
      <meta
        name="description"
        content={description ? description : 'Aldo Garcia and his portoflio'}
      ></meta>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default MainHead;
