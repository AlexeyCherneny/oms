import React from "react";
import { Upload, Icon, Button } from "antd";

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => onSuccess(), 0);
};

class CustomUpload extends React.PureComponent {
  handleChange = ({ file }) => {
    if (file.status === "uploading") {
      this.props.handleUpload && this.props.handleUpload(file);
    }
  };

  render() {
    return (
      <div onClick={event => event.stopPropagation()}>
        <Upload
          customRequest={dummyRequest}
          showUploadList={false}
          onChange={this.handleChange}
        >
          <Button size="small">
            <Icon type="upload" size="small" /> Загрузить
          </Button>
        </Upload>
      </div>
    );
  }
}

export default CustomUpload;
