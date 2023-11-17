import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
    {
        _id: uuid(),
        categoryName: "Men Collection",
        categoryImg:
            "https://img.freepik.com/premium-photo/bearded-man-with-shopping-bags-with-happy-feeling-isolated_1258-5542.jpg",
        routeName: "Men",
        desc: "Check out our best Men collection",
    },
    {
        _id: uuid(),
        categoryName: "Women Collection",
        categoryImg:
            "https://img.freepik.com/premium-photo/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-mobile-phone_8087-3877.jpg",
        routeName: "Women",
        desc: "Check out our best Women collection",
    },
    {
        _id: uuid(),
        categoryName: "Kids Collection",
        categoryImg:
            "https://img.freepik.com/free-photo/happy-kid-is-shopping-outdoors_624325-553.jpg?w=2000",
        routeName: "Kids",
        desc: "Check out our best Kids collection",
    },
];
// https://imgmedia.lbb.in/media/2020/10/5f9bc0a57372a75dc5da61fb_1604042917760.jpg
