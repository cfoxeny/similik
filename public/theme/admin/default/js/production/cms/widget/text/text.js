import Text from "../../../../../../../../js/production/form/fields/text.js";
import Tinycme from "../../../../../../../../js/production/form/fields/tinycme.js";
import Select from "../../../../../../../../js/production/form/fields/select.js";
import { LayoutList } from "../../../../production/cms/widget/layout_list.js";
import { AreaList } from "../../../../production/cms/widget/area_list.js";
import { Form } from "../../../../../../../../js/production/form/form.js";
import { ADD_ALERT } from "../../../../../../../../js/production/event-types.js";
import { Fetch } from "../../../../../../../../js/production/fetch.js";

export default function TextWidget({ id, name, status, setting, displaySetting, sort_order, formAction, areaProps }) {
    const layout = _.find(displaySetting, { key: 'layout' }) !== undefined ? JSON.parse(_.get(_.find(displaySetting, { key: 'layout' }), 'value', [])) : [];
    const area = _.find(displaySetting, { key: 'area' }) !== undefined ? JSON.parse(_.get(_.find(displaySetting, { key: 'area' }), 'value', [])) : [];
    const dispatch = ReactRedux.useDispatch();
    const onComplete = response => {
        if (_.get(response, 'payload.data.createWidget.status') === true) {
            dispatch({ 'type': ADD_ALERT, 'payload': { alerts: [{ id: "widget_update_success", message: 'Widget has been saved successfully', type: "success" }] } });
            Fetch(areaProps.requestUrl, true);
        } else dispatch({ 'type': ADD_ALERT, 'payload': { alerts: [{ id: "widget_update_error", message: _.get(response, 'payload.data.createWidget.message', 'Something wrong, please try again'), type: "error" }] } });
    };

    return React.createElement(
        "div",
        null,
        React.createElement(
            Form,
            {
                id: "text-widget-edit-form",
                action: formAction,
                onComplete: onComplete
            },
            React.createElement("input", { type: "text", name: "query", value: "mutation CreateTextWidget($widget: WidgetInput!) { createWidget (widget: $widget) {status message}}", readOnly: true, style: { display: 'none' } }),
            React.createElement("input", { type: "text", name: "variables[widget][type]", value: "text", readOnly: true, style: { display: 'none' } }),
            id && React.createElement("input", { type: "text", name: "variables[widget][id]", value: id, readOnly: true, style: { display: 'none' } }),
            React.createElement(Text, {
                name: "variables[widget][name]",
                value: name,
                formId: "text-widget-edit-form",
                validation_rules: ['notEmpty'],
                label: "Name"
            }),
            React.createElement(Select, {
                name: "variables[widget][status]",
                value: status,
                formId: "text-widget-edit-form",
                options: [{ value: '1', text: 'Enable' }, { value: '0', text: 'Disable' }],
                label: "Status"
            }),
            React.createElement("input", { type: "text", name: "variables[widget][setting][0][key]", value: "content", readOnly: true, style: { display: 'none' } }),
            React.createElement(Tinycme, {
                name: "variables[widget][setting][0][value]",
                value: _.find(setting, { key: 'content' }) !== undefined ? _.get(_.find(setting, { key: 'content' }), 'value', '') : '',
                validation_rules: ['notEmpty'],
                label: "Content",
                formId: "text-widget-edit-form"
            }),
            React.createElement("input", { type: "text", name: "variables[widget][setting][1][key]", value: "container_class", readOnly: true, style: { display: 'none' } }),
            React.createElement(Text, {
                name: "variables[widget][setting][1][value]",
                value: _.find(setting, { key: 'container_class' }) !== undefined ? _.get(_.find(setting, { key: 'container_class' }), 'value', '') : '',
                formId: "text-widget-edit-form",
                label: "Container class"
            }),
            React.createElement(
                "div",
                null,
                "Select page layout"
            ),
            React.createElement(LayoutList, { formId: "text-widget-edit-form", selectedLayouts: layout }),
            React.createElement(
                "div",
                null,
                "Select area"
            ),
            React.createElement(AreaList, { formId: "text-widget-edit-form", selectedAreas: area }),
            React.createElement(Text, {
                name: "variables[widget][sort_order]",
                value: sort_order,
                formId: "text-widget-edit-form",
                label: "Sort order"
            })
        )
    );
}