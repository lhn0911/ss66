import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry, removeEntry, updateEntry } from "../store/reduces/List";

export default function TodoList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookBorrowing);
  const [filterStatus, setFilterStatus] = useState("");
  const [form, setForm] = useState({
    bookName: "",
    studentName: "",
    borrowDate: "",
    returnDate: "",
  });
  const [errors, setErrors] = useState({});

  const filteredBooks = filterStatus
    ? books.filter((book) => book.trangThai === filterStatus)
    : books;

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.bookName) newErrors.bookName = "Tên sách không được bỏ trống";
    if (!form.studentName)
      newErrors.studentName = "Tên người mượn không được bỏ trống";
    if (!form.borrowDate)
      newErrors.borrowDate = "Ngày mượn không được bỏ trống";
    if (!form.returnDate) newErrors.returnDate = "Ngày trả không được bỏ trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(
        addEntry({ id: Date.now().toString(), ...form, trangThai: "Đang mượn" })
      );
      setForm({
        bookName: "",
        studentName: "",
        borrowDate: "",
        returnDate: "",
      });
      document.getElementById("closeModalButton").click();
    }
  };

  const handleStatusChange = (index, value) => {
    const updatedBook = { ...filteredBooks[index], trangThai: value };
    dispatch(updateEntry(updatedBook));
  };

  const handleDelete = (id) => {
    dispatch(removeEntry(id));
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between mb-3">
          <h3>Quản lý mượn trả sách</h3>
          <div className="d-flex gap-2">
            <div>
              <select
                name="filterStatus"
                id="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Tất cả</option>
                <option value="Đã trả">Đã trả</option>
                <option value="Chưa trả">Chưa trả</option>
              </select>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Thêm thông tin
              </button>
            </div>
          </div>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Sinh viên mượn</th>
              <th scope="col">Ngày mượn</th>
              <th scope="col">Ngày trả</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.tenSach}</td>
                <td>{book.sinhVienMuon}</td>
                <td>{book.ngayMuon}</td>
                <td>{book.ngayTra}</td>
                <td>
                  <select
                    value={book.trangThai}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="form-select"
                  >
                    <option value="Đang mượn">Đang mượn</option>
                    <option value="Đã trả">Đã trả</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(book.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thêm thông tin mượn sách
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Tên sách</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bookName"
                    value={form.bookName}
                    onChange={handleChange}
                  />
                  {errors.bookName && (
                    <div className="text-danger">{errors.bookName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên người mượn</label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentName"
                    value={form.studentName}
                    onChange={handleChange}
                  />
                  {errors.studentName && (
                    <div className="text-danger">{errors.studentName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày mượn</label>
                  <input
                    type="date"
                    className="form-control"
                    name="borrowDate"
                    value={form.borrowDate}
                    onChange={handleChange}
                  />
                  {errors.borrowDate && (
                    <div className="text-danger">{errors.borrowDate}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Ngày trả</label>
                  <input
                    type="date"
                    className="form-control"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={handleChange}
                  />
                  {errors.returnDate && (
                    <div className="text-danger">{errors.returnDate}</div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeModalButton"
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
