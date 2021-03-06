import {Error} from "./error.js"
import {FORM_FIELD_CREATED, FORM_VALIDATED, FORM_FIELD_REMOVED, FORM_LANGUAGE_CHANGED} from "./../../event-types.js";

export default function Text (props) {
    const [value, setValue] = React.useState(props.value ? props.value : '');
    const [error, setError] = React.useState(undefined);
    const [isDisabled, setIsDisabled] = React.useState(false);

    React.useEffect(() => {
        PubSub.publishSync(FORM_FIELD_CREATED, {...props});
        let tokenOne = PubSub.subscribe(FORM_VALIDATED, function(message, data) {
            if(data.formId === props.formId) {
                setError(data.errors[props.name]);
            }
        });

        let tokenTwo = PubSub.subscribe(FORM_LANGUAGE_CHANGED, function(message, data) {
            if(data.formId === props.formId) {
                if(props.isTranslateAble === false) {
                    setIsDisabled(true);
                }
            }
        });

        return function cleanup() {
            PubSub.unsubscribe(tokenOne);
            PubSub.unsubscribe(tokenTwo);
            PubSub.publishSync(FORM_FIELD_REMOVED, {...props});
        };
    }, []);

    const onChange = (e)=> {
        if(isDisabled === true)
            return false;
        setValue(e.target.value);
        if (props.handler) props.handler.call(window, e, props);
    };

    return <div className="form-field form-text">
        <div className="field-label"><label htmlFor={props.name}>{props.label}</label></div>
        <input
            type="text"
            className={"uk-input uk-form-small uk-form-width-" + props.size}
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
        />
        { props.comment &&
            <div><i>{props.comment}</i></div>
        }
        <Error error={error}/>
    </div>
}