export const getChName = (id, arr, propName) => {
  const idx = arr.findIndex(x => x.id == id);
  return arr[idx][propName];
};

export const randomInt = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

export const notifications = {
  push: (state, data) => {
    if (state.findIndex(x => x.type === data.type) === -1) {
      state.push(data);
      const audio = new Audio('../../assets/notification.mp3');
      audio.load();
      audio.play();
    }
  },
  delete: (state, type) => {
    const index = state.findIndex(x => x.type === type);
    if (index !== -1) {
      state.splice(index, 1)
    }
  }
};
