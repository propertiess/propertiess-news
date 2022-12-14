import { FC, useEffect } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useHistory } from 'react-router-dom';
import { CommentList, Loader } from '@/components';
import { useDate } from '@/hooks/useDate';
import { useActions } from '@/store/hooks/useActions';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import styles from './PostView.module.scss';

interface Props {
  id: string;
}

const PostView: FC<Props> = ({ id }) => {
  const { post, loading } = useAppSelector(state => state.post);
  const date = useDate(post?.time);
  const { fetchPost } = useActions();
  const history = useHistory();

  useEffect(() => {
    fetchPost(+id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrap} data-testid='post-view'>
      <div>
        <ArrowUturnLeftIcon
          className={styles.back}
          onClick={() => history.push('/')}
        />
      </div>
      <p className={styles.date} data-testid='date'>
        {date?.time} {date?.date}
      </p>
      <h2>{post?.title}</h2>
      <p>Created by {post?.by}</p>
      <div>
        <a href={post?.url}>Reference to the source</a>
      </div>
      <CommentList kids={post?.kids} count={post?.descendants!} />
      {!post?.descendants && <p>0 commentaries</p>}
    </div>
  );
};

export { PostView };
