const storage = localStorage;

export const setItem = (path, item) => {
  storage.setItem(path, JSON.stringify(item));
};

export const getItem = path => {
  try {
    return JSON.parse(storage.getItem(path));
  } catch (e) {
    return {};
  }
};

export const removeItem = storage.removeItem.bind(storage);
