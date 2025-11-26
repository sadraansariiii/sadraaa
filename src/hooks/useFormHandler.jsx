import { useState } from "react";

export default function useFormHandler(initialValues = {}) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked, files, multiple } = e.target;
    if (!name) return;

    let newValue;

    switch (type) {
      case "checkbox":
        if (Array.isArray(formData[name])) {
          newValue = checked
            ? [...formData[name], value]
            : formData[name].filter((v) => v !== value);
        } else {
          newValue = checked ? "1" : "0";
        }
        break;

      case "radio":
        newValue = value;
        break;

      case "file":
        newValue = multiple ? Array.from(files) : files[0];
        break;

      default:
        newValue = value;
        break;
    }

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        const updated = { ...prev };
        let nested = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          nested[key] = nested[key] ? { ...nested[key] } : {};
          nested = nested[key];
        }
        nested[keys[keys.length - 1]] = newValue;
        return updated;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  return { formData, handleChange, setFormData };
}
