import React, { useState, FC } from 'react';

import CounterElement from '@/components/deals/filter/subComponent/counterElement';
import radio from 'styles/radioButton.module.css';

const BrandTypeOptions: FC = () => {
  const availableOptions = [
    { id: 4343, meta: { name: 'Boho Decor' } },
    { id: 4534, meta: { name: 'Flying Wooden' } },
    { id: 4633, meta: { name: 'LED Lights' } },
    { id: 45643, meta: { name: 'Luxury Palace' } },
    { id: 34564, meta: { name: 'Golden' } },
    { id: 45332, meta: { name: 'Apple' } },
    { id: 45430, meta: { name: 'Samsung' } },
    { id: 343490, meta: { name: 'Hp' } },
  ];
  const [brandTypesOptionVal, setBrandTypesOptionVal] = useState('');
  return (
    <>
      <div className="py-4">
        <CounterElement />
      </div>
      <div className={radio.custom}>
        {availableOptions.map((option) => {
          return (
            <div key={option.id}>
              <div className="flex justify-between py-1">
                <input
                  id={option.id + ''}
                  type="radio"
                  name={option.meta.name}
                  value={brandTypesOptionVal}
                  onChange={(e) => setBrandTypesOptionVal(e.target.value)}
                />
                <label
                  htmlFor={option.id + ''}
                  className="flex cursor-pointer items-center"
                >
                  {option.meta.name}
                </label>
                <div>(3)</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BrandTypeOptions;
