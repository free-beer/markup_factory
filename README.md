# Markup Factory

This is a small piece of Javascript code that programmatically builds HTML
elements from definitions. A definition is a plain old JS object, with the
properties of the object providing the markup definition. At a minimum an
definition object must possess a ``nodeName`` attribute that identifies the
HTML node type.

Special consideration is also given to a number of other fields within the
definition object. If the definition contains a ``data`` field then this
should map to a JS object. Each property of that mapped object will be
added to the node generated as if the property name had a prefix of 'data-',
thereby making it available through the nodes ``dataset`` property.

If the definition object has a property under the name ``style`` then this
should map to a JS object. The properties of this mapped object will be inserted
into the generated nodes ``style`` property. Likewise, if the definition object
has an ``events`` property then this should also map to a JS object. The
properties of this  mapped object should match the names of event listeners
that you want to apply to the generated node and these properties should in
turn map to event handler functions for the appropriate event.

If the definition object possesses a ``children`` property then this will be
expected to map to an array. Each entry in this array will be expected to be a
JS object definition for a child node of the base node and will be built and
appended to the base node. This will occur recursively, allowing you to build a
hierarchical structure of parent and child nodes.

If the definition object possesses a ``text`` property then this will be
expected to contain a string. The string for this property will be set as the
text for the node generated. Note that the ``text`` property will be assigned
before an entries in the ``children`` property are appended to the node.

All remaining properties on the definition object will be added as attributes to
the node generated, with the property name being the attribute name and the
associated value being the property value. Mapping to blank strings, nulls or
``undefined`` will be ignored.

## Examples

The following are some contrived examples to demonstrate what the factory
object will do. The following definition...

````json
    {nodeName: "button",
     text: "Press Me!",
     type: "submit"}
````

...would generate a node that would match...

````html
    <button type="submit">Press Me!</button>
````

The following definition...

````json
    {children: [{nodeName: "h2", text: "An example"},
                {nodeName: "p", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}],
     id: "content",
     nodeName: "section"}
````

...would be the equivalent of...

````html
    <section id="content">
        <h2>An Example</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </section>
````

The following definition...

````json
    {events: {click: () => alert("This is an alert!")},
     nodeName: "button",
     text: "Show Alert"}
````

...would generate markup for a button that when clicked on would show an alert.
