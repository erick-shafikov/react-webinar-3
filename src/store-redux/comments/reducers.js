// Начальное состояние
const initialState = {
  commentsList: [],
  waiting: false, // признак ожидания загрузки
  newComment: {},
  activeField: 'new'
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: {}, waiting: true};

    case "comments/load-success":
      return { ...state, commentsList: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, commentsList: {}, waiting: false};

    case "comments/add-success":
      return {...state, waiting: false, newComment: action.payload.data, activeField: 'new'};

    case "comments/add-start":
      return {...state, waiting: true};
      
    case "comments/switch-active":
      return {...state, activeField: action.payload, waiting: false}

    default:
      return state;
  }
}

export default reducer;