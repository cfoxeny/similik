let Error = props => {
    let { error } = props;
    if (!error) return "";else return React.createElement(
        "div",
        { className: "form-field-error" },
        React.createElement(
            "span",
            null,
            error
        )
    );
};

export { Error };