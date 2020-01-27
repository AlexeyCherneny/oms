import React from "react";
import { Icon } from "antd";

import * as styles from './styles/Modals.module.scss';

export const DeleteModal = (
  <>
    <span className={styles.iconConfirm}><Icon type="question-circle" /></span>
    Вы действительно желаете удалить документ?
  </>
);

export const SaveModal = (
  <>
    <span className={styles.iconConfirm}><Icon type="question-circle" /></span>
    Документ содержит несохраненные изменения. Вы желаете сохранить документ?
  </>
);
