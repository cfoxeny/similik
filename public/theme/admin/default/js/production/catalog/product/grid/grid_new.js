import Area from "../../../../../../../../js/production/area.js";

function IdColumnHeader({ areaProps }) {
    const filterFrom = React.useRef(null);
    const filterTo = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField("product_id");
    }, []);

    return React.createElement(
        "td",
        { className: "column" },
        React.createElement(
            "div",
            { className: "header id-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "ID"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", {
                        type: "text",
                        ref: filterFrom,
                        onKeyPress: e => {
                            if (e.key === 'Enter') areaProps.addFilter("id", "BETWEEN", `${e.target.value} AND ${filterTo.current.value}`);
                        },
                        placeholder: "From"
                    })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", {
                        type: "text",
                        ref: filterTo,
                        onKeyPress: e => {
                            if (e.key === 'Enter') areaProps.addFilter("id", "BETWEEN", `${filterFrom.current.value} AND ${e.target.value}`);
                        },
                        placeholder: "To"
                    })
                )
            )
        )
    );
}

function IdColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        row.product_id
    );
}
function PriceColumnHeader({ areaProps }) {
    const filterFrom = React.useRef(null);
    const filterTo = React.useRef(null);
    const currency = ReactRedux.useSelector(state => _.get(state, 'appState.currency', 'USD'));

    React.useEffect(() => {
        areaProps.addField("price");
    }, []);

    return React.createElement(
        "td",
        { className: "row" },
        React.createElement(
            "div",
            { className: "header price-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Price"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", {
                        type: "text",
                        ref: filterFrom,
                        onKeyPress: e => {
                            if (e.key === 'Enter') areaProps.addFilter("price", "BETWEEN", `${e.target.value} AND ${filterTo.current.value}`);
                        },
                        placeholder: "From"
                    })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", {
                        type: "text",
                        ref: filterTo,
                        onKeyPress: e => {
                            if (e.key === 'Enter') areaProps.addFilter("price", "BETWEEN", `${filterFrom.current.value} AND ${e.target.value}`);
                        },
                        placeholder: "To"
                    })
                )
            )
        )
    );
}
function PriceColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        row.price
    );
}
function NameColumnHeader({ areaProps }) {
    const filterInput = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField('name');
    }, []);

    return React.createElement(
        "td",
        { className: "column" },
        React.createElement(
            "div",
            { className: "header name-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Product name"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement("input", {
                    type: "text",
                    ref: filterInput,
                    onKeyPress: e => {
                        if (e.key === 'Enter') areaProps.addFilter("name", "LIKE", `%${e.target.value}%`);
                    },
                    placeholder: "Product name"
                })
            )
        )
    );
}
function NameColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        row.name
    );
}
function QtyColumnHeader({ areaProps }) {
    const filterFrom = React.useRef(null);
    const filterTo = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField('qty');
    }, []);

    return React.createElement(
        "td",
        { className: "column" },
        React.createElement(
            "div",
            { className: "header name-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Qty"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", {
                        type: "text",
                        ref: filterFrom,
                        onKeyPress: e => {
                            if (e.key === 'Enter') areaProps.addFilter("qty", "BETWEEN", `${e.target.value} AND ${filterTo.current.value}`);
                        },
                        placeholder: "From"
                    })
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", {
                        type: "text",
                        ref: filterTo,
                        onKeyPress: e => {
                            if (e.key === 'Enter') areaProps.addFilter("qty", "BETWEEN", `${filterFrom.current.value} AND ${e.target.value}`);
                        },
                        placeholder: "To"
                    })
                )
            )
        )
    );
}
function QtyColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        row.qty
    );
}
function ThumbColumnHeader({ areaProps }) {
    React.useEffect(() => {
        areaProps.addField("image { thumb }");
    }, []);
    return React.createElement(
        "td",
        { className: "column" },
        React.createElement(
            "div",
            { className: "header thumb-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Thumbnail"
                )
            )
        )
    );
}
function ThumbColumnRow({ row }) {
    if (_.get(row, "image.thumb")) return React.createElement(
        "td",
        null,
        React.createElement("img", { className: 'product-thumbnail', src: row.image.thumb })
    );else return React.createElement(
        "td",
        null,
        React.createElement("span", { "uk-icon": "icon: image; ratio: 3" })
    );
}
function StatusColumnHeader({ areaProps }) {
    const filterInput = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField("status");
    }, []);

    return React.createElement(
        "td",
        { className: "column" },
        React.createElement(
            "div",
            { className: "header status-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Status"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement("input", { type: "text", ref: filterInput, onKeyPress: e => {
                        if (e.key === 'Enter') areaProps.addFilter("status", "Equal", e.target.value);
                    } })
            )
        )
    );
}
function StatusColumnRow({ row }) {
    if (parseInt(_.get(row, "status")) === 1) return React.createElement(
        "td",
        null,
        React.createElement(
            "span",
            { className: "uk-label uk-label-success" },
            "Enable"
        )
    );else return React.createElement(
        "td",
        null,
        React.createElement(
            "span",
            { className: "uk-label uk-label-danger" },
            "Disabled"
        )
    );
}
export default function ProductGrid({ apiUrl, defaultFilter }) {
    const [products, setProducts] = React.useState([]);
    const [filters, setFilters] = React.useState(() => {
        if (defaultFilter !== undefined) return defaultFilter;else return [];
    });
    const [fields, setFields] = React.useState([]);

    const addFilter = (key, operator, value) => {
        let flag = 0;
        filters.forEach((f, i) => {
            if (f.key === key && !value) flag = 1; // Remove
            if (f.key === key && value) flag = 2; // Update
        });
        if (flag === 0) setFilters(prevFilters => prevFilters.concat({ key: key, operator: operator, value: value }));else if (flag === 1) {
            const setFilters = prevFilters.filter((f, index) => f.key !== key);
            setFilters(newFilters);
        } else setFilters(prevFilters => prevFilters.map((f, i) => {
            if (f.key === key) {
                f.operator = operator;
                f.value = value;
            }
            return f;
        }));
    };

    const cleanFilter = () => {
        setFilters([]);
    };
    const addField = field => {
        setFields(prevFields => prevFields.concat(field));
    };

    const applyFilter = () => {
        let formData = new FormData();
        formData.append('query', buildQuery());
        axios({
            method: 'post',
            url: apiUrl,
            headers: { 'content-type': 'multipart/form-data' },
            data: formData
        }).then(function (response) {
            if (response.headers['content-type'] !== "application/json") throw new Error('Something wrong, please try again');
            if (_.get(response, 'data.payload.data.productCollection.products')) {
                setProducts(_.get(response, 'data.payload.data.productCollection.products'));
            }
        }).catch(function (error) {}).finally(function () {
            // e.target.value = null;
            // setUploading(false);
        });
    };

    const buildQuery = () => {
        let filterStr = "";
        filters.forEach((f, i) => {
            filterStr += `${f.key} : {operator : ${f.operator} value: "${f.value}"} `;
        });
        filterStr = filterStr.trim();
        if (filterStr) filterStr = `(filter : {${filterStr}})`;

        let fieldStr = "";
        fields.forEach((f, i) => {
            fieldStr += `${f} `;
        });

        return `{productCollection ${filterStr} {products {${fieldStr}} total currentFilter}}`;
    };

    React.useEffect(() => {
        if (fields.length === 0) return;
        applyFilter();
    }, [fields, filters]);

    return React.createElement(
        "div",
        { className: "" },
        React.createElement(
            "table",
            { className: "uk-table uk-table-small" },
            React.createElement(
                "thead",
                null,
                React.createElement(Area, {
                    className: "",
                    id: "product_grid_header",
                    addFilter: addFilter,
                    cleanFilter: cleanFilter,
                    addField: addField,
                    applyFilter: applyFilter,
                    reactcomponent: "tr",
                    coreWidgets: [{
                        component: IdColumnHeader,
                        props: { addFilter, cleanFilter, addField, applyFilter },
                        sort_order: 10,
                        id: "id"
                    }, {
                        component: ThumbColumnHeader,
                        props: {},
                        sort_order: 20,
                        id: "thumb"
                    }, {
                        component: NameColumnHeader,
                        props: {},
                        sort_order: 30,
                        id: "name"
                    }, {
                        component: StatusColumnHeader,
                        props: {},
                        sort_order: 40,
                        id: "status"
                    }, {
                        component: QtyColumnHeader,
                        props: {},
                        sort_order: 50,
                        id: "qty"
                    }, {
                        component: PriceColumnHeader,
                        props: {},
                        sort_order: 60,
                        id: "price"
                    }]
                })
            ),
            React.createElement(
                "tbody",
                null,
                products.map((p, i) => {
                    return React.createElement(Area, {
                        key: i,
                        className: "",
                        id: "product_grid_row",
                        row: p,
                        reactcomponent: "tr",
                        coreWidgets: [{
                            component: IdColumnRow,
                            props: { row: p },
                            sort_order: 10,
                            id: "id"
                        }, {
                            component: ThumbColumnRow,
                            props: { row: p },
                            sort_order: 20,
                            id: "thumb"
                        }, {
                            component: NameColumnRow,
                            props: { row: p },
                            sort_order: 30,
                            id: "name"
                        }, {
                            component: StatusColumnRow,
                            props: { row: p },
                            sort_order: 40,
                            id: "status"
                        }, {
                            component: QtyColumnRow,
                            props: { row: p },
                            sort_order: 50,
                            id: "qty"
                        }, {
                            component: PriceColumnRow,
                            props: { row: p },
                            sort_order: 60,
                            id: "price"
                        }]
                    });
                })
            )
        ),
        products.length === 0 && React.createElement(
            "div",
            null,
            "There is no product to display"
        )
    );
}