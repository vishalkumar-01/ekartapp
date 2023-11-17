import React from "react";
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";
import Categories from "../Components/Categories/Categories";
import Footer from "../Components/Footer/Footer";
import NewPagination from "../Components/NewPagination";

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Categories />
            <Footer />
        </div>
    );
};

export default Home;

// login form create kar
// take details in cred variables state
