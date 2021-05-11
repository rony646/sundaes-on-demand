import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ScoopOption from './ScoopOptions';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';

export default function Options({optionType}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(res => {
            setItems(res.data);
        })
        .catch(err => {
            // TODO: handle erros later
        })
    }, [optionType])

    const ItemComponent = optionType === 'scoops' ?  ScoopOption  : ToppingOption;

    const optionItems = items.map(item => (
        <ItemComponent 
            key={item.name} 
            name={item.name} 
            imagePath={item.imagePath}
        />
    ))

    return <Row>{optionItems}</Row>
};