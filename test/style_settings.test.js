/**
 * @jest-environment jsdom
 */
import MarkupFactory from '../src/markup_factory.js';

describe("style settings", () => {
    test("are assigned", () => {
        let factory = new MarkupFactory();
        let node    = factory.build({nodeName: "p",
                                     style:    {color: "red", "font-size": "30px"}});

        expect(node.style.color).toBe("red");
        expect(node.style["font-size"]).toBe("30px");
    });

    test("non-standard settings are added too", () => {
        let factory = new MarkupFactory();
        let node    = factory.build({nodeName: "p",
                                     style:    {ningy: "blah!"}});

        expect(node.style.ningy).toBe("blah!");
    });
});