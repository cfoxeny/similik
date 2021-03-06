import Area from "../../../../../../../js/production/area.js";
import { PRODUCT_COLLECTION_FILTER_CHANGED } from "../../../../../../../js/production/event-types.js";
import { Fetch } from "../../../../../../../js/production/fetch.js";

function usePrevious(value) {
    const ref = React.useRef();

    React.useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

function Price({ minPrice, maxPrice, maxSteps = 3, minRange = 50, areaProps }) {
    const getSteps = () => {
        let stepNumber = Math.min((parseFloat(maxPrice) - parseFloat(minPrice)) / parseFloat(minRange), maxSteps);
        if (stepNumber <= 1) return [{ from: minPrice, to: maxPrice }];else {
            let step = Math.round((parseFloat(maxPrice) - parseFloat(minPrice)) / stepNumber);
            let steps = [];
            let prev = minPrice;
            for (let i = 0; i < stepNumber; i++) {
                let from = prev;
                let to = Math.round(prev + step);
                prev = to;
                if (to > maxPrice) to = maxPrice;
                steps.push({ from: from, to: to });
            }

            return steps;
        }
    };
    // const [steps, setSteps] = React.useState([]);
    //
    // React.useEffect(function() {
    //     setSteps(getSteps());
    // });
    const currency = ReactRedux.useSelector(state => _.get(state, 'appState.currency', 'USD'));
    const language = ReactRedux.useSelector(state => _.get(state, 'appState.language[0]', 'en'));
    const steps = getSteps();
    return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
            "div",
            { className: "header price-header" },
            React.createElement(
                "div",
                { className: "title uk-margin-small-bottom" },
                React.createElement(
                    "strong",
                    null,
                    "Price"
                )
            ),
            React.createElement(
                "div",
                { className: "filter uk-margin-small-bottom" },
                steps.map((s, i) => {
                    const _from = new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(s.from);
                    const _to = new Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(s.to);
                    return React.createElement(
                        "div",
                        { key: i },
                        React.createElement(
                            "a",
                            { href: "#", onClick: e => {
                                    e.preventDefault();areaProps.addFilter('price', 'BETWEEN', `${s.from} AND ${s.to}`);
                                } },
                            React.createElement(
                                "span",
                                null,
                                _from,
                                " to ",
                                _to
                            )
                        )
                    );
                })
            )
        )
    );
}

function Attributes({ attributes, areaProps }) {
    const onChange = (e, attributeCode, optionId) => {
        let filter = undefined;
        for (let key in areaProps.filters) {
            if (areaProps.filters.hasOwnProperty(key) && key === attributeCode) filter = areaProps.filters[key];
        }

        if (filter === undefined) {
            if (e.target.checked === false) {
                return;
            } else {
                areaProps.addFilter(attributeCode, "IN", [optionId]);
            }
        } else {
            if (e.target.checked === false) {
                areaProps.addFilter(attributeCode, "IN", filter.value.filter(v => {
                    return v !== optionId;
                }));
            } else {
                areaProps.addFilter(attributeCode, "IN", filter.value.concat(optionId));
            }
        }
    };

    return React.createElement(
        "div",
        { className: "filter-attributes" },
        attributes.map((a, i) => {
            return React.createElement(
                "div",
                { key: i },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        a.attribute_name
                    )
                ),
                React.createElement(
                    "ul",
                    { className: "uk-list" },
                    a.options.map((o, j) => {
                        return React.createElement(
                            "li",
                            { key: j },
                            React.createElement(
                                "label",
                                null,
                                React.createElement("input", { className: "uk-checkbox", type: "checkbox", onChange: e => onChange(e, a.attribute_code, o.option_id) }),
                                " ",
                                o.option_text
                            )
                        );
                    })
                )
            );
        })
    );
}

export default function Filter({ categoryId, apiUrl }) {

    const productCollectionFilter = ReactRedux.useSelector(state => _.get(state, 'productCollectionFilter'));
    const currentPageType = ReactRedux.useSelector(state => _.get(state, 'appState.currentPageType', undefined));
    const dispatch = ReactRedux.useDispatch();

    const buildQuery = filters => {
        let filterStr = ``;
        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                let value = filters[key].value;
                if (filters[key].operator === "IN") value = value.join(", ");
                filterStr += `${key} : {operator : "${filters[key].operator}" value: "${value}"} `;
            }
        }

        filterStr = filterStr.trim();
        if (filterStr) filterStr = `(filter : {${filterStr}})`;

        // TODO: field need to be changeable without overwriting this file
        return `{productFilterTool ${filterStr} {price {minPrice maxPrice } attributes {attribute_name attribute_code options {option_id option_text} } }}`;
    };
    const [data, setData] = React.useState(() => {
        dispatch({ 'type': PRODUCT_COLLECTION_FILTER_CHANGED, 'payload': { 'productCollectionFilter': [] } });

        return [];
    });

    React.useEffect(() => {
        let formData = new FormData();
        formData.append('query', buildQuery({ category: { operator: "IN", value: [categoryId] } }));
        Fetch(apiUrl, false, 'POST', formData, null, response => {
            if (_.get(response, 'payload.data.productFilterTool')) {
                setData(_.get(response, 'payload.data.productFilterTool'));
            }
        });
    }, [categoryId]);

    // const [filters, setFilters] = React.useState(() => {
    //     let f = {};
    //     for (let key in productCollectionFilter) {
    //         if (productCollectionFilter.hasOwnProperty(key) && key !== 'page') {
    //             f[key] = productCollectionFilter[key];
    //         }
    //     }
    //
    //     return f;
    // });

    // React.useEffect(() => {
    //     if(filters.length !== 0)
    //         dispatch({'type' : PRODUCT_COLLECTION_FILTER_CHANGED, 'payload': {'productCollectionFilter': filters}});
    // }, [filters]);

    const addFilter = (key, operator, value) => {
        let f = {};
        if (_.isEmpty(productCollectionFilter)) f[key] = { operator: operator, value: value };else for (let k in productCollectionFilter) {
            if (productCollectionFilter.hasOwnProperty(k) && k !== 'page' && k !== 'limit') {
                if (k !== key) f[k] = productCollectionFilter[k];else {
                    if (value !== undefined && !_.isEmpty(value)) f[key] = { operator: operator, value: value };
                }
            }
        }
        if (productCollectionFilter[key] === undefined) f[key] = { operator: operator, value: value };
        dispatch({ 'type': PRODUCT_COLLECTION_FILTER_CHANGED, 'payload': { 'productCollectionFilter': f } });
    };

    const cleanFilter = () => {
        setFilters({});
    };

    const removeFilter = key => {
        setFilters(() => {
            let f = {};
            for (let k in filters) {
                if (filters.hasOwnProperty(k) && k !== key) {
                    f[k] = filters[k];
                }
            }

            return f;
        });
    };

    if (currentPageType !== 'Category') return null;
    return React.createElement(Area, {
        id: "category-info",
        addFilter: addFilter,
        filters: productCollectionFilter,
        coreWidgets: [{
            component: Price,
            props: { minPrice: _.get(data, 'price.minPrice', null), maxPrice: _.get(data, 'price.maxPrice', null) },
            sort_order: 10,
            id: "filter-price"
        }, {
            component: Attributes,
            props: { attributes: _.get(data, 'attributes', []) },
            sort_order: 20,
            id: "filter-attributes"
        }]
    });
}