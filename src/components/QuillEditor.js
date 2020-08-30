
import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import getPlaceholderModule from 'quill-placeholder-module';



Quill.register('modules/placeholder', getPlaceholderModule(Quill, {
    className: 'ql-placeholder-content'  // default
  }))
  


export default class QuillEditor extends Component {
    constructor(props) {
        super(props);
    
        this.modules = {
            toolbar: [
                [{'container':`#toolbar`}],
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['clean']
            ],
            placeholder:{
                placeholders: [
                  {id: 'foo', label: 'Foo'},
                  {id: 'required', label: 'Required', required: true}
                ]
            }
        }

    
        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
        ];
        
        this.state = {
            comments: '<b>jdjdjdj</b>'
            }
        
        this.onChangeText =  this.onChangeText.bind(this)
    }
    onChangeText = (content, delta, source, editor) => {
        console.log(editor.getHTML()); // HTML/rich text
        console.log(editor.getText()); // plain text
        console.log(editor.getLength()); // number of characters
    }
    render() {
        return (
            <div>
            <ReactQuill theme="snow" modules={this.modules}
                formats={this.formats}  onChange={this.onChangeText}
                placeholder={this.props.placeholder}
                value={this.state.comments || ''}>
                <div id="toolbar">
                <select class="ql-placeholder">
                    <option value="foo">Foo</option>
                    <option value="required">Required</option>
                </select>
                </div>
                <div id="editor">mkxkxkx</div>

                </ReactQuill>

                
            </div>
        )
    }
}



// React Quill Lite wrapper :
// https://github.com/zenoamaro/react-quill/issues/237


//https://codepen.io/abolo/pen/xmzZbO

// Thank you destiniy!!!!
// https://codesandbox.io/s/vywr23wk50?file=/src/Editor.css:1-254