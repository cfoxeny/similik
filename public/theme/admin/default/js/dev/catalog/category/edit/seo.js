import Area from "../../../../../../../../js/production/area.js";
import Text from "../../../../../../../../js/production/form/fields/text.js";
import TextArea from "../../../../../../../../js/production/form/fields/textarea.js";
import Select from "../../../../../../../../js/production/form/fields/select.js";
import Tinycme from "../../../../../../../../js/production/form/fields/tinycme.js";

let fields = [
    {
        component: Text,
        props : {id : 'seo_key', formId: "category-edit-form", name: "seo_key", label: "Seo key"},
        sort_order: 10,
        id: "seo_key"
    },
    {
        component: Text,
        props : {id : 'meta_title', formId: "category-edit-form", name: "meta_title", label: "Meta title"},
        sort_order: 20,
        id: "meta_title"
    },
    {
        component: Text,
        props : {id : "meta_keywords", formId: "category-edit-form",name: "meta_keywords", type: "text", label: "Meta keywords", isTranslateAble:false},
        sort_order: 30,
        id: "meta_keywords"
    },
    {
        component: Text,
        props : {id : "meta_description", formId: "category-edit-form",name: "meta_description", type: "text", label: "Meta description", isTranslateAble:false},
        sort_order: 40,
        id: "meta_description"
    }
];

export default function Seo({data}) {
    React.useState(function() {
        fields.filter((f) => {
            if(_.get(data, f.props.name) !== undefined)
                f.props.value = _.get(data, f.props.name);
            return f;
        });
        return null
    });
    return <Area id="category-edit-seo" coreWidgets={fields}/>
}