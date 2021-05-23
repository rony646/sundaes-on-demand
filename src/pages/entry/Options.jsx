import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ScoopOption from './ScoopOptions';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants/index.js';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities/index';

export default function Options({optionType}) {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [ orderDetails, updateItemCount ] = useOrderDetails();

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(res => {
            setItems(res.data);
        })
        .catch(err => {
            setError(true)
        })
    }, [optionType])

    if(error) {
        return <AlertBanner />
    }

    const ItemComponent = optionType === 'scoops' ?  ScoopOption  : ToppingOption;
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();


    const optionItems = items.map(item => (
        <ItemComponent 
            key={item.name} 
            name={item.name} 
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
        />
    ))

    return (
            <>
                <h2>{title}</h2>
                <p>{formatCurrency(pricePerItem[optionType])} each</p>
                <p>{title} total: {orderDetails.totals[optionType]}</p>
                <Row>{optionItems}</Row>
            </>
          )
};