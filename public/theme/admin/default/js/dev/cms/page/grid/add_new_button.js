import A from "../../../../../../../../js/production/a.js";

export default function AddNewButton({url}) {
    return <A pushState={true} text={"New page"} url={url} className={"uk-button uk-button-primary uk-button-small"}/>
}