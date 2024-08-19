import React from "react";


export default function EditSelect({name, value, options, onChange}) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="flex w-2/5 text-default-400 border-black border-dashed border-1 rounded-xl"
        >
            {options.map(option => (
                <option key={option.id} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}