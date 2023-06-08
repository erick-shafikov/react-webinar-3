import {memo} from "react";
import PropTypes from 'prop-types';

function CommentsList({list, renderItem}){
  return (
    <div>{
      list.map(item =>
        <div key={item._id}>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

CommentsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
};

CommentsList.defaultProps = {
  renderItem: (item) => {},
}

export default memo(CommentsList);
