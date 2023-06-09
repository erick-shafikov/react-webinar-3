// Начальное состояние

export const getCommentForm = (_id)=> ({
  _id: `temp_id`, 
  text: 'NEW_COMMENT', 
  parent : {_id: _id, _type: 'comment',},
  _type: 'answer',
  dateCreate: '2023-06-09T16:34:57.361Z'
})
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
      if(!!action.payload.from && action.payload.from !== 'new') return { ...state, commentsList: [...action.payload.data, getCommentForm(action.payload.from)], waiting: false};
      return { ...state, commentsList: [...action.payload.data], waiting: false};

    case "comments/load-error":
      return { ...state, commentsList: {}, waiting: false};

    case "comments/add-success":
      return {...state, waiting: false, newComment: action.payload.data, activeField: 'new'};

    case "comments/add-start":
      return {...state, waiting: true};
      
    case "comments/switch-active":
      return {...state, activeField: action.payload, waiting: false};
      
    case "comments/open-form":
      return {...state, commentsList: [...state.commentsList, getCommentForm(action.payload)], waiting: false};

    case "comments/close-form":
      return {...state, commentsList: [...state.commentsList.filter(item => item._id !== `temp_id`)], waiting: false}

    default:
      return state;
  }
}

export default reducer;