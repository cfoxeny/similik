import Area from "../../../../../../../js/production/area.js";
import A from "../../../../../../../js/production/a.js";

function IdColumnHeader({ areaProps }) {
    const filterFrom = React.useRef(null);
    const filterTo = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField("customer_id");
    }, []);

    return React.createElement(
        "th",
        null,
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
                        className: "uk-input uk-form-small uk-form-width-small",
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
                        className: "uk-input uk-form-small uk-form-width-small",
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
        React.createElement(
            "span",
            null,
            row.customer_id
        )
    );
}

function EmailColumnHeader({ areaProps }) {
    const filterInput = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField('email');
    }, []);

    return React.createElement(
        "th",
        null,
        React.createElement(
            "div",
            { className: "header name-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Email"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement("input", {
                    className: "uk-input uk-form-small uk-form-width-small",
                    type: "text",
                    ref: filterInput,
                    onKeyPress: e => {
                        if (e.key === 'Enter') areaProps.addFilter("email", "LIKE", `%${e.target.value}%`);
                    },
                    placeholder: "Email"
                })
            )
        )
    );
}

function EmailColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        React.createElement(
            "span",
            null,
            _.get(row, 'email', '')
        )
    );
}

function NameColumnHeader({ areaProps }) {
    const filterInput = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField('full_name');
    }, []);

    return React.createElement(
        "th",
        null,
        React.createElement(
            "div",
            { className: "header name-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Full name"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement("input", {
                    className: "uk-input uk-form-small uk-form-width-small",
                    type: "text",
                    ref: filterInput,
                    onKeyPress: e => {
                        if (e.key === 'Enter') areaProps.addFilter("full_name", "LIKE", `%${e.target.value}%`);
                    },
                    placeholder: "Full name"
                })
            )
        )
    );
}

function NameColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        React.createElement(
            "span",
            null,
            _.get(row, 'full_name', '')
        )
    );
}

function GroupColumnHeader({ areaProps }) {
    const filterInput = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField("group_id");
    }, []);

    return React.createElement(
        "th",
        null,
        React.createElement(
            "div",
            { className: "header status-header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Customer group"
                )
            ),
            React.createElement(
                "div",
                { className: "filter" },
                React.createElement(
                    "select",
                    {
                        className: "uk-select uk-form-small uk-form-width-small",
                        defaultValue: "placeholder",
                        ref: filterInput,
                        onChange: e => {
                            areaProps.addFilter("group", "Equal", e.target.value);
                        }
                    },
                    React.createElement(
                        "option",
                        { value: "placeholder", disabled: true },
                        "Please select"
                    ),
                    areaProps.groups.map((g, i) => {
                        return React.createElement(
                            "option",
                            { key: i, value: g.customer_group_id },
                            g.group_name
                        );
                    })
                )
            )
        )
    );
}

function GroupColumnRow({ row, groups }) {
    let group = groups.find(g => parseInt(g.customer_group_id) === parseInt(row.group_id));
    return React.createElement(
        "td",
        null,
        React.createElement(
            "span",
            null,
            group.group_name
        )
    );
}

function ActionColumnHeader({ areaProps }) {
    React.useEffect(() => {
        areaProps.addField('editUrl');
    }, []);
    return React.createElement(
        "th",
        null,
        React.createElement(
            "div",
            { className: "header" },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "Action"
                )
            )
        )
    );
}

function ActionColumnRow({ row }) {
    return React.createElement(
        "td",
        null,
        React.createElement(A, { url: _.get(row, 'editUrl', ''), text: "Edit" })
    );
}

function StatusColumnHeader({ areaProps }) {
    const filterInput = React.useRef(null);

    React.useEffect(() => {
        areaProps.addField("status");
    }, []);

    return React.createElement(
        "td",
        null,
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
                React.createElement(
                    "select",
                    { className: "uk-select uk-form-small", ref: filterInput, onChange: e => {
                            areaProps.addFilter("status", "Equal", e.target.value);
                        } },
                    React.createElement(
                        "option",
                        { value: 1 },
                        "Enabled"
                    ),
                    React.createElement(
                        "option",
                        { value: 0 },
                        "Disabled"
                    )
                )
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

export default function CmsPageGrid({ apiUrl, groups = [] }) {
    const [customers, setCustomers] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
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
            if (_.get(response, 'data.payload.data.customerCollection.customers')) {
                setCustomers(_.get(response, 'data.payload.data.customerCollection.customers'));
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

        return `{customerCollection ${filterStr} {customers {${fieldStr}} total currentFilter}}`;
    };

    React.useEffect(() => {
        if (fields.length === 0) return;
        applyFilter();
    }, [fields, filters]);

    return React.createElement(
        "div",
        { className: "uk-overflow-auto" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Customers"
            )
        ),
        React.createElement(
            "table",
            { className: "uk-table uk-table-small uk-table-divider" },
            React.createElement(
                "thead",
                null,
                React.createElement(Area, {
                    className: "",
                    id: "customer_grid_header",
                    addFilter: addFilter,
                    cleanFilter: cleanFilter,
                    addField: addField,
                    applyFilter: applyFilter,
                    groups: groups,
                    reactcomponent: "tr",
                    coreWidgets: [{
                        component: IdColumnHeader,
                        props: {},
                        sort_order: 10,
                        id: "id"
                    }, {
                        component: EmailColumnHeader,
                        props: {},
                        sort_order: 15,
                        id: "email"
                    }, {
                        component: NameColumnHeader,
                        props: {},
                        sort_order: 20,
                        id: "name"
                    }, {
                        component: GroupColumnHeader,
                        props: {},
                        sort_order: 25,
                        id: "group"
                    }, {
                        component: StatusColumnHeader,
                        props: {},
                        sort_order: 30,
                        id: "status"
                    }, {
                        component: ActionColumnHeader,
                        props: {},
                        sort_order: 35,
                        id: "action"
                    }]
                })
            ),
            React.createElement(
                "tbody",
                null,
                customers.map((p, i) => {
                    return React.createElement(Area, {
                        key: i,
                        className: "",
                        id: "customer_grid_row",
                        row: p,
                        reactcomponent: "tr",
                        coreWidgets: [{
                            component: IdColumnRow,
                            props: { row: p },
                            sort_order: 10,
                            id: "id"
                        }, {
                            component: EmailColumnRow,
                            props: { row: p },
                            sort_order: 15,
                            id: "email"
                        }, {
                            component: NameColumnRow,
                            props: { row: p },
                            sort_order: 20,
                            id: "name"
                        }, {
                            component: GroupColumnRow,
                            props: { row: p, groups: groups },
                            sort_order: 25,
                            id: "group"
                        }, {
                            component: StatusColumnRow,
                            props: { row: p },
                            sort_order: 30,
                            id: "status"
                        }, {
                            component: ActionColumnRow,
                            props: { row: p },
                            sort_order: 35,
                            id: "action"
                        }]
                    });
                })
            )
        ),
        customers.length === 0 && React.createElement(
            "div",
            null,
            "There is no customer to display"
        )
    );
}