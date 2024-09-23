import React from 'react';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import Modal from 'react-modal';
import "./Medicine.css";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let medicines = [
  {
    id: 1,
    name: 'Paracetamol',
    expiryDate: '2024-12-31',
    usage: 'Take one tablet every 6 hours',
  },
  {
    id: 2,
    name: 'Ibuprofen',
    expiryDate: '2025-06-30',
    usage: 'Take one tablet every 8 hours',
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

let count = medicines.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(medicines);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (medicine) => {
    count += 1;
    medicines.push({
      ...medicine,
      id: count,
    });
    return Promise.resolve(medicine);
  },
  update: (data) => {
    const medicine = medicines.find(m => m.id === data.id);
    medicine.name = data.name;
    medicine.expiryDate = data.expiryDate;
    medicine.usage = data.usage;
    return Promise.resolve(medicine);
  },
  delete: (data) => {
    const medicine = medicines.find(m => m.id === data.id);
    medicines = medicines.filter(m => m.id !== medicine.id);
    return Promise.resolve(medicine);
  },
};

const styles = {
  container: { margin: 'auto', width: '80vw' },
};

const Medicine = () => (
  <div style={styles.container}>
    <h2>Danh sách thuốc</h2>
    <CRUDTable
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" hideInCreateForm />
        <Field name="name" label="Tên thuốc" placeholder="Tên thuốc" />
        <Field name="expiryDate" label="Hạn sử dụng" placeholder="Hạn sử dụng" />
        <Field name="usage" label="Cách dùng" placeholder="Cách dùng" />
      </Fields>
      <CreateForm
        title="Thêm thuốc"
        message="Thêm thuốc mới"
        trigger={<button className="add-medicine-button">Thêm thuốc</button>}
        onSubmit={medicine => service.create(medicine)}
        submitText="Thêm"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Xin hãy nhập tên thuốc";
          }
          if (!values.expiryDate) {
            errors.expiryDate = "Xin hãy nhập hạn sử dụng";
          }
          if (!values.usage) {
            errors.usage = "Xin hãy nhập cách dùng";
          }
          return errors;
        }}
      />
      <UpdateForm
        title="Sửa thông tin thuốc"
        message="Cập nhật thông tin thuốc"
        trigger="Sửa"
        onSubmit={medicine => service.update(medicine)}
        submitText="Sửa"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Nhập ID thuốc";
          }
          if (!values.name) {
            errors.name = "Xin hãy nhập tên thuốc";
          }
          if (!values.expiryDate) {
            errors.expiryDate = "Xin hãy nhập hạn sử dụng";
          }
          if (!values.usage) {
            errors.usage = "Xin hãy nhập cách dùng";
          }
          return errors;
        }}
      />
      <DeleteForm
        title="Xóa thuốc"
        message="Bạn có chắc chắn muốn xóa thuốc này?"
        trigger="Xóa"
        onSubmit={medicine => service.delete(medicine)}
        submitText="Xóa"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Nhập ID thuốc";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

export default Medicine;
