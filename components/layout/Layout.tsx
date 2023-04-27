import HideAppBar from '../ui/NavigationAppBar/HideAppBar';
import { AppProvider } from '../../context/provider';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <AppProvider>
      <HideAppBar />
      {children}
    </AppProvider>
  );
};

export default Layout;
