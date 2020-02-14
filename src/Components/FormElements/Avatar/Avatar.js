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
  const isJpgOrPng = /^image\/(jpeg|png)$/.test(file.type);
  if (!isJpgOrPng) {
    message.error("Необходимо загрузить JPG/PNG файл");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Изображение должно быть не более 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const dummyRequest = ({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0);

const initialState = {
  isOpenCropper: false,
  imageUrl: null
};

class Avatar extends React.PureComponent {
  state = initialState;
  cropperRef = null;

  handleChange = info => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({ isOpenCropper: true, imageUrl });
      });
    }
  };

  createCropperRef = cropper => (this.cropperRef = cropper);

  handleApply = () => {
    if (this.cropperRef && this.cropperRef.getCroppedCanvas() !== "undefined") {
      const imageUrl = this.cropperRef.getCroppedCanvas().toDataURL();
      this.setState(initialState);

      this.props.onChange(imageUrl);
    }
  };

  handleСancel = () => {
    this.setState(initialState);
  };

  render() {
    const { isOpenCropper, imageUrl } = this.state;
    const { name, value } = this.props;

    return (
      <>
        <Modal
          visible={isOpenCropper}
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
          />
        </Modal>
        <Upload
          name={name}
          className={styles.Upload}
          customRequest={dummyRequest}
          showUploadList={false}
          beforeUpload={checkIsFileImage}
          onChange={this.handleChange}
        >
          {value ? (
            <img src={value} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              <Icon type={"plus"} style={{ fontSize: 28 }} />
              <div style={{ fontSize: 20 }}>Фото</div>
            </div>
          )}
        </Upload>
      </>
    );
  }
}

const AvatarWrapper = ({ form, name, settings, itemProps, ...props }) => {
  const decorateField = form
    ? form.getFieldDecorator(name, settings)
    : node => node;

  return decorateField(<Avatar name={props.name} {...props} />);
};

export default AvatarWrapper;
