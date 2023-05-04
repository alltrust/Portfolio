import HideAppBar from '../ui/navigation/HideAppBar';
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
