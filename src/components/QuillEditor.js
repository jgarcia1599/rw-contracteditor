
import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';



export default class QuillEditor extends Component {
    constructor(props) {
        super(props);
    
        this.modules = {
            toolbar: [
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['clean']
            ]
        };
    
        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background'
          ];
        
          this.state = {
			comments: ''
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
                value={this.state.comments || ''}/>
                
            </div>
        )
    }
}
