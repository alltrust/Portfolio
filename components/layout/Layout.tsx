import HideAppBar from '../ui/NavigationAppBar/HideAppBar';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <>
      <HideAppBar />
      {children}
    </>
  );
};

export default Layout;
