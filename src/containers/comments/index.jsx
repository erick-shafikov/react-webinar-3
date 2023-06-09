import { memo, useCallback, useEffect, useMemo } from "react"
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
    switchActive: useCallback(id => dispatch(commentsActions.switchActiveField(id)), [])
  }

  console.log(location.state)

  useEffect(()=>{
    if(location.state?.from) {
      callbacks.switchActive(location.state?.from)
    };

    navigate(location.pathname, {})

  }, [])
  
  useInit(() => {
    dispatch(commentsActions.loadComments(id))
  }, [selectRedux.newComment, select.exists]);

  const comments = useMemo(() => treeToList(listToTree(selectRedux.comments), (item, level) => (
    {_id: item._id, level, text: item.text, author: item.author.profile.name, date: item.dateCreate}
  )), [selectRedux.comments, selectRedux.activeField])

  const renders = {
    item: useCallback(comment => (
      <CommentItem 
        comment={comment}
        current={selectRedux.activeField} 
        exists={select.exists} 
        switchActive={callbacks.switchActive} 
        active={selectRedux.activeField}
        addAnswer={callbacks.addNewComment}
        username={select.username}
      />
    ), [comments]),
  };
  return (
    <Spinner active={select.waiting}>
      <CommentsLayout count={comments.length}>
        <CommentsList list={comments} renderItem={renders.item}/>
        {selectRedux.activeField === 'new' 
        ? <NewComment 
            isSession={select.exists} 
            waiting={selectRedux.waiting} 
            addNewComment={callbacks.addNewComment}
            isFocus={selectRedux.activeField === 'new'}
          /> 
        : <div style={{height:'70px'}}></div>}
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments)