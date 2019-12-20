import React from "react";
import { Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";

/*

# Learnings: 

- We should probably avoid data-attributes
  - what if styles change?
- Focus on straight HTML elements - P tag turns into <Typography whatever="whatever" />
- Leaving <strong>, <italic>, correctly formats if nested withing <Typography />
- 

*/

const htmlToComponents = (rawHtml, typographyProps) => {
  // TODO:
  // - [ ] Parse HTML before rendering
  // - [ ] Properly convert to a component
  // - [ ] Convert with correct styling (bold for example)

  const convertedContent = parse(rawHtml, {
    replace: domNode => {
      // TODO: Make this woork

      console.log("domNode", domNode);
      if (
        domNode.prev &&
        domNode.prev.parent.name &&
        (domNode.prev.parent.name === "p" ||
          domNode.prev.parent.name === "strong")
      ) {
        return domNode.data;
      } else if (domNode.parent && domNode.parent.name === "p") {
        console.log("Ladies and gentlemen, we got 'em");
        return (
          <Typography {...typographyProps} gutterBottom>
            {domNode.data}
          </Typography>
        );
      } else if (domNode.attribs && domNode.attribs.id === "replace") {
        return React.createElement("span", {}, "replaced");
      } else {
        console.log("uncaught", domNode);
      }
    }
  });

  console.log("convertedContent", convertedContent);

  // const convertedContent = (
  //   <Typography {...typographyProps} gutterBottom>
  //     {rawHtml}
  //   </Typography>
  // );

  return convertedContent;
};

class App extends React.Component {
  state = {
    messages: ["hello", "test", "lorum ipsum"],
    editorContent: "<p>This is the initial content of the editor</p>"
  };

  handleEditorChange = e => {
    console.log("Content was updated:", e.target.getContent());
    this.setState({ editorContent: e.target.getContent() });
  };

  render() {
    const { messages, editorContent } = this.state;

    return (
      <div style={{ padding: "5em", width: "50em" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chat
        </Typography>
        {messages.map(m => htmlToComponents(m, { color: "secondary" }))}
        <Typography variant="h5" component="h2" gutterBottom>
          Transformed Message
        </Typography>
        {htmlToComponents(editorContent, { color: "primary" })}
        <Editor
          initialValue={editorContent}
          // onEditorChange={(content, editor) =>
          //   console.log("content", content, "editor", editor)
          // }
          apiKey="vr32bmc4aw1wjep8o8ghwywsv77h8rmqkp2ty1osxwiyons1"
          parser={{
            addNodeFilter:
              ("p,h1",
              (nodes, name) => {
                for (var i = 0; i < nodes.length; i++) {
                  console.log(nodes[i].name);
                }
              })
          }}
          init={{
            height: 200,
            menubar: false,
            // icons_url: "https://www.example.com/icons/material/icons.js", // load icon pack
            // icons: "material", // use icon pack
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            // Toolbar elements are plugin based:
            // https://www.tiny.cloud/docs/advanced/editor-control-identifiers/#toolbarcontrols
            toolbar:
              "bold italic | bullist numlist | link image emoticons | help"
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default App;
