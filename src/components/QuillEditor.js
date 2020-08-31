import React, { Fragment, Component } from 'react'
import Quill from 'quill'

import getPlaceholderModule from 'quill-placeholder-module'
import sanitizeHtml from 'sanitize-html'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './Editor.css'

Quill.register('modules/placeholder', getPlaceholderModule(Quill, {
  className: 'ql-placeholder-content'  // default
}))


var currentEditor; // selected / focused editor
var currentFormats; // save the current formattings


// Place holder Module
// https://github.com/jspaine/quill-placeholder-module

function createEditor(selector, ...args) {
	
	var quill = new Quill(selector, {
		modules: {
      toolbar: '#toolbar',
      placeholder: {
        delimiters: ['{', '}'],  // default
        placeholders: [
          {id: 'contractname', label: 'contractname'},
          {id: 'taxresidence', label: 'taxresidence', required: true}
        ]
      }
		},
		theme: 'snow',
	});

	quill.on("editor-change", () => {		
		currentEditor = quill;
		
		updateButtons();
	});
}

// get current formattings to style the toolbar buttons
function updateButtons() {
	if (currentEditor.getSelection()) {
		currentFormats = currentEditor.getFormat();
	}
}

export default class Editor extends Component {
  // state = { text: '' }

  constructor(props){
    super(props)
    this.currentEditor = null;
    this.currentFormats = null;
    this.createEditor = this.createEditor.bind(this)


  }
  componentDidMount() {
    this.createEditor("#editor1");
    this.createEditor("#editor2");
    this.createEditor("#editor3");
    this.createEditor("#editor4");
  }
  createEditor(selector, ...args){
    var quill = new Quill(selector, {
      modules: {
        toolbar: '#toolbar',
        placeholder: {
          delimiters: ['{', '}'],  // default
          placeholders: [
            {id: 'contractname', label: 'contractname'},
            {id: 'taxresidence', label: 'taxresidence', required: true}
          ]
        }
      },
      theme: 'snow',
    });
  
    quill.on("editor-change", () => {		
      this.currentEditor = quill;
      
      this.updateButtons();
    });
  }
  updateButtons(){
    if (this.currentEditor.getSelection()) {
      this.currentFormats = this.currentEditor.getFormat();
    }
  }


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
<div>
<nav id="toolbar" className="nav-toolbar">
  <span style={{backgroundColor:'#556EE6',color:"white"}}className="ql-formats color" id="blueBackground">
      <select class="ql-placeholder">
      <option value="contractname">Tax Residence</option>
      <option value="taxresidence">Contract Name</option>
    </select>
  </span>
		<span className="ql-formats">
			<select className="ql-font">
				<option value="sans-serif">Sans Serif</option>
				<option value="serif">Serif</option>
				<option value="monospace">Monospace</option>
			</select>
		</span>
		<span className="ql-formats">
			<select className="ql-size">
				<option value="small">Small</option>
				<option selected>Normal</option>
				<option value="large">Large</option>
			</select>
    	</span>
		
		<span className="ql-formats">
			<select className="ql-color" title="Colour">
				<option value="rgb(255,0,0)" />
				<option value="rgb(0,255,0)" selected />
				<option value="rgb(0,0,255)" />
			</select>
		</span>

		<span className="ql-formats">
			<button className="ql-bold" id="bold" onclick="onBoldClick()">
				<span className="fa fa-bold"></span>
		</button>
		<button className="ql-italic" id="italic" onclick="onItalicClick()">
				<span className="fa fa-italic"></span>
			</button>
		<button className="ql-underline" id="underline" onclick="onUnderlineClick()">
				<span className="fa fa-underline"></span>
			</button>
		<button className="ql-strike" id="strike" onclick="onStrikeClick()">
				<span className="fa fa-strikethrough"></span>
			</button>
		</span>

