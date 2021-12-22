/**
 * This class provides functionality that will build HTML elements from
 * Javascript object definitions for said elements.
 */
export default class MarkupFactory {
    constructor() {
    }

    build(object) {
        let copy = JSON.parse(JSON.stringify(object));

        if(!("nodeName" in copy)) {
            throw("MarkupFactory received object definition with no nodeName attribute.");
        }

        let node = document.createElement(`${copy.nodeName}`.toUpperCase());

        if("text" in copy) {
            node.innerText = `${copy.text}`;
            delete copy.text;
        }

        delete copy.nodeName;
        if("children" in copy) {
            object.children.forEach((entry) => node.appendChild(this.build(entry)));
            delete copy.children;
        }

        if("data" in copy) {
            this._addDataAttributes(node, copy.data);
            delete copy.data;
        }

        if("events" in copy) {
            this._addEventListeners(node, object.events);
            delete copy.events;
        }

        if("style" in copy) {
            this._addStyleSettings(node, copy.style);
            delete copy.style;
        }

        for(const name in copy) {
            let value = `${copy[name]}`;

            if(value !== "") {
                node.setAttribute(name, value);
            }
            delete copy[name];
        }

        return(node);
    }

    _addDataAttributes(node, attributes) {
        for(const key in attributes) {
            if(![null, undefined, ""].includes(attributes[key])) {
                node.dataset[`${key}`] = `${attributes[key]}`;
            }
        }
    }

    _addEventListeners(node, events) {
        for(const name in events) {
            if(![null, undefined].includes(events[name])) {
                node.addEventListener(name, events[name]);
            }
        }
    }

    _addStyleSettings(node, settings) {
        for(const key in settings) {
            if(![null, undefined, ""].includes(settings[key])) {
                node.style[`${key}`] = `${settings[key]}`;
            }
        }
    }
}
