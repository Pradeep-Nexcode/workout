import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const AttributeSelect = ({ title, value = [], onChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Sample attributes data - replace with actual data from your backend
    const availableAttributes = [
        {
            id: 1,
            name: 'Color',
            values: ['Red', 'Blue', 'Green', 'Black', 'White']
        },
        {
            id: 2,
            name: 'Size',
            values: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 3,
            name: 'Material',
            values: ['Cotton', 'Polyester', 'Wool', 'Silk']
        }
    ];

    const handleAttributeValueChange = (attributeId, attributeName, selectedValue) => {
        const newValue = [...value];
        const attributeIndex = newValue.findIndex(attr => attr.id === attributeId);

        if (attributeIndex === -1) {
            // Add new attribute with selected value
            newValue.push({
                id: attributeId,
                name: attributeName,
                values: [selectedValue]
            });
        } else {
            const valueIndex = newValue[attributeIndex].values.indexOf(selectedValue);
            if (valueIndex === -1) {
                // Add new value to existing attribute
                newValue[attributeIndex].values.push(selectedValue);
            } else {
                // Remove value if already selected
                newValue[attributeIndex].values = newValue[attributeIndex].values.filter(v => v !== selectedValue);
                // Remove attribute if no values are selected
                if (newValue[attributeIndex].values.length === 0) {
                    newValue.splice(attributeIndex, 1);
                }
            }
        }

        onChange(newValue);
    };

    const isValueSelected = (attributeId, attrValue) => {
        const attribute = value.find(attr => attr.id === attributeId);
        return attribute ? attribute.values.includes(attrValue) : false;
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {title}
            </label>
            <div
                className={`border rounded-md p-2 cursor-pointer ${isOpen ? 'border-blue-500' : 'border-gray-300'} ${error ? 'border-red-500' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {value.length > 0
                            ? `${value.length} attribute${value.length > 1 ? 's' : ''} selected`
                            : 'Select attributes'}
                    </span>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
                    <div className="max-h-60 overflow-auto">
                        {availableAttributes.map(attribute => (
                            <div key={attribute.id} className="p-3 border-b dark:border-gray-700">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                                    {attribute.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {attribute.values.map(attrValue => (
                                        <button
                                            key={attrValue}
                                            type="button"
                                            onClick={() => handleAttributeValueChange(attribute.id, attribute.name, attrValue)}
                                            className={`px-3 py-1 text-sm rounded-full transition-colors
                                                ${isValueSelected(attribute.id, attrValue)
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                        >
                                            {attrValue}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default AttributeSelect;