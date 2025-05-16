import Papa from 'papaparse';

export const loadCSV = async (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => resolve(results.data),
      error: reject,
    });
  });
};
