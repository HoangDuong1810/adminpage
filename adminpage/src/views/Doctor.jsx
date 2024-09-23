import React from 'react';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import Modal from 'react-modal';
import "./Doctor.css"

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    specialty: 'Cardiology',
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    email: 'jane.smith@example.com',
    phone: '098-765-4321',
    specialty: 'Neurology',
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

let count = doctors.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(doctors);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (doctor) => {
    count += 1;
    doctors.push({
      ...doctor,
      id: count,
    });
    return Promise.resolve(doctor);
  },
  update: (data) => {
    const doctor = doctors.find(d => d.id === data.id);
    doctor.name = data.name;
    doctor.email = data.email;
    doctor.phone = data.phone;
    doctor.specialty = data.specialty;
    return Promise.resolve(doctor);
  },
  delete: (data) => {
    const doctor = doctors.find(d => d.id === data.id);
    doctors = doctors.filter(d => d.id !== doctor.id);
    return Promise.resolve(doctor);
  },
};

const styles = {
    container: { margin: 'auto', width: '80vw' },
  };
const Doctor = () => (
  <div style={styles.container}>
    <h2>Danh sách bác sĩ</h2>
    <CRUDTable
      // caption="Danh sách bác sĩ"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" hideInCreateForm />
        <Field name="name" label="Tên" placeholder="Tên" />
        <Field name="email" label="Email" placeholder="Email" />
        <Field name="phone" label="Số điện thoại" placeholder="Số điện thoại" />
        <Field name="specialty" label="Chuyên khoa" placeholder="Chuyên khoa" />
      </Fields>
      <CreateForm
  title="Thêm bác sĩ"
  message="Thêm bác sĩ mới"
  trigger={<button className="add-doctor-button">Thêm bác sĩ</button>}
  onSubmit={doctor => service.create(doctor)}
  submitText="Thêm"
  validate={values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Xin hãy nhập tên bác sĩ";
    }
    if (!values.email) {
      errors.email = "Xin hãy nhập email bác sĩ";
    }
    if (!values.phone) {
      errors.phone = "Xin hãy nhập số điện thoại bác sĩ";
    }
    if (!values.specialty) {
      errors.specialty = "Xin hãy nhập chuyên khoa bác sĩ";
    }
    return errors;
  }}
/>
      <UpdateForm
        title="Sửa thông tin bác sĩ"
        message="Cập nhật thông tin bác sĩ"
        trigger="Sửa"
        onSubmit={doctor => service.update(doctor)}
        submitText="Sửa"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Nhập ID bác sĩ";
          }
          if (!values.name) {
            errors.name = "Nhập tên bác sĩ";
          }
          if (!values.email) {
            errors.email = "Nhập email bác sĩ";
          }
          if (!values.phone) {
            errors.phone = "Nhập SDT bác sĩ";
          }
          if (!values.specialty) {
            errors.specialty = "Nhập chuyên khoa của bác sĩ";
          }
          return errors;
        }}
      />
      <DeleteForm
        title="xóa bác sĩ"
        message="Bạn có chắc chắn muốn xóa?"
        trigger="Xóa"
        onSubmit={doctor => service.delete(doctor)}
        submitText="Xóa bác sĩ"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
    <div className="button-container">
      {/* <button className="add-doctor-button" onClick={openModal}>Thêm bác sĩ</button> */}
    </div>
  </div>
);

export default Doctor;
