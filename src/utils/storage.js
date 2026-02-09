export const saveBoard = (data) => {
  localStorage.setItem("tasks", JSON.stringify(data));
};

export const loadBoard = () => {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || {
      todo: [],
      inprogress: [],
      done: []
    };
  } catch {
    return {
      todo: [],
      inprogress: [],
      done: []
    };
  }
};
