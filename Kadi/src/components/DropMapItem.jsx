import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function DropMap({ titulo, dropItem, onSelectItem }) {
    const [selectedItem, setSelectedItem] = useState(titulo);

    const handleSelect = (item) => {
        setSelectedItem(item);
        onSelectItem(item);
    };

    return (
        <DropdownButton id="dropdown-basic-button" title={selectedItem} onSelect={handleSelect}>
            {dropItem.map((item) => (
                <Dropdown.Item key={item.id} eventKey={item}>
                    {item.nome}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default DropMap;
