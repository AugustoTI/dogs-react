import React from 'react';
import styles from './photoComments.module.css';
import { Context } from '../../../contexts/glovalProvider/context';

import { PhotoCommentsForm } from '../photoCommentsForm/PhotoCommentsForm';

export const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const { login } = React.useContext(Context);
  const commentSection = React.useRef();

  React.useEffect(() => {
    commentSection.current.scrollTop = commentSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};
