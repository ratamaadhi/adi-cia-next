/**
 * Google Apps Script for the Sena RSVP sheet (bound or standalone).
 * Configure RSVP_SECRET in Project Settings > Script properties, then deploy
 * as a Web app, execute as yourself, with access for Anyone.
 */
var SPREADSHEET_ID = '181TtiXTsKaDrSMkMetMQV9L27qZIEQ5iLmat26PBVqE';
var TAB_NAME = 'RSVP Sena';
var HEADERS = ['ID', 'Waktu pengisian (WIB)', 'Nama / Keluarga', 'Kehadiran', 'Dewasa', 'Anak', 'Total tamu', 'Pesan untuk Sena'];

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  // Guest text is always literal text, including values starting with formulas.
  var text = String(value || '');
  return /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
}

function setupRsvpSheet() {
  var book = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = book.getSheetByName(TAB_NAME) || book.insertSheet(TAB_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setBackground('#ffd22e').setFontColor('#222222').setFontWeight('bold');
    sheet.setColumnWidth(1, 280);
    sheet.setColumnWidth(2, 170);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(8, 350);
    sheet.getRange('H:H').setWrap(true);
  }
  var currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (JSON.stringify(currentHeaders) !== JSON.stringify(HEADERS)) throw new Error('Header tab RSVP Sena berbeda. Gunakan tab kosong atau pulihkan header yang diharapkan.');
  return sheet;
}

function doPost(e) {
  var lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 8192) return jsonResponse({ ok: false });
    var payload = JSON.parse(e.postData.contents);
    var expectedSecret = PropertiesService.getScriptProperties().getProperty('RSVP_SECRET');
    if (!expectedSecret || payload.secret !== expectedSecret) return jsonResponse({ ok: false });
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.id || '')) return jsonResponse({ ok: false });
    if (payload.event !== 'sena-first-birthday-2026' || typeof payload.name !== 'string' || !payload.name.trim() || payload.name.length > 120) return jsonResponse({ ok: false });
    if (['yes', 'no'].indexOf(payload.attendance) === -1 || typeof payload.message !== 'string' || payload.message.length > 500) return jsonResponse({ ok: false });
    if (!Number.isInteger(payload.adults) || !Number.isInteger(payload.children)) return jsonResponse({ ok: false });
    if (payload.attendance === 'yes' && (payload.adults < 1 || payload.adults > 10 || payload.children < 0 || payload.children > 10)) return jsonResponse({ ok: false });
    if (payload.attendance === 'no' && (payload.adults !== 0 || payload.children !== 0)) return jsonResponse({ ok: false });
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return jsonResponse({ ok: false, code: 'busy' });
    var sheet = setupRsvpSheet();
    var row = [payload.id, Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'), safeCell(payload.name.trim()), payload.attendance === 'yes' ? 'Hadir' : 'Tidak hadir', payload.adults, payload.children, payload.adults + payload.children, safeCell(payload.message.trim())];
    if (sheet.getLastRow() > 1) {
      var match = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(payload.id).matchEntireCell(true).findNext();
      if (match) {
        var existing = sheet.getRange(match.getRow(), 1, 1, HEADERS.length).getValues()[0];
        var same = [2, 3, 4, 5, 6, 7].every(function (index) {
          var expected = row[index];
          // Sheets strips a leading apostrophe used to force a literal cell.
          if (typeof expected === 'string' && expected.charAt(0) === "'") expected = expected.slice(1);
          return String(existing[index]) === String(expected);
        });
        return jsonResponse(same ? { ok: true, id: payload.id } : { ok: false, code: 'conflict' });
      }
    }
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, id: payload.id });
  } catch (error) {
    return jsonResponse({ ok: false, code: 'storage_error' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
