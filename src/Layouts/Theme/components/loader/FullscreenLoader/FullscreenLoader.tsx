
import MainLoader from '../MainLoader/MainLoader';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import styles from './FullscreenLoader.module.scss';

type Props = unknown

const FullscreenLoader: React.FC<Props> = () => {
  const isLoading = useAppSelector((state) => state.loader.isLoading);

  if (isLoading) return null;

  return (
    <div className={styles.loader}>
      <MainLoader isVerticallyCentered />
    </div>
  );
};

export default FullscreenLoader;
