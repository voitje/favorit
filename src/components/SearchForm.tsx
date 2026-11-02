import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { searchBrands, resetSearch } from '../store';

export function SearchForm() {
  const [number, setNumber] = useState('');
  const dispatch = useAppDispatch();
  const { step } = useAppSelector((state) => state.parts);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (number.trim()) {
      dispatch(searchBrands(number.trim()));
    }
  };

  const handleReset = () => {
    setNumber('');
    dispatch(resetSearch());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Введите артикул (например, 123456)"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        disabled={step === 2}
      />
      <button className="btn-primary" type="submit" disabled={step === 2}>
        Найти
      </button>
      {step === 2 && (
        <button className="btn-outline" type="button" onClick={handleReset}>
          Сбросить
        </button>
      )}
    </form>
  );
}