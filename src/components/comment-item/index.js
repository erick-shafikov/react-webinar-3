import { memo, useEffect, useRef } from "react";
import CommentAnswer from "../comment-answer";
import dataParser from "../../utils/date-parser-ru";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'

function CommentItem({comment, switchActive, exists, addNewComment, openAnswerField, username, cancelAnswer}){
  const cn = bem('Comment');

  const onClickHandler = () => {
    cancelAnswer() //сброс предыдущего
    openAnswerField(comment._id)
    switchActive(comment._id) //выключить поле нового комментария
  }

  return (
  comment.type === 'comment' 
  ? <div className={cn('item')} style={{marginLeft: `${Math.min(comment.level, 4) * 30 }px`}}>
      <div className={comment.author === username ? "Comment-item-author matched" : "Comment-item-author"}>
        {comment.author}
      </div>
      <div className={cn('item-date')}>{dataParser(comment.date)}</div>
      <div className={cn('item-text')}>{comment.text}</div>
      <button className={cn('item-button')} onClick={onClickHandler}>Ответить</button>
    </div>
  : <div className={cn('item')} style={{marginLeft: `${Math.min(comment.level, 4) * 30 }px`}}>
      <CommentAnswer
        isSession={exists} //для получения сессии
        parentId={comment.parent._id} //для получения id
        addNewComment={addNewComment} //cb для добавления
        switchActive={switchActive} //cb для активной зоны
        cancelAnswer={cancelAnswer}
    />
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  switchActive: PropTypes.func,
  addNewComment: PropTypes.func,
  openAnswerField: PropTypes.func,
  username: PropTypes.string,
  active: PropTypes.string,
  exists: PropTypes.bool,
  cancelAnswer: PropTypes.func,
};

CommentItem.defaultProps = {
  isSession: false,
  addAnswer: () => {},
  switchActive: () => {}
}

export default memo(CommentItem);