import { RotatingLines, Watch } from 'react-loader-spinner';
import './loadingSpinner.css';

export const LoadingSpinner = () => {
    return (

        <div className='loading__spinner'>
            <RotatingLines strokeColor="purple" animationDuration="1.5" />
        </div>



    )
};

export const WatchSpinner = () => {
    return (
            <Watch height="20"
                width="20"
                radius="48"
                color="purple"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClassName="watch__spinner"
                visible={true} />
    )
};
