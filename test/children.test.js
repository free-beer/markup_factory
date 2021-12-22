/**
 * @jest-environment jsdom
 */
import MarkupFactory from '../src/markup_factory.js';

describe("children", () => {
    test("get created and appended", () => {
        let factory     = new MarkupFactory();
        let definition  = {nodeName: "div", children: [{nodeName: "p", children: [{nodeName: "span"}]}]};
        let node        = factory.build(definition);

        expect(node.nodeName).toBe("DIV");
        expect(node.children[0].nodeName).toBe("P");
        expect(node.children[0].children[0].nodeName).toBe("SPAN");
    });
});