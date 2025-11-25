import React, { useState } from 'react';
import './styles.css';

export const Home = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleToggleSign = () => {
    const newValue = parseFloat(display) * -1;
    setDisplay(String(newValue));
  };

  const handlePercent = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator-container" data-easytag="id1-react/src/components/Home/index.jsx">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="buttons">
          <button className="button function" onClick={handleClear}>AC</button>
          <button className="button function" onClick={handleToggleSign}>+/-</button>
          <button className="button function" onClick={handlePercent}>%</button>
          <button className="button operator" onClick={() => performOperation('÷')}>÷</button>

          <button className="button" onClick={() => handleDigit(7)}>7</button>
          <button className="button" onClick={() => handleDigit(8)}>8</button>
          <button className="button" onClick={() => handleDigit(9)}>9</button>
          <button className="button operator" onClick={() => performOperation('×')}>×</button>

          <button className="button" onClick={() => handleDigit(4)}>4</button>
          <button className="button" onClick={() => handleDigit(5)}>5</button>
          <button className="button" onClick={() => handleDigit(6)}>6</button>
          <button className="button operator" onClick={() => performOperation('-')}>-</button>

          <button className="button" onClick={() => handleDigit(1)}>1</button>
          <button className="button" onClick={() => handleDigit(2)}>2</button>
          <button className="button" onClick={() => handleDigit(3)}>3</button>
          <button className="button operator" onClick={() => performOperation('+')}>+</button>

          <button className="button zero" onClick={() => handleDigit(0)}>0</button>
          <button className="button" onClick={handleDecimal}>.</button>
          <button className="button operator" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};