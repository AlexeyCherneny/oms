import React from 'react';
import { Drawer, Spin } from 'antd';
import PlanEmployees from '../../../Components/Forms/PlanEmployees';

const PlanForm = ({
  onClose,
  handleSubmit,
  isLoading,
  isCreate,
  isOpen,
  initialValues
}) => (
  <Drawer
    title="Планирование численности сотрудников"
    width={640}
    onClose={onClose}
    visible={isOpen}
    bodyStyle={{ paddingBottom: 80 }}
    destroyOnClose
  >
    <Spin 
      spinning={isLoading}
      delay={250}
    >
      <PlanEmployees 
        initialValues={initialValues}
        isCreate={isCreate}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </Spin>
  </Drawer>
); 

export default PlanForm;
