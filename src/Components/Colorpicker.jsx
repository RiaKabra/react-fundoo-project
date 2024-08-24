import React, { useState } from 'react';
import '../Style/ColorPicker.css'; // Assuming the CSS is in the same directory

const colors = [
    '#F28B82', '#F28C81', '#F28D80', '#F28E7F', '#F28F7E',
    '#F2907D', '#F2917C', '#F2927B', '#F2937A', '#F29479',
    '#F29578', '#F29677', '#F29776', '#F29875'
];

export default function ColorPicker() {
    const [selectedColor, setSelectedColor] = useState('');

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="color-picker-container" style={{ backgroundColor: selectedColor }}>
            <div className="color-picker">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                    >
                        {selectedColor === color && <span className="checkmark">✔</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}