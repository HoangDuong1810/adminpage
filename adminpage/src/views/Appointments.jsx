import React from 'react';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import Modal from 'react-modal';
import "./Doctor.css";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let appointments = [
  {
    id: 1,
    doctor: 'Dr. John Doe',
    patient: 'Alice Johnson',
    disease: 'Flu',
    notes: 'Tây chiểu',
  },
  {
    id: 2,
    doctor: 'Dr. Jane Smith',
    patient: 'Bob Brown',
    disease: 'Migraine',
    notes: 'Tây chiểu',
  },
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = appointments.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(appointments);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (appointment) => {
    count += 1;
    appointments.push({
      ...appointment,
      id: count,
    });
    return Promise.resolve(appointment);
  },
  update: (data) => {
    const appointment = appointments.find(a => a.id === data.id);
    appointment.doctor = data.doctor;
    appointment.patient = data.patient;
    appointment.disease = data.disease;
    return Promise.resolve(appointment);
  },
  delete: (data) => {
    const appointment = appointments.find(a => a.id === data.id);
    appointments = appointments.filter(a => a.id !== appointment.id);
    return Promise.resolve(appointment);
  },
};

const styles = {
  container: { margin: 'auto', width: '80vw' },
};

const Appointments = () => (
  <div style={styles.container}>
    <h2>Bảng lịch hẹn</h2>
    <CRUDTable
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" hideInCreateForm />
        <Field name="doctor" label="Bác sĩ" placeholder="Tên bác sĩ" />
        <Field name="patient" label="Bệnh nhân" placeholder="Tên bệnh nhân" />
        <Field name="disease" label="Bệnh" placeholder="Bệnh" />
        <Field name="notes" label="Ghi chú" placeholder="Ghi chú" />
      </Fields>
      <CreateForm
        title="Add Appointment"
        message="Create a new appointment"
        trigger={<button className="add-appointment-button">Thêm kế hoạch</button>}
        onSubmit={appointment => service.create(appointment)}
        submitText="Thêm"
        validate={values => {
          const errors = {};
          if (!values.doctor) {
            errors.doctor = "Điền tên bác sĩ";
          }
          if (!values.patient) {
            errors.patient = "Điền tên bệnh nhân";
          }
          if (!values.disease) {
            errors.disease = "Điền tên bệnh";
          }
          return errors;
        }}
      />
      <UpdateForm
        title="Sửa Kế hoạch"
        message="Cập nhật kế hoạch"
        trigger="Sửa"
        onSubmit={appointment => service.update(appointment)}
        submitText="Cập nhật"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Điền ID";
          }
          if (!values.doctor) {
            errors.doctor = "Điền tên bác sĩ";
          }
          if (!values.patient) {
            errors.patient = "Điền tên bệnh nhân";
          }
          if (!values.disease) {
            errors.disease = "Điền tên bệnh";
          }
          return errors;
        }}
      />
      <DeleteForm
        title="Xóa kế hoạch"
        message="Bạn có chắc muốn xóa kế hoạch"
        trigger="Xóa"
        onSubmit={appointment => service.delete(appointment)}
        submitText="Xóa"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please enter the appointment ID";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

export default Appointments;
