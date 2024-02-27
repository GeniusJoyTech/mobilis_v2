import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Drop = ({ list, handleListChange }) => {
    const [selectedTit, setSelectedTit] = useState('');

    const handleDropdownChange = (selected) => {
        const selectedObject = list.find(item => {
            const eventKeyValue = Object.entries(item).map(([key, value]) => `${key} - ${value}`).join(' - ');
            return eventKeyValue === selected;
        });

        setSelectedTit(selected);

        if (selectedObject) {
            Object.entries(selectedObject).forEach(([key, value]) => {
                handleListChange({
                    target: {
                        name: key,
                        value: value,
                    }
                });
            });
        }
    };

    useEffect(() => {
        setSelectedTit(list != null ? `Selecione ${[...new Set(list.flatMap(item => Object.keys(item)))].join(' - ')}` : '');
    }, [list]);

    return (
        <>
            {list && (
                <DropdownButton title={selectedTit} onSelect={(selected) => handleDropdownChange(selected)}>
                    {list.map((item, index) => {
                        const eventKeyValue = Object.entries(item).map(([key, value]) => `${key} - ${value}`).join(' - ');
                        return (
                            <Dropdown.Item key={index} eventKey={eventKeyValue}>
                                {eventKeyValue}
                            </Dropdown.Item>
                        );
                    })}
                </DropdownButton>
            )}
        </>
    );
};

export default Drop;
