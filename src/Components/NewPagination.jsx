import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../context/DataProvider";
import { Pagination, Stack } from "@mui/material";

const NewPagination = () => {
    const { products } = useContext(DataContext);

    const [productsData, setProductsData] = useState(products);
    const [paginationData, setPaginationData] = useState({
        count: 30,
        from: 0,
        to: 8,
        pageSize: 8,
    });

    useEffect(() => {
        console.log("productsData", productsData);
    }, [products]);

    useEffect(() => {
        console.log("render this", paginationData.from, paginationData.to);
        const updatedProducts = products.slice(
            paginationData.from,
            paginationData.to
        );

        setProductsData(updatedProducts);
    }, [paginationData.from, paginationData.to]);

    const handlePageChange = (e, page) => {
        const from = (page - 1) * paginationData.pageSize;
        const to =
            (page - 1) * paginationData.pageSize + paginationData.pageSize;
        console.log("from", from, "to", to);
        setPaginationData({ ...paginationData, from: from, to: to });
    };

    return (
        <div
            className="products_container"
            style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
            }}
        >
            {productsData.map((product) => (
                <div key={product.id}>
                    <img
                        src={product.image}
                        className="product_card"
                        style={{ width: "100px" }}
                    ></img>
                </div>
            ))}
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(paginationData.count / 8)}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>
        </div>
    );
};

export default NewPagination;
