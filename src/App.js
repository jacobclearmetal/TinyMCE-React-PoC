import React from "react";
import { Typography } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";

const htmlToComponents = (rawHtml, typographyProps) => {
  // TODO:
  // - Properly convert to a component
  // - Convert with correct styling (bold for example)
  const convertedContent = (
    <Typography {...typographyProps} gutterBottom>
      {rawHtml}
    </Typography>
  );

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
