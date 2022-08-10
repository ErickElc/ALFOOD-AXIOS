import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/admin/restaurantes/admin';
import FormularioRestaurantes from './paginas/admin/restaurantes/formRest';
import Header from './componentes/Header/header';
import AdminPratos from './paginas/admin/pratos/admin';
import FormularioPratos from './paginas/admin/pratos/formPratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin/' element={<Header/>}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo/" element={<FormularioRestaurantes/>} />
        <Route path="restaurantes/:id/" element={<FormularioRestaurantes/>} />
        <Route path="pratos/" element={<AdminPratos/>} />
        <Route path="pratos/novo/" element={<FormularioPratos/>} />
        <Route path="pratos/:id/" element={<FormularioPratos/>} />
      </Route>
    </Routes>
  );
}

export default App;
