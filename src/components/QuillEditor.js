import React, { Fragment, Component } from 'react'
import Quill from 'quill'

import getPlaceholderModule from 'quill-placeholder-module'
import sanitizeHtml from 'sanitize-html'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './Editor.css'
import contractdata from './contract.json'

Quill.register('modules/placeholder', getPlaceholderModule(Quill, {
  className: 'ql-placeholder-content'  // default
}))

export default class Editor extends Component {
  // state = { text: '' }

  constructor(props){
    super(props)
    this.state = {
      currentEditor:null,
      currentFormats:null,
      clauseEditors:[],
      contractData:[]
    }
    const data = contractdata.map( (clause) =>{
      console.log(clause);
      this.setState({
        contractdata: this.state.contractData.push(clause)
      })
    })
    console.log(this.state.contractData);

    // this.currentEditor = null;
    // this.currentFormats = null;
    // this.clauseEditors = [];
    // this.contractaData = [];

    this.createEditor = this.createEditor.bind(this);
    this.handleChange =  this.handleChange.bind(this);
    this.editorchangelistener = this.editorchangelistener.bind(this)
    this.MoveClausesDown = this.MoveClausesDown.bind(this)
    this.MoveClausesUp = this.MoveClausesUp.bind(this)
    this.Movecurrenteditordata = this.Movecurrenteditordata.bind(this)
    this.savecurrenteditordata = this.savecurrenteditordata.bind(this)



  }
  componentDidMount() {
    //this is where the backend call would go

    // const data = contractdata.map( (clause) =>{
    //   console.log(clause);
    //   this.setState({
    //     contractdata: this.state.contractData.push(clause)
    //   })
    // })
    // console.log(this.state.contractData);

    // using set timeout here to allow quill to look for the corresponding
    // renderings in the html
    // thanks to https://stackoverflow.com/questions/49274106/quill-error-quill-invalid-quill-container
    setTimeout( () =>
    {
      var quils = []
      for (var i=0; i<this.state.contractData.length;i++){
          var clauseeditor = this.createEditor(`#editor${i+1}`);
          console.log(clauseeditor);
          quils.push(clauseeditor);

      }
      console.log("Quil editors",quils)
      this.setState({
        clauseEditors:quils
      })
      console.log("Ok now the editors are on the state", this.state.clauseEditors);
    },10)
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
    return quill;
  }
  editorchangelistener(editor){
    editor.on("editor-change", () => {		
      this.currentEditor = editor;
      this.updateButtons();
    });

  }
  updateButtons(){
    if (this.currentEditor.getSelection()) {
      this.currentFormats = this.currentEditor.getFormat();
    }
  }
  MoveClausesUp(event){
    console.log("Move Clauses Up")
    const clause_to_move_up_from = parseInt(event.target.id[0]);
    console.log("clause_to_move_up_from",clause_to_move_up_from);
    var reordered_data = shift(this.state.contractData,-1,1);
    this.setState({
      contractData:reordered_data,
    })
    this.savecurrenteditordata(reordered_data);
  }
  MoveClausesDown(event){
    console.log("Move Clauses Down")
    const clause_to_move_down_from = parseInt(event.target.id[0]);
    console.log("clause_to_move_down_from",clause_to_move_down_from);
    var reordered_data = shift([...this.state.contractData],1,1);
    console.log("Reordered")
    console.log(reordered_data);
    this.setState({
      contractData:[...reordered_data],
    })
    this.Movecurrenteditordata(reordered_data);
  }
  Movecurrenteditordata(reordered_data){
    console.log("jsjsjsj")
    console.log(this.state.contractData);
    var editors = this.state.clauseEditors;
    for (var i = 0; i< editors.length;i++){
      var currentEditor = editors[i];
      var containerid = parseInt(currentEditor.container.id[currentEditor.container.id.length - 1]);
      console.log(containerid);
      var contractdata = reordered_data;
      console.log(contractdata);
      var contractdataitem = contractdata[containerid - 1];
      console.log(contractdataitem);
      currentEditor.setContents([{ insert: contractdataitem.content }]);
    }
    // for (var i = 0;i< this.state.contractData.length;i++){
    //   console.log(i);
    //   console.log(this.state.contractData[i])
    // }
  }
  savecurrenteditordata(reordered_data){
    console.log("jsjsjsj")
    console.log(this.state.contractData);
    var editors = this.state.clauseEditors;
    for (var i = 0; i< editors.length;i++){
      var currentEditor = editors[i];
      var containerid = parseInt(currentEditor.container.id[currentEditor.container.id.length - 1]);
      console.log(containerid);
      var contractdata = reordered_data;
      console.log(contractdata);
      var contractdataitem = contractdata[containerid - 1];
      console.log(contractdataitem);
      currentEditor.setContents([{ insert: contractdataitem.content }]);
    }
    // for (var i = 0;i< this.state.contractData.length;i++){
    //   console.log(i);
    //   console.log(this.state.contractData[i])
    // }
  }


