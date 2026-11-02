import { useAppDispatch, useAppSelector } from '../hooks';
import { backToBrands } from '../store';
import type { Good } from '../types';

export function AnaloguesTable() {
  const { analogues, step, selectedBrand } = useAppSelector((state) => state.parts);
  const dispatch = useAppDispatch();

  if (step !== 2) return null;

  const getOfferData = (good: Good) => {
    let price = '—';
    const stock = good.count || 0;
    
    if (good.warehouses && good.warehouses.length > 0) {
      const validWarehouse = good.warehouses.find(w => w.price > 0) || good.warehouses[0];
      if (validWarehouse && validWarehouse.price) {
        price = `${validWarehouse.price} ₽`;
      }
    }
    return { price, stock };
  };

  return (
    <div className="card">
      <div className="card-header">
        <span>Шаг 2: Аналоги для {selectedBrand}</span>
        <button className="btn-outline btn-sm" onClick={() => dispatch(backToBrands())}>
          Назад к брендам
        </button>
      </div>
      
      {analogues.length === 0 ? (
        <div className="empty-text">Аналоги не найдены.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Название / Производитель</th>
              <th>Стоимость</th>
              <th>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {analogues.map((item, idx) => {
              const { price, stock } = getOfferData(item);
              return (
                <tr key={idx}>
                  <td>
                    <strong>{item.brand}</strong> <br />
                    <span className="brand-desc">{item.name} (Арт: {item.number})</span>
                  </td>
                  <td>{price}</td>
                  <td>
                    <span className={`badge ${stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                      {stock} шт.
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}