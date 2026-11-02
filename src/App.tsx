import { useAppSelector } from './hooks';
import { SearchForm } from './components/SearchForm';
import { BrandList } from './components/BrandList';
import { AnaloguesTable } from './components/AnaloguesTable';

function App() {
  const { loading, error } = useAppSelector((state) => state.parts);

  return (
    <div className="container">
      <h1>Поиск автозапчастей</h1>
      
      <SearchForm />

      {loading && <div className="loading-text">Загрузка данных...</div>}

      {error && <div className="error-alert">Ошибка: {error}. Попробуйте еще раз.</div>}

      <BrandList />
      <AnaloguesTable />
    </div>
  );
}

export default App;