import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants/index';

const OrderDetails = createContext();

export function userOrderDetails() {
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error('userOrderDetails must be used within an OrderDetailsProvider')
    };

    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for(const count of optionCounts[optionType].values()) {
        optionCount += count;
    };

    return optionCount * pricePerItem[optionType]
};

export function OrderDetailsProvider(props) {

    const [optionsCounts, setOptionsCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const [totals, setTotals] = useState({
        scoops: 0,
        toppings: 0,
        grandTotal: 0
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionsCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionsCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: scoopsSubtotal,
            toppings: toppingsSubtotal,
            grandTotal: grandTotal
        })
    }, [optionsCounts])

    const value = useMemo(() => {

        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionsCounts = { ...optionsCounts };

            const optionCountsMap = optionsCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionsCounts(newOptionsCounts);
        };

        return [{...optionsCounts, totals }, updateItemCount]
    }, [optionsCounts])

    return(
        <OrderDetails.Provider value={value} {...props} />
    )
};