import React, { Fragment, Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import getPlaceholderModule from 'quill-placeholder-module'
import sanitizeHtml from 'sanitize-html'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './Editor.css'

Quill.register('modules/placeholder', getPlaceholderModule(Quill))

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['link', 'image'],

  ['placeholder'],

  ['clean'], // remove formatting button
]

const modules = {
  toolbar: '#toolbar',
  placeholder: {
    delimiters: ['{{', '}}'],
    placeholders: [
      { id: 'contract_id', label: 'contract_id', displayName: 'ContractID' },
      { id: 'tax_residence', label: 'tax_residence', displayName: 'TaxResidence' },
    ],
  },
}

const CustomToolbar = () => (
  <div id="toolbar">
    <span class="ql-formats">
      <button class="ql-bold" />
      <button class="ql-italic" />
      <button class="ql-underline" />
      <button class="ql-strike" />
      <button class="ql-code-block" />
      <button class="ql-header" value="2" />
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="ordered" />
      <button class="ql-list" value="bullet" />
    </span>
    <span class="ql-formats">
      <button class="ql-script" value="sub" />
      <button class="ql-script" value="super" />
    </span>
    {/* <span class="ql-formats">
      <button class="ql-indent" value="-1" />
      <button class="ql-indent" value="+1" />
    </span> */}
    <span class="ql-formats">
      <button class="ql-direction" value="rtl" />
    </span>
    <span class="ql-formats">
      <select class="ql-size">
        <option value="small" />
        <option selected />
        <option value="large" />
        <option value="huge" />
      </select>
    </span>
    <span class="ql-formats">
      <select class="ql-header">
        <option value="1" />
        <option value="2" />
        <option value="3" />
        <option value="4" />
        <option value="5" />
        <option value="6" />
        <option selected />
      </select>
    </span>
    <span class="ql-formats">
      <select class="ql-color">
        <option selected />
        <option value="#e60000" />
        <option value="#ff9900" />
        <option value="#ffff00" />
        <option value="#008a00" />
        <option value="#0066cc" />
        <option value="#9933ff" />
        <option value="#ffffff" />
        <option value="#facccc" />
        <option value="#ffebcc" />
        <option value="#ffffcc" />
        <option value="#cce8cc" />
        <option value="#cce0f5" />
        <option value="#ebd6ff" />
        <option value="#bbbbbb" />
        <option value="#f06666" />
        <option value="#ffc266" />
        <option value="#ffff66" />
        <option value="#66b966" />
        <option value="#66a3e0" />
        <option value="#c285ff" />
        <option value="#888888" />
        <option value="#a10000" />
        <option value="#b26b00" />
        <option value="#b2b200" />
        <option value="#006100" />
        <option value="#0047b2" />
        <option value="#6b24b2" />
        <option value="#444444" />
        <option value="#5c0000" />
        <option value="#663d00" />
        <option value="#666600" />
        <option value="#003700" />
        <option value="#002966" />
        <option value="#3d1466" />
      </select>
      <select class="ql-background">
        <option value="#000000" />
        <option value="#e60000" />
        <option value="#ff9900" />
        <option value="#ffff00" />
        <option value="#008a00" />
        <option value="#0066cc" />
        <option value="#9933ff" />
        <option selected />
        <option value="#facccc" />
        <option value="#ffebcc" />
        <option value="#ffffcc" />
        <option value="#cce8cc" />
        <option value="#cce0f5" />
        <option value="#ebd6ff" />
        <option value="#bbbbbb" />
        <option value="#f06666" />
        <option value="#ffc266" />
        <option value="#ffff66" />
        <option value="#66b966" />
        <option value="#66a3e0" />
        <option value="#c285ff" />
        <option value="#888888" />
        <option value="#a10000" />
        <option value="#b26b00" />
        <option value="#b2b200" />
        <option value="#006100" />
        <option value="#0047b2" />
        <option value="#6b24b2" />
        <option value="#444444" />
        <option value="#5c0000" />
        <option value="#663d00" />
        <option value="#666600" />
        <option value="#003700" />
        <option value="#002966" />
        <option value="#3d1466" />
      </select>
    </span>
    <span class="ql-formats">
      <select class="ql-font">
        <option selected="selected" />
        <option value="serif" />
        <option value="monospace" />
      </select>
    </span>
    <span class="ql-formats">
      <select class="ql-align">
        <option selected />
        <option value="center" />
        <option value="right" />
        <option value="justify" />
      </select>
    </span>
    {/* <span class="ql-formats">
      <button class="ql-link" />
      <button class="ql-image" />
    </span> */}
    <div id="blue">
    <span class="ql-formats">
      <select class="ql-placeholder">
        {modules.placeholder.placeholders.map(p => (
          <option value={p.id}>{p.displayName}</option>
        ))}
      </select>
    </span>
    </div>
    <span class="ql-formats">
      <button class="ql-clean" />
    </span>
  </div>
)

