import React from 'react';

const DynamicFields = ({ fields, setFields, title }) => {
  const addField = () => {
    setFields([...fields, { name: '', value: '' }]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {fields.map((field, index) => (
        <div key={index} className="flex gap-4 mb-3">
          <input
            type="text"
            placeholder="Name"
            value={field.name}
            onChange={(e) => updateField(index, 'name', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) => updateField(index, 'value', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => removeField(index)}
            className="bg-red-500 text-white px-3 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addField}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Field
      </button>
    </div>
  );
};

export default DynamicFields;
