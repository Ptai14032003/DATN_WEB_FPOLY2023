import {
  require_interopRequireDefault
} from "./chunk-F42DTJC5.js";
import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/rc-pagination/lib/locale/vi_VN.js
var require_vi_VN = __commonJS({
  "node_modules/rc-pagination/lib/locale/vi_VN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = exports.default = {
      // Options.jsx
      items_per_page: "/ trang",
      jump_to: "Đến",
      jump_to_confirm: "xác nhận",
      page: "Trang",
      // Pagination.jsx
      prev_page: "Trang Trước",
      next_page: "Trang Kế",
      prev_5: "Về 5 Trang Trước",
      next_5: "Đến 5 Trang Kế",
      prev_3: "Về 3 Trang Trước",
      next_3: "Đến 3 Trang Kế",
      page_size: "kích thước trang"
    };
  }
});

// node_modules/rc-picker/lib/locale/vi_VN.js
var require_vi_VN2 = __commonJS({
  "node_modules/rc-picker/lib/locale/vi_VN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var locale = {
      locale: "vi_VN",
      today: "Hôm nay",
      now: "Bây giờ",
      backToToday: "Trở về hôm nay",
      ok: "OK",
      clear: "Xóa",
      month: "Tháng",
      year: "Năm",
      timeSelect: "Chọn thời gian",
      dateSelect: "Chọn ngày",
      weekSelect: "Chọn tuần",
      monthSelect: "Chọn tháng",
      yearSelect: "Chọn năm",
      decadeSelect: "Chọn thập kỷ",
      yearFormat: "YYYY",
      dateFormat: "D/M/YYYY",
      dayFormat: "D",
      dateTimeFormat: "D/M/YYYY HH:mm:ss",
      monthBeforeYear: true,
      previousMonth: "Tháng trước (PageUp)",
      nextMonth: "Tháng sau (PageDown)",
      previousYear: "Năm trước (Control + left)",
      nextYear: "Năm sau (Control + right)",
      previousDecade: "Thập kỷ trước",
      nextDecade: "Thập kỷ sau",
      previousCentury: "Thế kỷ trước",
      nextCentury: "Thế kỷ sau"
    };
    var _default = exports.default = locale;
  }
});

// node_modules/antd/lib/time-picker/locale/vi_VN.js
var require_vi_VN3 = __commonJS({
  "node_modules/antd/lib/time-picker/locale/vi_VN.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var locale = {
      placeholder: "Chọn thời gian",
      rangePlaceholder: ["Bắt đầu", "Kết thúc"]
    };
    var _default = exports.default = locale;
  }
});

// node_modules/antd/lib/date-picker/locale/vi_VN.js
var require_vi_VN4 = __commonJS({
  "node_modules/antd/lib/date-picker/locale/vi_VN.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _vi_VN = _interopRequireDefault(require_vi_VN2());
    var _vi_VN2 = _interopRequireDefault(require_vi_VN3());
    var locale = {
      lang: Object.assign({
        placeholder: "Chọn thời điểm",
        yearPlaceholder: "Chọn năm",
        quarterPlaceholder: "Chọn quý",
        monthPlaceholder: "Chọn tháng",
        weekPlaceholder: "Chọn tuần",
        rangePlaceholder: ["Ngày bắt đầu", "Ngày kết thúc"],
        rangeYearPlaceholder: ["Năm bắt đầu", "Năm kết thúc"],
        rangeQuarterPlaceholder: ["Quý bắt đầu", "Quý kết thúc"],
        rangeMonthPlaceholder: ["Tháng bắt đầu", "Tháng kết thúc"],
        rangeWeekPlaceholder: ["Tuần bắt đầu", "Tuần kết thúc"]
      }, _vi_VN.default),
      timePickerLocale: Object.assign({}, _vi_VN2.default)
    };
    var _default = exports.default = locale;
  }
});

// node_modules/antd/lib/calendar/locale/vi_VN.js
var require_vi_VN5 = __commonJS({
  "node_modules/antd/lib/calendar/locale/vi_VN.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _vi_VN = _interopRequireDefault(require_vi_VN4());
    var _default = exports.default = _vi_VN.default;
  }
});

