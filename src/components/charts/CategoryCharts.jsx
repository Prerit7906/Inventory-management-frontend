import React, { useCallback, useEffect, useState, useRef } from "react";
import { AgCharts } from 'ag-charts-community';

const CategoryCharts = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null); 

    const fetchProducts = useCallback(async () => {
        try {
            console.log("warehouse id : " + props.warehouseId);
            const response = await fetch(`http://localhost:9090/api/v1.0/products/all/warehouse/${props.warehouseId}`);
            const d = await response.json();
            console.log(d);
            setProducts(d);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [props.warehouseId]);

    const updateCategories = useCallback(() => {
        const updatedCategories = products.reduce((acc, product) => {
            const existingCategory = acc.find(c => c.type === product.category.categoryName);

            if (existingCategory) {
                existingCategory.count += product.unitsInStocks;
            } else {
                acc.push({
                    type: product.category.categoryName,
                    count: product.unitsInStocks
                });
            }

            return acc;
        }, []);

        setCategories(updatedCategories);
    }, [products]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        updateCategories();
    }, [products, updateCategories]);

    useEffect(() => {
        if (categories.length > 0 && chartContainerRef.current) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const data = categories;
            const numFormatter = new Intl.NumberFormat("en-US");
            const total = data.reduce((sum, d) => sum + d["count"], 0);

            const options = {
                container: chartContainerRef.current,
                data,
                title: {
                    text: "Product Categories",
                },
                footnote: {
                    text: "Source: Your Data Source",
                },
                series: [
                    {
                        type: "donut",
                        calloutLabelKey: "type", 
                        angleKey: "count",       
                        sectorLabelKey: "count", 
                        calloutLabel: {
                            enabled: false,
                        },
                        sectorLabel: {
                            formatter: ({ datum, sectorLabelKey }) => {
                                const value = datum[sectorLabelKey];
                                return numFormatter.format(value);
                            },
                        },
                        title: {
                            text: "Category Count",
                        },
                        innerRadiusRatio: 0.7,
                        innerLabels: [
                            {
                                text: numFormatter.format(total),
                                fontSize: 24,
                            },
                            {
                                text: "Total",
                                fontSize: 16,
                                spacing: 10,
                            },
                        ],
                        tooltip: {
                            renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
                                return {
                                    title,
                                    content: `${datum[calloutLabelKey]}: ${numFormatter.format(datum[sectorLabelKey])}`,
                                };
                            },
                        },
                        sectorSpacing: 3,
                    },
                ],
            };

            chartRef.current = AgCharts.create(options);
        }
    }, [categories]);

    return (
        <div>
            <div id="myChart" ref={chartContainerRef} style={{ width: '600px', height: '500px' }}></div>
        </div>
    );
}

export default CategoryCharts;
