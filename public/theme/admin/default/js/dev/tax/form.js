import {Form} from "../../../../../../js/production/form/form.js"
import Area from "../../../../../../js/production/area.js"
import Text from "../../../../../../js/production/form/fields/text.js"
import Select from "../../../../../../js/production/form/fields/select.js";
import {CountryOptions} from "../../../../../../js/production/locale/country_option.js";
import {ProvinceOptions} from "../../../../../../js/production/locale/province_option.js";

function Rates(props) {
    const [rates, setRates] = React.useState(props.rates);

    const addRate = (e) => {
        e.persist();
        e.preventDefault();
        setRates(rates.concat({
            name: "",
            country: "",
            province: "",
            postcode: "",
            rate: "",
            is_compound: "",
            priority: ""
        }));
    };

    const removeRate = (key) => {
        const newRates = rates.filter((_, index) => index !== key);
        setRates(newRates);
    };

    const onChangeCountry = (e, index) => {
        e.persist();
        setRates(()=> {
            return rates.map((r, i) => {
                if(i === index)
                    r.country = e.target.value;
                return r;
            });
        })
    };


    return <div className="uk-overflow-auto">
        <div><strong>Tax rates</strong></div>
        <table className="uk-table uk-table-divider uk-table-striped uk-table-small uk-table-justify">
            <thead>
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Province</th>
                <th>Postcode</th>
                <th>Rate</th>
                <th>Is compound?</th>
                <th>Priority</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {rates.map((rate, index) => {
                return <tr key={index}>
                    <td>
                        <Text name={'tax_rate[' + index + '][name]'} value={rate.name} validation_rules={["required"]}/>
                    </td>
                    <td>
                        <CountryOptions>
                            <Select
                                name={'tax_rate[' + index + '][country]'}
                                value={rate.country}
                                index={index}
                                handler={(e) => onChangeCountry(e, index)}
                            />
                        </CountryOptions>

                    </td>
                    <td>
                        <ProvinceOptions country={rate.country}>
                            <Select
                                name={'tax_rate[' + index + '][province]'}
                                value={rate.province}
                            />
                        </ProvinceOptions>
                    </td>
                    <td>
                        <Text name={'tax_rate[' + index + '][postcode]'} value={rate.postcode}/>
                    </td>
                    <td>
                        <Text name={'tax_rate[' + index + '][rate]'} value={rate.rate}/>
                    </td>
                    <td>
                        <Select
                            name={'tax_rate[' + index + '][is_compound]'}
                            value={rate.is_compound}
                            options={[
                                {
                                    value: 0,
                                    text: 'No'
                                },
                                {
                                    value: 1,
                                    text: 'Yes'
                                }
                            ]}
                        />
                    </td>
                    <td>
                        <Text name={'tax_rate[' + index + '][priority]'} value={rate.priority}/>
                    </td>
                    <td>
                        <a onClick={() => removeRate(index)}><span>Remove</span></a>
                    </td>
                </tr>;
            })}
            </tbody>
            <tfoot>
            <tr>
                <td><a className="uk-button-primary uk-button-small" onClick={(e) => addRate(e)}><span>Add rate</span></a></td>
            </tr>
            </tfoot>
        </table>
    </div>;
}

function TaxClass(props) {
    return <li>
        <a className="uk-accordion-title" href="#">{props.name}</a>
        <div className={"uk-accordion-content"}>
            <Form id={props.formId} {...props}>
                <input type={"hidden"} value={props.tax_class_id} name={"id"}/>
                <Area id="tax_class_edit_form" coreWidgets={[
                    {
                        'component': Text,
                        'props': {
                            name: "name",
                            validation_rules: ['notEmpty'],
                            value: props.name,
                            formId: props.formId
                        },
                        'sort_order': 10,
                        'id': 'tax_class_edit_name'
                    },
                    {
                        'component': Rates,
                        'props': {rates: props.rates ? props.rates : []},
                        'sort_order': 20,
                        'id': 'tax_class_edit_rates'
                    }
                ]}/>
            </Form>
        </div>
    </li>
}

export default function Taxes({classes, saveAction}) {
    const [taxes, setTaxes] = React.useState(classes);

    const addTax = (e) => {
        e.preventDefault();
        setTaxes(taxes.concat({
            formId: 'tax_class_edit_' + Math.floor(Math.random() * (10000 - 1000) + 1000),
            tax_class_id: undefined,
            name: "Tax class name goes here",
            rates: []
        }));
    };

    const removeTax = (key) => {
        const newTaxes = taxes.filter((_, index) => index !== key);
        setTaxes(newTaxes);
    };

    return <div>
        <div><h2>Tax class</h2></div>
        <ul uk-accordion="multiple: true">
            {taxes.map((t, i) => {
                    return <TaxClass key={i} action={saveAction} {...t}/>
            })}
        </ul>
        <a onClick={(e)=>addTax(e)}>Add tax class</a>
    </div>
}