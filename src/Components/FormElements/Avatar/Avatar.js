import React from "react";
import { Upload, Icon, message, Modal } from "antd";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import styles from "./styles.module.scss";

function getBase64(img, callback) {
  const reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function checkIsFileImage(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Необходимо загрузить JPG/PNG файл");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const dummyRequest = ({ onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const initialState = {
  isLoading: false,
  isOpenCroper: false,
  prevValue: null,
  imageUrl: null
};

class Avatar extends React.PureComponent {
  cropperRef = null;
  state = { ...initialState };

  handleChange = onChange => info => {
    switch (info.file.status) {
      case "uploading": {
        if (!this.state.isLoading) {
          this.setState({
            isLoading: true,
            prevValue: this.props.value
          });
        }
        break;
      }
      case "done": {
        getBase64(info.file.originFileObj, imageUrl => {
          this.setState({ isOpenCroper: true, isLoading: false, imageUrl });
          onChange(imageUrl);
        });
        break;
      }
      case "error": {
        this.setState({ isLoading: false });
        break;
      }
      default:
        break;
    }
  };

  handleCrop = () => {
    if (
      this.cropperRef &&
      typeof this.cropperRef.getCroppedCanvas() !== "undefined"
    ) {
      const imageUrl = this.cropperRef.getCroppedCanvas().toDataURL();
      this.props.onChange(imageUrl);
    }
  };

  createCropperRef = cropper => (this.cropperRef = cropper);

  handleApply = () => this.setState({ ...initialState });

  handleСancel = () => {
    this.props.onChange(this.state.prevValue);
    this.setState({ ...initialState });
  };

  render() {
    const { isLoading, isOpenCroper, imageUrl } = this.state;
    const { name, onChange, value } = this.props;

    const uploadButton = (
      <div>
        <Icon type={isLoading ? "loading" : "plus"} style={{ fontSize: 28 }} />
        <div style={{ fontSize: 20 }}>Фото</div>
      </div>
    );

    return (
      <>
        <Modal
          visible={isOpenCroper}
          onOk={this.handleApply}
          onCancel={this.handleСancel}
          title="Выберите границы изображения"
          okText="Продолжить"
          cancelText="Отменить"
          destroyOnClose
        >
          <Cropper
            ref={this.createCropperRef}
            src={imageUrl}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            guides={false}
            crop={this.handleCrop}
          />
        </Modal>
        <Upload
          name={name}
          className={styles.Upload}
          customRequest={dummyRequest}
          showUploadList={false}
          beforeUpload={checkIsFileImage}
          onChange={this.handleChange(onChange)}
        >
          {value ? (
            <img src={value} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </>
    );
  }
}

const AvatarWrapper = props =>
  props.form.getFieldDecorator(
    props.name,
    props.settings
  )(<Avatar name={props.name} />);

export default AvatarWrapper;
