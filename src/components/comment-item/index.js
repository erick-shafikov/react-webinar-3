import { memo, useEffect, useRef } from "react";
import CommentAnswer from "../comment-answer";
import dataParser from "../../utils/date-parser-ru";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'

function CommentItem({comment, active, switchActive, exists, addAnswer, username, current}){
  const cn = bem('Comment');

  const onClickHandler = () => {
    switchActive(comment._id)
  }

  return (
  <div className={cn('item')} style={{marginLeft: `${Math.min(comment.level, 4) * 30 }px`}}>
    <div className={comment.author === username ? "Comment-item-author matched" : "Comment-item-author"}>
      {comment.author}
    </div>
    <div className={cn('item-date')}>{dataParser(comment.date)}</div>
    <div className={cn('item-text')}>{comment.text}</div>
    <button className={cn('item-button')} onClick={onClickHandler}>Ответить</button>
    {active === comment._id && <CommentAnswer 
          isSession={exists} 
          id={comment._id} 
          addAnswer={addAnswer} 
          switchActive={switchActive}
          current={current}
        /> 
      }
  </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object,
  switchActive: PropTypes.func,
  addAnswer: PropTypes.func,
  username: PropTypes.string,
  active: PropTypes.string,
  exists: PropTypes.bool,
};

CommentItem.defaultProps = {
  isSession: false,
  addAnswer: () => {},
  switchActive: () => {}
}

export default memo(CommentItem);