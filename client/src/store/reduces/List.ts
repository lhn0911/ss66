
interface BookBorrowing {
    id: string;
    tenSach: string;
    sinhVienMuon: string;
    ngayMuon: string;
    ngayTra: string;
    trangThai: string;
}

const initialState: BookBorrowing[] = [
    {
        id: "1",
        tenSach: "Harry Potter và Hòn Đá Phù Thủy",
        sinhVienMuon: "Nguyen Van A",
        ngayMuon: "2024-04-10",
        ngayTra: "2024-04-17",
        trangThai: "Đã trả"
    },
    {
        id: "2",
        tenSach: "Đắc Nhân Tâm",
        sinhVienMuon: "Tran Thi B",
        ngayMuon: "2024-04-05",
        ngayTra: "2024-04-12",
        trangThai: "Chưa trả"
    },
    {
        id: "3",
        tenSach: "1984",
        sinhVienMuon: "Le Van C",
        ngayMuon: "2024-04-02",
        ngayTra: "2024-04-09",
        trangThai: "Đã trả"
    },
    {
        id: "4",
        tenSach: "Tiền không mua được hạnh phúc",
        sinhVienMuon: "Pham Thi D",
        ngayMuon: "2024-03-20",
        ngayTra: "2024-03-27",
        trangThai: "Chưa trả"
    },
    {
        id: "5",
        tenSach: "Người Mẹ Tốt Hơn Là Người Thầy Tốt",
        sinhVienMuon: "Vo Van E",
        ngayMuon: "2024-03-15",
        ngayTra: "2024-03-22",
        trangThai: "Đã trả"
    },
    {
        id: "6",
        tenSach: "Nghìn Lẻ Một Đêm",
        sinhVienMuon: "Tran Van F",
        ngayMuon: "2024-03-10",
        ngayTra: "2024-03-17",
        trangThai: "Chưa trả"
    },
    {
        id: "7",
        tenSach: "Bắt Trẻ Đồng Xanh",
        sinhVienMuon: "Phan Thi G",
        ngayMuon: "2024-03-05",
        ngayTra: "2024-03-12",
        trangThai: "Chưa trả"
    },
    {
        id: "8",
        tenSach: "Cô Bé Mất Tích",
        sinhVienMuon: "Ly Thi H",
        ngayMuon: "2024-03-01",
        ngayTra: "2024-03-08",
        trangThai: "Đã trả"
    },
    {
        id: "9",
        tenSach: "Bí Mật Của Trí Nhớ Siêu Phàm",
        sinhVienMuon: "Tran Thi K",
        ngayMuon: "2024-02-25",
        ngayTra: "2024-03-03",
        trangThai: "Chưa trả"
    },
    {
        id: "10",
        tenSach: "Chuyến Tàu Định Mệnh",
        sinhVienMuon: "Le Van L",
        ngayMuon: "2024-02-15",
        ngayTra: "2024-02-22",
        trangThai: "Đã trả"
    }
];

const ADD_ENTRY = "ADD_ENTRY";
const REMOVE_ENTRY = "REMOVE_ENTRY";
const UPDATE_ENTRY = "UPDATE_ENTRY";

interface AddEntryAction {
    type: typeof ADD_ENTRY;
    payload: BookBorrowing;
}

interface RemoveEntryAction {
    type: typeof REMOVE_ENTRY;
    payload: { id: string };
}

interface UpdateEntryAction {
    type: typeof UPDATE_ENTRY;
    payload: BookBorrowing;
}

type BookBorrowingActionTypes = AddEntryAction | RemoveEntryAction | UpdateEntryAction;

const bookBorrowingReducer = (state = initialState, action: BookBorrowingActionTypes): BookBorrowing[] => {
    switch (action.type) {
        case ADD_ENTRY:
            return [...state, action.payload];
        case REMOVE_ENTRY:
            return state.filter(entry => entry.id !== action.payload.id);
        case UPDATE_ENTRY:
            return state.map(entry => entry.id === action.payload.id ? action.payload : entry);
        default:
            return state;
    }
};

export const addEntry = (entry: BookBorrowing): AddEntryAction => ({
    type: ADD_ENTRY,
    payload: entry
});

export const removeEntry = (id: string): RemoveEntryAction => ({
    type: REMOVE_ENTRY,
    payload: { id }
});

export const updateEntry = (entry: BookBorrowing): UpdateEntryAction => ({
    type: UPDATE_ENTRY,
    payload: entry
});

export default bookBorrowingReducer;
