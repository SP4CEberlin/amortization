import React from 'react';

interface CurrencyDisplayProps {
    amount: Number
}

const CurrencyDisplayComponent: React.FC<CurrencyDisplayProps> = ({ amount }) => {
    return (
        <div>
            {amount.toFixed(2)} Euro
        </div>
    )
}

export default CurrencyDisplayComponent