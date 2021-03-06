import Area from "../../../../../../../../js/production/area.js";

export default function ProductPageLayout() {
    return React.createElement(
        "div",
        { className: "uk-width-1-1 uk-grid-small uk-grid" },
        React.createElement(Area, {
            id: "product_page_top",
            className: "uk-width-1-1 product-page-top"
        }),
        React.createElement(
            "div",
            { className: "uk-width-1-1 product-page-middle uk-grid uk-grid-small" },
            React.createElement(Area, {
                id: "product_page_middle_left",
                className: "uk-width-1-2 product-page-middle-left"
            }),
            React.createElement(Area, {
                id: "product_page_middle_right",
                className: "uk-width-1-2 product-page-middle-right"
            })
        ),
        React.createElement(Area, {
            id: "product_page_bottom",
            className: "uk-width-1-1 product-page-top"
        })
    );
}