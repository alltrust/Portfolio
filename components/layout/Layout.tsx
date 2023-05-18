import HideAppBar from '../ui/navigation/HideAppBar';
import { AppProvider } from '../../context/provider';
import AlertDisplay from '../ui/alert';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  
  return (
    <AppProvider>
      <HideAppBar />
      {children}
      <AlertDisplay />
    </AppProvider>
  );
};

export default Layout;
