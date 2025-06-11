import { PrimeReactProvider } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Routes, Route, useNavigate } from "react-router-dom";

import UnicornsContainer from "./unicorns/UnicornContainer";
import ProductsPage from "./products";
import SalesPage from './ventas';
import { UnicornProvider } from "./context/UnicornContext";
import HomeView from "./home/HomeView";


const UsuariosPage = () => <h1>Usuarios</h1>;

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Productos',
      icon: 'pi pi-box',
      command: () => navigate('/products')
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-star',
      command: () => navigate('/usuarios')
    },
    {
      label: 'Ventas',
      icon: 'pi pi-shopping-cart',
      command: () => navigate('/ventas')
    }
  ];

  const footerItems = [
    {
      label: 'Términos y Condiciones',
      command: () => navigate('/terms')
    },
    {
      label: 'Política de Privacidad',
      command: () => navigate('/privacy')
    },
    {
      label: 'Contacto',
      icon: 'pi pi-envelope',
      href: 'mailto:contacto@gcsoft.com'
    }
  ];

  return (
    <PrimeReactProvider>
      <div className="flex flex-column min-h-screen">
        <Menubar 
          model={navItems}
          end={
            <div className="flex align-items-center">
              <img src="/logo.png" alt="Logo" width="60" height="60" />
            </div>
          }
          start={<span className="text-xl font-bold"></span>}
          className="shadow-2"
        />

        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route
              path="unicorns"
              element={
                <UnicornProvider>
                  <UnicornsContainer />
                </UnicornProvider>
              }
            />
            <Route path="products" element={<ProductsPage />} />
            <Route path="usuarios" element={<UnicornsContainer />} />
            |<Route path="ventas" element={<SalesPage />} />
          </Routes>
        </div>

        <div className="surface-ground p-4 border-top-1 surface-border">
          <div className="flex justify-content-between align-items-center">
            <div className="flex align-items-center gap-3">
              <span className="text-sm">© 2023 GCsoft</span>
            </div>
            <div className="flex gap-4">
              {footerItems.map((item, index) => (
                item.href ? (
                  <a 
                    key={index}
                    href={item.href}
                    className="cursor-pointer text-sm flex align-items-center gap-1"
                  >
                    {item.icon && <i className={`pi ${item.icon}`}></i>}
                    {item.label}
                  </a>
                ) : (
                  <span 
                    key={index}
                    onClick={item.command}
                    className="cursor-pointer text-sm flex align-items-center gap-1"
                  >
                    {item.icon && <i className={`pi ${item.icon}`}></i>}
                    {item.label}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