  handleChange = (value) => {
    // console.log('value', value);
    // console.log("jsjsjsjsj")
    // this.setState({ text: value })
  }

  setRef = node => (this.editorRef = node)

  render() {
    // console.log("Ok now the editors are on the state", this.state.clauseEditors);
    for (var i =0;i<this.state.clauseEditors.length;i++){
      var currentEditor = this.state.clauseEditors[i];
      this.editorchangelistener(currentEditor);

    } 
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
{this.state.contractData.map((value,key)=>{
      {/* console.log("Key",key);
      console.log("Value",value);
      const editorid = `editor${key+1}`;
      console.log("Editor ",editorid); */}
      return(
      <div className="col-md-6">
        <h2 className="h4 text-center">Clause {value.id}: {value.name}</h2>
        <button  id={`${key}_up`}onClick={this.MoveClausesUp}>Up</button>
        <button id={`${key}_down`} onClick = {this.MoveClausesDown}>Down</button>
        <div id={`editor${key+1}`} onChange={this.handleChange()}>
          <p>{value.content}</p>
        </div>
      </div>
      )
    })}
</section>

</div>
    )
  }
}

//utility function to reorder array
// thanks to https://gist.github.com/damirm/18848ae9636abb524eb4
function shift(arr, direction, n) {
  var times = n > arr.length ? n % arr.length : n;
  return arr.concat(arr.splice(0, (direction > 0 ? arr.length - times : times)));
}



// React Quill Lite wrapper :
// https://github.com/zenoamaro/react-quill/issues/237


//https://codepen.io/abolo/pen/xmzZbO

// Thank you destiniy!!!!
// https://codesandbox.io/s/vywr23wk50?file=/src/Editor.css:1-254


{/* <section className="row">
	<div className="col-md-6">
		<h2 className="h4 text-center">Clause #1</h2>
    <button>Up</button>
    <button>Down</button>
		<div id="editor1" onChange={this.handleChange()}>
			<p>Hello World!</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some <em>lorem ipsum</em> text</p>
		</div>
	</div>
	<div className="col-md-6">
		<h2 className="h4 text-center">Clause #2</h2>
    <button>Up</button>
    <button>Down</button>
		<div id="editor2">
			<p>Hello World! 2</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some lorem ipsum text</p>
		</div>
	</div>
	<div className="col-md-6">
		<h2 className="h4">Clause #3</h2>
    <button>Up</button>
    <button>Down</button>
		<div id="editor3">
			<p>Hello World! 3</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some <em>lorem ipsum</em> text</p>
		</div>
	</div>
	<div className="col-md-6">
		<h2 className="h4 text-center">Clause #4</h2>
    <button>Up</button>
    <button>Down</button>
		<div id="editor4">
			<p>Hello World! 4</p>
		</div>
	</div>
	<div className="col-md-6">
  <h2 className="h4">Clause #5</h2>
    <button>Up</button>
    <button>Down</button>
		<div id="editor5">
			<p>Hello World! 5</p>
			<p>Some initial <strong>bold</strong> text</p>
			<p>Some <em>lorem ipsum</em> text</p>
		</div>

  </div>
</section> */}


