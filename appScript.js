function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'status': 'success', 'message': 'API đang hoạt động' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);  // Đợi tối đa 30 giây
  
  try {
    // Lấy dữ liệu từ form submission
    var data = e.parameter;
    if (!data) {
      throw new Error('Không có dữ liệu được gửi đến');
    }

    // Lấy tên sheet từ request, mặc định là 'De1'
    var sheetName = data.SheetName || 'De1';

    // Mở Google Sheet
    var ss = SpreadsheetApp.openById('14CR500iyUqBXDJS720u6sPyCHjIcihn17suTYfbE0L0');
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      // Tạo sheet mới nếu không tồn tại
      sheet = ss.insertSheet(sheetName);
      console.log('Đã tạo sheet mới:', sheetName);
    }

    // Định nghĩa cấu trúc dữ liệu theo script.js
    var headers = [
      'Timestamp',
      'FullName',
      'School',
      'StudentID',
      'StudentYear',
      'Email',
      'Major',
      'Phone',
      'Evaluation',
      'Score'
    ];

    // Thêm các câu hỏi vào headers
    for (var i = 1; i <= 20; i++) {
      headers.push('Q' + i);
    }

    // Kiểm tra và tạo headers nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length)
        .setValues([headers])
        .setBackground('#E8EAF6')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');
    }

    // Chuẩn bị dữ liệu để ghi
    var rowData = headers.map(function(header) {
      if (header.startsWith('Q')) {
        return data[header] || '';
      }
      switch (header) {
        case 'Timestamp':
          return data.Timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        case 'FullName':
          return data.FullName || '';
        case 'School':
          return data.School || '';
        case 'StudentID':
          return data.StudentID || '';
        case 'StudentYear':
          return data.StudentYear || '';
        case 'Email':
          return data.Email || '';
        case 'Major':
          return data.Major || '';
        case 'Phone':
          return data.Phone || '';
        case 'Evaluation':
          return data.Evaluation ? data.Evaluation.substring(0, 50000) : '';
        case 'Score':
          return data.Score || '0';
        default:
          return data[header] || '';
      }
    });

    // Ghi dữ liệu vào sheet
    sheet.appendRow(rowData);

    // Format lại sheet
    var lastRow = sheet.getLastRow();
    
    // Format timestamp
    sheet.getRange(lastRow, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    
    // Format score
    var scoreColumnIndex = headers.indexOf('Score') + 1;
    if (scoreColumnIndex > 0) {
      sheet.getRange(lastRow, scoreColumnIndex).setNumberFormat('0.00');
    }

    // Format toàn bộ hàng
    var row = sheet.getRange(lastRow, 1, 1, headers.length);
    row.setHorizontalAlignment('center');
    row.setBorder(true, true, true, true, true, true);

    // Màu nền xen kẽ cho dễ đọc
    if (lastRow % 2 === 0) {
      row.setBackground('#F5F5F5');
    }

    // Tự động điều chỉnh độ rộng cột
    sheet.autoResizeColumns(1, headers.length);

    // Trả về phản hồi thành công
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Dữ liệu đã được lưu vào sheet ' + sheetName,
        'row': lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log lỗi và trả về thông báo lỗi
    console.error('Lỗi:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Không thể lưu dữ liệu: ' + error.message,
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Giải phóng lock
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}