import { memo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import CommentTextArea from "../comment-text-area"
import PropTypes from 'prop-types';
import './style.css'
import {cn as bem} from '@bem-react/classname';


function CommentAnswer({isSession, addAnswer, id, switchActive, current}){
  const cn = bem('Answer');

  const [text, setText] = useState('');
  const location = useLocation()

  const onChangeHandler = (e) =>{
    const value = e.target.value;
    setText(value);
  };

  const onSubmitHandler = () =>{
    const str = text.trim();

    if(str !== '') addAnswer(str, id, 'comment');

    setText('');
  };

  const declineHandler = () =>{
    switchActive('new')
  }

  return (
    <div className={cn('container')}>
    {isSession 
      ? <>
          <h3 className={cn('header')}>Новый ответ</h3>
          <CommentTextArea text={text} onChangeHandler={onChangeHandler} isFocus={id === current}/>
          <button className={cn('button')} onClick={onSubmitHandler}>Отправить</button>
          <button onClick={declineHandler}>Отмена</button>
        </> 
      : <div className={cn('link')}>
          <Link to='/login' state={{back: location.pathname, from: id}}>Войдите</Link> чтобы иметь возможность комментировать
          &nbsp;<button className={cn('decline')} onClick={declineHandler}>Отмена</button>
        </div>}
    </div>
  )   
}

CommentAnswer.propTypes = {
  isSession: PropTypes.bool,
  addAnswer: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  switchActive: PropTypes.func
};

CommentAnswer.defaultProps = {
  isSession: false,
  addAnswer: () => {},
  switchActive: () => {}
}

export default memo(CommentAnswer)