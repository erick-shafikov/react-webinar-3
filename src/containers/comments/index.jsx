import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector as reduxSelector} from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';
import commentsActions from "../../store-redux/comments/action"

import CommentsLayout from "../../components/comments-layout";
import Spinner from '../../components/spinner'
import CommentItem from '../../components/comment-item';
import CommentsList from '../../components/comments-list';
import NewComment from '../../components/comment-new';

import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Comments(){

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  
  const selectRedux = reduxSelector(state =>({
    comments: state.comments.commentsList,
    waiting: state.comments.waiting,
    newComment: state.comments.newComment,
    activeField: state.comments.activeField
  }));
  
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    username: state.session.user.profile?.name
  }));
  
  const callbacks = {
    addNewComment: useCallback((text, id, type) => dispatch(commentsActions.sendComment(text, id, type)), []),
    switchActive: useCallback(id => dispatch(commentsActions.switchActiveField(id)), []),
    addAnswer: useCallback(parentID => dispatch(commentsActions.addAnswer(parentID))),
    cancelAnswer: useCallback(() => dispatch(commentsActions.cancelAnswer()))
  }

  const [waiting, setWaiting] = useState(select.waiting || selectRedux.waiting);
  const [isNewInFocus, setIsNewInFocus] = useState(false);

  useEffect(() => {
    setWaiting(selectRedux.waiting || selectRedux.waiting)
  }, [select.waiting, selectRedux.waiting]);


  useEffect(() => {
    setIsNewInFocus(location.state?.from === 'new')
    navigate(location.pathname, {})
  }, [selectRedux.waiting])
  
  useInit(() => {
    dispatch(commentsActions.loadComments(id, location.state?.from))
  }, [selectRedux.newComment, select.exists]);


  const comments = useMemo(() => treeToList(listToTree(selectRedux.comments), (item, level) => ({
    _id: item._id, 
    level, 
    text: item.text, 
    author: item.author?.profile.name, 
    date: item.dateCreate, 
    type: item._type,
    parent: item.parent
    }
  )), [selectRedux.comments, selectRedux.activeField]);

  const renders = {
    item: useCallback(comment => (
      <CommentItem 
        comment={comment} //контент комментария
        switchActive={callbacks.switchActive} //переключатель для активного поля (вынести из redux-store в state)
        addNewComment={callbacks.addNewComment} //добавить новый комментарий
        openAnswerField={callbacks.addAnswer} //открыть контейнер c полем ввода
        cancelAnswer={callbacks.cancelAnswer} //убрать контейнер с полем ввода
        username={select.username} // имя пользователя из сессии (для выделения серым цветом)
        exists={select.exists} //статус авторизации, если есть - поле ввода тексте, если нет - ссылка на регистрацию
      />
    ), [comments, selectRedux.activeField]),
  };

  return (
    <Spinner active={waiting}>
      <CommentsLayout count={selectRedux.activeField === 'new'? comments.length : comments.length-1}>
        <CommentsList list={comments} renderItem={renders.item}/>
        {selectRedux.activeField === 'new' 
        ? <NewComment 
            isSession={select.exists} 
            waiting={selectRedux.waiting} 
            addNewComment={callbacks.addNewComment}
            isFocus={isNewInFocus}
          /> 
        : <div style={{height:'70px'}}></div>}
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments)