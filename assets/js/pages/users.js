const modal = document.getElementById('modal-table-users')
const modalHeader = document.getElementById('modal-header-table-users')
const modalBody = document.getElementById('modal-body-table-users')
const modalInstance = new mdb.Modal(modal, { backdrop: "static", keyboard: false, focus: true });



const table = document.getElementById('table-users')

const columns = [
  { label: 'Action', field: 'action' },
  { label: 'Email', field: 'email' },
  { label: 'Roles', field: 'roles' },
  { label: 'Create at', field: 'createdAt' },
  { label: 'Last login', field: 'lastLogin' },
  { label: 'Active', field: 'isActive' },
];

const tableInstance = new mdb.Datatable(table, {
  columns,
  rows: [],
}, { loading: true });

fetch('/api/users').then((response) => response.json()).then((data) => {
  tableInstance.update({
    rows: data.map((user, i) => {
      return {
        ...user,
        action: `
                <a role="button" class="edit-user-button text-muted me-4" data-mdb-index="${i}">
                  <i class="far fa-edit"></i>
                </a>
                <a role="button" class="delete-user-button text-danger popconfirm-toggle" data-mdb-index="${i}" >
                  <i class="far fa-trash pe-none"></i>
                </a>
              ` }
    })
  }, { loading: false })
  tableInstance.user = data
})

const setupButtons = (action) => {
  document.getElementsByClassName(`${action}-user-button`).forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = button.getAttribute('data-mdb-index');
      if (action === 'edit') {
        modalInstance.show()
      } else {
        const deleteInstance = new mdb.Popconfirm(button);
        deleteInstance.tempId = tableInstance.user[index]._id
      }
    });
    button.addEventListener('confirm.mdb.popconfirm', (e) => {
      console.log(e);
    })
  });
};

table.addEventListener('render.mdb.datatable', () => {
  setupButtons('edit');
  setupButtons('delete');
})
