import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Card title="Dashboard de Gestión" className="home-card">
        <p>Monitoreo Integrado de Usuarios y Productos</p>
        
        <div className="flex gap-2 mt-">
          <Button 
            label="Ver Usuarios" 
            icon="pi pi-center" 
            className="p-button-secondary" 
            onClick={() => navigate('/unicorns')}
          />
          <Button 
            label="Ver Productos" center
            icon="pi pi-center" 
            className="p-button-secondary"
            onClick={() => navigate('/products')} 
          />
          <Button 
            label="Ventas" 
            icon="pi pi-center" 
            className="p-button-secondary"
            onClick={() => navigate('/ventas')} 
          />
        </div>
      </Card>
    </div>
  );
};

export default HomeView;