const sanitizeClipboardEvent = ({ event }) => {
  const clipboardText = event.clipboardData.getData('text')
  console.log('clipboardData', clipboardText)
  const clean = sanitizeHtml(clipboardText, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'span', 'button'],
  })
  console.log('clean', clean)
  return clean
}

export default class Editor extends Component {
  // state = { text: '' }

  handleChange = (value, delta, source, editor) => {
    console.log('value', value)
    console.log('editor.getHTML', editor.getHTML())
    console.log('editor.getText', editor.getText())
    // this.setState({ text: value })
  }

  setRef = node => (this.editorRef = node)

//   componentDidMount() {
//     this.editorRef.getEditor().root.addEventListener('paste', event => {
//       console.log('asdf', this.editorRef.getEditor())
//       event.preventDefault()
//       const text = sanitizeClipboardEvent({ event })
//       const { index: cursorIndex } = this.editorRef.getEditorSelection()
//       console.log('cursorIndex', cursorIndex)
//       this.editorRef
//         .getEditor()
//         .clipboard.dangerouslyPasteHTML(cursorIndex, text)
//     })
//   }

  render() {
    return (
      <Fragment>
        <CustomToolbar />
        <ReactQuill
          defaultValue="
<b>Contract Name</b><br><br>       
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac sodales ex. Mauris sit amet velit vel lorem aliquam placerat sit amet aliquam tellus. Mauris nibh dui, lobortis a tellus vel, malesuada vestibulum nibh. Curabitur ac bibendum sapien. Maecenas ac congue est. Fusce condimentum vitae mauris quis mollis. Ut non ultricies elit, at lobortis diam. Praesent tincidunt molestie magna, nec condimentum elit consectetur in.<br><br>

Ut faucibus nisi non ex fermentum lobortis.Pellentesque tristique enim vel consequat accumsan. Mauris ultrices urna dui, vel ultricies sapien eleifend porttitor. In commodo euismod tincidunt. Nulla in tellus molestie ipsum vestibulum blandit. Etiam at nisl nec ex suscipit mollis. Praesent sed congue ipsum, ac ullamcorper justo. Curabitur sem libero, hendrerit euismod nisi ut, bibendum cursus quam. Nullam vitae ex in erat laoreet lacinia eu nec purus. Aenean vel vehicula magna. Morbi ac turpis sem.<br><br>

Fusce tempor et turpis vulputate interdum. In ornare nisl ac massa laoreet sollicitudin. Duis vitae facilisis nisl, imperdiet volutpat justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam quis mattis enim. Nullam et lectus egestas ex suscipit volutpat et id augue. Cras sodales faucibus ex, vitae ullamcorper lorem scelerisque sit amet. Vivamus dui tellus, convallis id eros eget, feugiat accumsan mi. Donec eget tellus eget orci finibus volutpat ut non velit. Maecenas elementum quam ac risus posuere malesuada. Nam iaculis rutrum nibh elementum feugiat. Nam faucibus porttitor massa ut tincidunt. Aliquam finibus mi et erat fringilla consectetur. Suspendisse pretium mauris mi, non viverra leo bibendum in. Pellentesque efficitur lorem orci, ac facilisis metus ultricies non. Nullam sollicitudin urna ut urna scelerisque imperdiet.<br><br>

In ut lacus eget tellus elementum pretium auctor a eros. Nam at semper ante. Phasellus at augue sit amet quam dapibus hendrerit nec tristique eros. Ut blandit iaculis tortor, malesuada luctus eros. Sed urna urna, ornare ac aliquam eget, sagittis non nibh. Sed cursus ultricies imperdiet. Praesent quis libero felis. Nulla facilisi. Cras eget tortor malesuada, tincidunt mi at, scelerisque nibh. Vestibulum vel urna id justo vestibulum hendrerit nec at sem. Maecenas maximus id sem dignissim dignissim. Maecenas facilisis diam eu felis condimentum ultricies.<br><br>

Suspendisse potenti. Fusce eros sem, hendrerit at facilisis et, rhoncus et neque. Nulla varius placerat quam, non sollicitudin est facilisis ut. Proin nec molestie turpis, ac ullamcorper urna. Ut consequat lectus a nibh tristique commodo. Duis semper augue mauris, eu aliquet nulla bibendum semper. Vestibulum lacinia sodales tellus, ut lobortis erat euismod maximus. Nulla ultrices quis erat maximus malesuada. Aenean vitae lobortis arcu<br><br>."
          theme="snow" 
          modules={modules}
          onChange={this.handleChange}
          placeholder="Type something awesome!"
          ref={this.setRef}
        />
      </Fragment>
    )
  }
}




// React Quill Lite wrapper :
// https://github.com/zenoamaro/react-quill/issues/237


//https://codepen.io/abolo/pen/xmzZbO

// Thank you destiniy!!!!
// https://codesandbox.io/s/vywr23wk50?file=/src/Editor.css:1-254