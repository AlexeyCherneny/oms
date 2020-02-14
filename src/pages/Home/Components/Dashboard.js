import React from "react";
import {
  Row,
  Col
  //  Typography, Button
} from "antd";
// import { NavLink } from "react-router-dom";
import Moment from "moment";

import { Card } from "../../../Components";
// import ProjectsCard from "../Containers/ProjectCard";
import { formatCurrency, formatCount } from "../../../services/formatters";
import {
  // DATE_FORMATS,
  ROLES
} from "../../../services/constants";

// import * as styles from './styles/styles.module.scss';

Moment.locale("ru");

// const { Text, Paragraph } = Typography;

const colProps = {
  xs: 24,
  sm: 12,
  md: 8,
  style: { marginBottom: "24px" }
};

// const daysText = ['день', 'дня', 'дней'];
const peopleText = ["человек", "человека", "человек"];

const Dashboard = props => {
  // const nextSalaryDate = Moment(props.nextSalaryDate);
  // const salaryFooter = !props.nextSalary ? null : (
  //   <span>
  //     {nextSalaryDate.isValid() ? `С ${nextSalaryDate.format(DATE_FORMATS.fullString)} - ` : 'Следующее повышение - '}
  //     <Text>{formatCurrency(props.nextSalary, 'USD')}</Text>
  //   </span>
  // );

  // const currentSalaryFooter = !props.dayoff ? null : (
  //   <span>Отгулов - <Text>{formatCount(props.dayoff, ...daysText)}</Text></span>
  // );

  // const employeesFooter = props.role !== ROLES.hr ? null : (
  //   <span>Плановая численность - <Text>{formatCount(props.plannedEmployees, ...peopleText)}</Text></span>
  // );

  // const vacationFooter = (<NavLink to='/app/cabinet/events'><Text>Запланировать отпуск</Text></NavLink>);

  return (
    <Row gutter={24} type="flex">
      <Col {...colProps}>
        <Card
          header="Teкущая ЗП"
          title={
            props.salary ? formatCurrency(props.salary, "USD") : "Неизвестна"
          }
          // footer={salaryFooter}
          hideContent={props.isPrivate}
        />
      </Col>
      {/* <Col {...colProps} >
        <Card header="Ближайшие события">
        {props.events.length > 0 ? props.events.map(event => (
          <div className={styles.cell} key={`event_${event.uuid}`}>
            <Text strong ellipsis>{event.title}</Text>
            <Text type='secondary'>{Moment(event.date).format(DATE_FORMATS.pointFull)}</Text>
          </div>
        )) : (
          <div className={styles.events}>
            <Paragraph style={{marginBottom: '.5em'}}><Text>Cобытий пока нет.</Text></Paragraph>
            <NavLink to='/app/cabinet/events/new'><Button type='default'>Добавить</Button></NavLink>
          </div>
        )}
        </Card>
      </Col> */}
      {/* <Col {...colProps} >
        <Card
          header="Зарплата за текущий месяц"
          title={formatCurrency(props.currentSalary, 'USD')}
          footer={currentSalaryFooter}
          hideContent={props.isPrivate}
        />
      </Col> */}
      {/* <Col {...colProps} >
        <Card
          header="Доступное кол-во дней отпуска"
          title={formatCount(props.vacation, ...daysText)}
          footer={vacationFooter}
        />
      </Col> */}
      {props.roles.includes(ROLES.HR) && (
        <Col {...colProps}>
          <Card
            header="Количество сотрудников"
            title={formatCount(props.employees, ...peopleText)}
            // footer={employeesFooter}
          />
        </Col>
      )}
      {/* {props.roles.includes(ROLES.EMPLOYEE) && (
        <Col {...colProps}>
          <ProjectsCard />
        </Col>
      )} */}
    </Row>
  );
};

export default Dashboard;
