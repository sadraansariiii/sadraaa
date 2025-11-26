// lib/decodeUnicode.js

export function decodeUnicode(str) {
  if (!str) return '';

  const fixed = str.replace(/u([0-9a-fA-F]{4})/g, '\\u$1');

  try {
    return decodeURIComponent(JSON.parse(`"${fixed}"`));
  } catch {
    return str;
  }
}

export function decodeUnicodeDeep(data) {
  if (typeof data === 'string') return decodeUnicode(data);
  if (Array.isArray(data)) return data.map(decodeUnicodeDeep);

  if (typeof data === 'object' && data !== null) {
    const result = {};
    for (const key in data) {
      result[key] = decodeUnicodeDeep(data[key]);
    }
    return result;
  }

  return data;
}

/* -------------------------
   📌 ساده‌ترین روش استفاده:

   1) دیکد کردن یک متن:
      decodeUnicode("u0627u062eux0628u0627u0631")

   2) دیکد کردن خروجی API:
      const clean = decodeUnicodeDeep(response.data)
--------------------------- */
