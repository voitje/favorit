import { useAppDispatch, useAppSelector } from '../hooks';
import { searchAnalogues } from '../store';

export function BrandList() {
  const { brands, step, searchNumber, loading } = useAppSelector((state) => state.parts);
  const dispatch = useAppDispatch();

  if (step !== 1 || loading || brands.length === 0) return null;

  const handleSelect = (brand: string) => {
    dispatch(searchAnalogues({ number: searchNumber, brand }));
  };

  return (
    <div className="card">
      <div className="card-header">Шаг 1: Выберите производителя</div>
      <ul className="brand-list">
        {brands.map((item, index) => (
          <li key={index} className="brand-item">
            <div>
              <div className="brand-name">{item.brand}</div>
              <div className="brand-desc">{item.name}</div>
            </div>
            <button className="btn-outline btn-sm" onClick={() => handleSelect(item.brand)}>
              Выбрать
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}