		<span className="ql-formats">
			<button className="ql-align-left" id="align-left" onclick="onAlignLeftClick()">
				<span className="fa fa-align-left"></span>
		</button>
		<button className="ql-align-right" id="align-right" onclick="onAlignRightClick()">
				<span className="fa fa-align-right"></span>
			</button>
		<button className="ql-align-center" id="align-center" onclick="onAlignCenterClick()">
				<span className="fa fa-align-center"></span>
			</button>
		<button className="ql-align-justify" id="align-justify" onclick="onAlignJustifyClick()">
				<span className="fa fa-align-justify"></span>
			</button>
		</span>

		<span className="ql-formats">
			<button type="button" className="ql-list" value="bullet" onclick="onListULClick()">
				<span className="fa fa-list"></span>
			</button>
			<button type="button" className="ql-list" value="ordered" onclick="onListOLClick()">
				<span className="fa fa-list-ol"></span>
			</button>
		</span>
		
		<span className="ql-formats">
			<button type="button" className="ql-blockquote" value="blockquote" onclick="onBlockquoteClick()">
				<span className="fa fa-quote-right"></span>
			</button>
		</span>

</nav>

<br/><br/>

<section className="row">
	<div className="col-md-6">
		<h2 className="h4 text-center">Clause #1</h2>
		<div id="editor1">
			<p>Hello World!</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some <em>lorem ipsum</em> text</p>
		</div>
	</div>
	<div className="col-md-6">
		<h2 className="h4 text-center">Clause #2</h2>
		<div id="editor2">
			<p>Hello World! 2</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some lorem ipsum text</p>
		</div>
	</div>
</section>

<br/> <br/>

<section className="row">
	<div className="col-md-6">
		<h2 className="h4">Clause #3</h2>
		<div id="editor3">
			<p>Hello World! 3</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some <em>lorem ipsum</em> text</p>
		</div>
	</div>
	<div className="col-md-6">
		<h2 className="h4 text-center">Clause #4</h2>
		<div id="editor4">
			<p>Hello World! 4</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some lorem ipsum text</p>
		</div>
	</div>
</section>
</div>
    )
  }
}


function onBoldClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.bold) {
		currentEditor.format("bold", false);
	} else {
		currentEditor.format("bold", true);
	}
}
function onItalicClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.italic) {
		currentEditor.format("italic", false);
	} else {
		currentEditor.format("italic", true);
	}
}
function onUnderlineClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.underline) {
		currentEditor.format("underline", false);
	} else {
		currentEditor.format("underline", true);
	}
}
function onStrikeClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.strike) {
		currentEditor.format("strike", false);
	} else {
		currentEditor.format("strike", true);
	}
}

function onAlignLeftClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (!currentFormats.align) {
		currentEditor.format('align', true);
	} else {
		currentEditor.format('align', false);
	}
}
function onAlignRightClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.align == 'right') {
		currentEditor.format('align', 'right', true);
	} else {
		currentEditor.format('align', 'right', false);
	}
}
function onAlignCenterClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.align == 'center') {
		currentEditor.format('align', 'center', true);
	} else {
		currentEditor.format('align', 'center', false);
	}
}
function onAlignJustifyClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.align == 'justify') {
		currentEditor.format('align', 'justify', true);
	} else {
		currentEditor.format('align', 'justify', false);
	}
}

function onListULClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.list == 'bullet') {
		currentEditor.format('list', 'bullet', true);
	} else {
		currentEditor.format('list', 'bullet', false);
	}
}
function onListOLClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.list == 'ordered') {
		currentEditor.format('list', 'ordered', true);
	} else {
		currentEditor.format('list', 'ordered', false);
	}
}

function onBlockquoteClick() {
	if (!currentFormats || !currentEditor) {
		return;
	}

	if (currentFormats.blockquote) {
		currentEditor.format("blockquote", false);
	} else {
		currentEditor.format("blockquote", true);
	}
}


// React Quill Lite wrapper :
// https://github.com/zenoamaro/react-quill/issues/237


//https://codepen.io/abolo/pen/xmzZbO

// Thank you destiniy!!!!
// https://codesandbox.io/s/vywr23wk50?file=/src/Editor.css:1-254