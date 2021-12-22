/**
 * @jest-environment jsdom
 */
import {jest} from '@jest/globals'
import MarkupFactory from '../src/markup_factory.js';

describe("event listeners", () => {
    test("get added", () => {
        let factory = new MarkupFactory();
        let handler = jest.fn();
        let node    = factory.build({nodeName: "div", events: {click: handler}});
        let event   = new MouseEvent("click", {});

        node.dispatchEvent(event);
        expect(handler).toHaveBeenCalled();
    })
});