import React, { useContext, useEffect, useReducer } from "react";

import "./ProductFiltersAside.css";
import { DataContext } from "../../../../context/DataProvider";

import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProductFiltersAside = () => {
    const { state, dispatch, filters, flag, setFlag } = useContext(DataContext);

    const isCategoryPresent = (value) => filters.categories.includes(value);
    const isSizePresent = (value) => filters.sizes.includes(value);
    const isSortByOptionPresent = (value) => filters.sortBy === value;
    const isRatingPresent = (value) => filters.rating === value;
    // console.log("isCategoryPresent:", isCategoryPresent(value));

    // useEffect(() => {
    //     console.log(state.filters.priceRange);
    // }, [state]);

    // console.log(isSortByOptionPresent("low-to-high"));

    return (
        <div className="product-filter-aside">
            {flag ? (
                <div onClick={() => setFlag(false)} className="up_arrow">
                    <KeyboardArrowDownIcon />
                </div>
            ) : null}

            <div className="product-filter-aside-clear-item">
                <h3>Filters: </h3>

                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    className="clear__btn"
                    onClick={() => dispatch({ type: "clear-all-filters" })}
                >
                    Clear Filters
                </Button>
            </div>
            <hr />
            {/**Price Range filter */}
            <div className="product-filter-aside-item">
                <h3>Price Range:</h3>
                <div className="product-slider">
                    <p className="product-slider-value">0</p>
                    <p className="product-slider-value">750</p>
                    <p className="product-slider-value">1500</p>
                </div>
                <div className="slidecontainer">
                    <input
                        type="range"
                        min="1"
                        max="1500"
                        className="slider"
                        value={state.filters.priceRange}
                        onChange={(e) =>
                            dispatch({
                                type: "handlePriceChange",
                                payload: e.target.value,
                            })
                        }
                    ></input>
                </div>
            </div>
            <hr />
            {/**Categories filter */}
            <div className="product-filter-aside-item">
                <div>
                    <h3>Categories</h3>
                </div>
                <div className="product-filter-checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            value="Men"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Category_Filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isCategoryPresent("Men")}
                        />
                        Men
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Women"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Category_Filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isCategoryPresent("Women")}
                        />
                        Women
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="Kids"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Category_Filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isCategoryPresent("Kids")}
                        />
                        Kids
                    </label>
                </div>
            </div>
            <hr />

            {/**Rating filter starts */}

            <div className="product-filter-aside-item">
                <div>
                    <h3>Rating</h3>
                </div>

                <div className="productlist-input-container">
                    <div className="productlist-input-item">
                        <input
                            type="radio"
                            className="cursor-pointer"
                            name="rating-radio"
                            id="4star-radio"
                            value="4"
                            checked={isRatingPresent("4")}
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Rating_filter",
                                    payload: e.target.value,
                                })
                            }
                        />
                        <label className="cursor-pointer" htmlFor="4star-radio">
                            4 Stars &amp; above
                        </label>
                    </div>
                    <div className="productlist-input-item">
                        <input
                            type="radio"
                            className="cursor-pointer"
                            name="rating-radio"
                            id="3star-radio"
                            value="3"
                            checked={isRatingPresent("3")}
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Rating_filter",
                                    payload: e.target.value,
                                })
                            }
                        />
                        <label className="cursor-pointer" htmlFor="3star-radio">
                            3 Stars &amp; above
                        </label>
                    </div>
                    <div className="productlist-input-item">
                        <input
                            type="radio"
                            className="cursor-pointer"
                            name="rating-radio"
                            id="2star-radio"
                            value="2"
                            checked={isRatingPresent("2")}
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Rating_filter",
                                    payload: e.target.value,
                                })
                            }
                        />
                        <label className="cursor-pointer" htmlFor="2star-radio">
                            2 Stars &amp; above
                        </label>
                    </div>
                    <div className="productlist-input-item">
                        <input
                            type="radio"
                            className="cursor-pointer"
                            name="rating-radio"
                            id="1star-radio"
                            value="1"
                            checked={isRatingPresent("1")}
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Rating_filter",
                                    payload: e.target.value,
                                })
                            }
                        />
                        <label className="cursor-pointer" htmlFor="1star-radio">
                            1 Stars &amp; above
                        </label>
                    </div>
                </div>
            </div>
            <hr />

            {/**Rating filter ends */}

            {/**Sizes Checkbox filter */}
            <div className="product-filter-aside-item">
                <div>
                    <h3>Sizes</h3>
                </div>
                <div className="product-filter-checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            value="S"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Sizes_filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isSizePresent("S")}
                        />
                        S
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="M"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Sizes_filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isSizePresent("M")}
                        />
                        M
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="L"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Sizes_filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isSizePresent("L")}
                        />
                        L
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="XL"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Sizes_filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isSizePresent("XL")}
                        />
                        XL
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="XXL"
                            onChange={(e) =>
                                dispatch({
                                    type: "Add_Sizes_filter",
                                    payload: e.target.value,
                                })
                            }
                            checked={isSizePresent("XXL")}
                        />
                        XXL
                    </label>
                </div>
            </div>
            <hr />
            {/**Sort by Price filter */}
            <div className="product-filter-aside-item">
                <div>
                    <h3>Sort by price</h3>
                </div>
                <div
                    className="product-filter-sortBy"
                    // onChange={(e) =>
                    //     dispatch({
                    //         type: "handleSortByPrice",
                    //         payload: e.target.value,
                    //     })
                    // }
                >
                    <label htmlFor="low-to-high" className="cursor-pointer">
                        <input
                            type="radio"
                            value="low-to-high"
                            id="low-to-high"
                            name="gender"
                            checked={isSortByOptionPresent("low-to-high")}
                            onChange={(e) =>
                                dispatch({
                                    type: "handleSortByPrice",
                                    payload: e.target.value,
                                })
                            }
                        />
                        Price - Low-to-High
                    </label>
                    <label htmlFor="high-to-low" className="cursor-pointer">
                        <input
                            type="radio"
                            value="high-to-low"
                            id="high-to-low"
                            name="gender"
                            checked={isSortByOptionPresent("high-to-low")}
                            onChange={(e) =>
                                dispatch({
                                    type: "handleSortByPrice",
                                    payload: e.target.value,
                                })
                            }
                        />
                        Price - High-to-Low
                    </label>
                    <label htmlFor="reset" className="cursor-pointer">
                        <input
                            type="radio"
                            value="reset"
                            id="reset"
                            name="gender"
                            checked={isSortByOptionPresent("reset")}
                            onChange={(e) =>
                                dispatch({
                                    type: "handleSortByPrice",
                                    payload: e.target.value,
                                })
                            }
                        />
                        Reset
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProductFiltersAside;