// node_modules/antd/lib/locale/vi_VN.js
var require_vi_VN6 = __commonJS({
  "node_modules/antd/lib/locale/vi_VN.js"(exports) {
    var _interopRequireDefault = require_interopRequireDefault().default;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _vi_VN = _interopRequireDefault(require_vi_VN());
    var _vi_VN2 = _interopRequireDefault(require_vi_VN5());
    var _vi_VN3 = _interopRequireDefault(require_vi_VN4());
    var _vi_VN4 = _interopRequireDefault(require_vi_VN3());
    var typeTemplate = "${label} không phải kiểu ${type} hợp lệ";
    var localeValues = {
      locale: "vi",
      Pagination: _vi_VN.default,
      DatePicker: _vi_VN3.default,
      TimePicker: _vi_VN4.default,
      Calendar: _vi_VN2.default,
      global: {
        placeholder: "Vui lòng chọn"
      },
      Table: {
        filterTitle: "Bộ lọc",
        filterConfirm: "Đồng ý",
        filterReset: "Bỏ lọc",
        filterEmptyText: "Không có bộ lọc",
        filterCheckall: "Chọn tất cả",
        filterSearchPlaceholder: "Tìm kiếm bộ lọc",
        emptyText: "Trống",
        selectAll: "Chọn tất cả",
        selectInvert: "Chọn ngược lại",
        selectNone: "Bỏ chọn tất cả",
        selectionAll: "Chọn tất cả",
        sortTitle: "Sắp xếp",
        expand: "Mở rộng dòng",
        collapse: "Thu gọn dòng",
        triggerDesc: "Nhấp để sắp xếp giảm dần",
        triggerAsc: "Nhấp để sắp xếp tăng dần",
        cancelSort: "Nhấp để hủy sắp xếp"
      },
      Tour: {
        Next: "Tiếp",
        Previous: "Trước",
        Finish: "Hoàn thành"
      },
      Modal: {
        okText: "Đồng ý",
        cancelText: "Hủy",
        justOkText: "OK"
      },
      Popconfirm: {
        okText: "Đồng ý",
        cancelText: "Hủy"
      },
      Transfer: {
        titles: ["", ""],
        searchPlaceholder: "Tìm ở đây",
        itemUnit: "mục",
        itemsUnit: "mục",
        remove: "Gỡ bỏ",
        selectCurrent: "Chọn trang hiện tại",
        removeCurrent: "Gỡ bỏ trang hiện tại",
        selectAll: "Chọn tất cả",
        removeAll: "Gỡ bỏ tất cả",
        selectInvert: "Đảo ngược trang hiện tại"
      },
      Upload: {
        uploading: "Đang tải lên...",
        removeFile: "Gỡ bỏ tập tin",
        uploadError: "Lỗi tải lên",
        previewFile: "Xem trước tập tin",
        downloadFile: "Tải tập tin"
      },
      Empty: {
        description: "Trống"
      },
      Icon: {
        icon: "icon"
      },
      Text: {
        edit: "Chỉnh sửa",
        copy: "Sao chép",
        copied: "Đã sao chép",
        expand: "Mở rộng"
      },
      PageHeader: {
        back: "Quay lại"
      },
      Form: {
        optional: "(Tùy chọn)",
        defaultValidateMessages: {
          default: "${label} không đáp ứng điều kiện quy định",
          required: "Hãy nhập thông tin cho trường ${label}",
          enum: "${label} phải có giá trị nằm trong tập [${enum}]",
          whitespace: "${label} không được chứa khoảng trắng",
          date: {
            format: "${label} sai định dạng ngày tháng",
            parse: "Không thể chuyển ${label} sang kiểu Ngày tháng",
            invalid: "${label} không phải giá trị Ngày tháng hợp lệ"
          },
          types: {
            string: typeTemplate,
            method: typeTemplate,
            array: typeTemplate,
            object: typeTemplate,
            number: typeTemplate,
            date: typeTemplate,
            boolean: typeTemplate,
            integer: typeTemplate,
            float: typeTemplate,
            regexp: typeTemplate,
            email: typeTemplate,
            url: typeTemplate,
            hex: typeTemplate
          },
          string: {
            len: "${label} phải dài đúng ${len} ký tự",
            min: "Độ dài tối thiểu trường ${label} là ${min} ký tự",
            max: "Độ dài tối đa trường ${label} là ${max} ký tự",
            range: "Độ dài trường ${label} phải từ ${min} đến ${max} ký tự"
          },
          number: {
            len: "${label} phải bằng ${len}",
            min: "${label} phải lớn hơn hoặc bằng ${min}",
            max: "${label} phải nhỏ hơn hoặc bằng ${max}",
            range: "${label} phải nằm trong khoảng ${min}-${max}"
          },
          array: {
            len: "Mảng ${label} phải có ${len} phần tử ",
            min: "Mảng ${label} phải chứa tối thiểu ${min} phần tử ",
            max: "Mảng ${label} phải chứa tối đa ${max} phần tử ",
            range: "Mảng ${label} phải chứa từ ${min}-${max} phần tử"
          },
          pattern: {
            mismatch: "${label} không thỏa mãn mẫu kiểm tra ${pattern}"
          }
        }
      },
      Image: {
        preview: "Xem trước"
      },
      QRCode: {
        expired: "Mã QR hết hạn",
        refresh: "Làm mới"
      }
    };
    var _default = exports.default = localeValues;
  }
});
export default require_vi_VN6();
//# sourceMappingURL=antd_lib_locale_vi_VN.js.map
