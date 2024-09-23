import React from 'react';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import Modal from 'react-modal';
import "./Plans.css";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let plans = [
  {
    id: 1,
    date: '2024-09-21',
    time: '10:00',
    content: 'Meeting with team',
    notes: 'Discuss project milestones',
  },
  {
    id: 2,
    date: '2024-09-22',
    time: '14:00',
    content: 'Doctor appointment',
    notes: 'Annual check-up',
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

let count = plans.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(plans);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (plan) => {
    count += 1;
    plans.push({
      ...plan,
      id: count,
    });
    return Promise.resolve(plan);
  },
  update: (data) => {
    const plan = plans.find(p => p.id === data.id);
    plan.date = data.date;
    plan.time = data.time;
    plan.content = data.content;
    plan.notes = data.notes;
    return Promise.resolve(plan);
  },
  delete: (data) => {
    const plan = plans.find(p => p.id === data.id);
    plans = plans.filter(p => p.id !== plan.id);
    return Promise.resolve(plan);
  },
};

const styles = {
  container: { margin: 'auto', width: '80vw' },
};

const Plans = () => (
  <div style={styles.container}>
    <h2>Bảng kế hoạch</h2>
    <CRUDTable
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="ID" hideInCreateForm />
        <Field name="date" label="Ngày" placeholder="Ngày" />
        <Field name="time" label="Giờ" placeholder="Giờ" />
        <Field name="content" label="Nội dung" placeholder="Nội dung" />
        <Field name="notes" label="Ghi chú" placeholder="Ghi chú" />
      </Fields>
      <CreateForm
        title="Thêm kế hoạch"
        message="Thêm kế hoạch mới"
        trigger={<button className="add-plan-button">Thêm kế hoạch</button>}
        onSubmit={plan => service.create(plan)}
        submitText="Thêm"
        validate={values => {
          const errors = {};
          if (!values.date) {
            errors.date = "Xin hãy nhập ngày";
          }
          if (!values.time) {
            errors.time = "Xin hãy nhập giờ";
          }
          if (!values.content) {
            errors.content = "Xin hãy nhập nội dung";
          }
          return errors;
        }}
      />
      <UpdateForm
        title="Sửa thông tin kế hoạch"
        message="Cập nhật thông tin kế hoạch"
        trigger="Sửa"
        onSubmit={plan => service.update(plan)}
        submitText="Sửa"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Nhập ID kế hoạch";
          }
          if (!values.date) {
            errors.date = "Xin hãy nhập ngày";
          }
          if (!values.time) {
            errors.time = "Xin hãy nhập giờ";
          }
          if (!values.content) {
            errors.content = "Xin hãy nhập nội dung";
          }
          return errors;
        }}
      />
      <DeleteForm
        title="Xóa kế hoạch"
        message="Bạn có chắc chắn muốn xóa kế hoạch này?"
        trigger="Xóa"
        onSubmit={plan => service.delete(plan)}
        submitText="Xóa"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Nhập ID kế hoạch";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

export default Plans;
