import React from "react"
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import { reduxForm } from 'redux-form'
import validate from './validate'

import './forms_css/forms_main.css'

class Basic extends React.Component {
  constructor(props) {
    super(props)
    const { input: { value } } = this.props
    if(value){
      this.state = { files: value }
    }else {
      this.state = { files: [] }
    }
    this.onDrop = this.onDrop.bind(this)
  }
  onDrop(files) {

    console.log({onDrop: files})

    const { onChange } = this.props.input
    this.setState({
        files
      }, ()=>{
        onChange(this.state.files)
    })
  }
  render() {
    const boxStyling = {
      display: "block",

      width: "280px",
      height: "40px",
      border: "2px dashed",
      borderRadius: "30px",
      borderColor: "rgb(227,165,0)",
      backgroundColor: "rgb(255,240,200)",
      paddingTop: "20px",
      margin: "20px auto 0",
      cursor: "pointer"
    }
    const ulStyling = {
      overflowWrap: "break-word",
      listStyle: "none",
      width: "100px",
      margin: "0",
      marginLeft: "-15px",
      marginTop: "45px"
    }
    return (
      <div>

          <Dropzone
            className='dropzone-box'
            onDrop={this.onDrop.bind(this)}
            accept=".doc,.rtf,.wps,.odt,.wpd,.txt,.pdf,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <p>{this.context.t('Tap to upload CV from your device')}</p>
            <ul style={ulStyling}>
              {
                this.state.files.map(f => <li key={f.name}>{f.name}</li>)
              }
            </ul>
          </Dropzone>

      </div>
    )
  }
}

Basic.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(Basic)






//Some other version if the first one doesnt work

/*import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';

class FileInput extends Component {
  static propTypes = {
    dropzone_options: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    input: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    cbFunction: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    cbFunction: () => {},
  };

  render() {
    const { className, input: { onChange }, dropzone_options, meta: { error, touched }, label, classNameLabel, children, name, cbFunction } = this.props;

    const boxStyling = {
      display: "block",
      margin: "auto",
      width: "200px",
      marginTop: '20px',
      border: '3px dotted'
    }
    const ulStyling = {
      overflowWrap: "break-word",
      listStyle: "none",
      width: "150px",
      margin: "0",
      marginLeft: "-15px",
      marginTop: "45px"
    }

    return (
      <div style={boxStyling} className={`${className}` + (error && touched ? ' has-error ' : '')}>
        <Dropzone
          {...dropzone_options}
          onDrop={(f) => {

            console.log({f})

            cbFunction(f);
            return onChange(f);
          }}
          className="dropzone-input"
          name={name}
        >
          <p>{this.context.t('Tap to upload CV')}</p>
          {children}
        </Dropzone>
        {error && touched ? error : ''}
      </div>
    );
  }
}

FileInput.contextTypes = {
  t: PropTypes.func.isRequired
}


export default props => <Field {...props} component={FileInput} />;*/
