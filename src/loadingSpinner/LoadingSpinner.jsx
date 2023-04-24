import { RotatingLines } from 'react-loader-spinner';
import './loadingSpinner.css';

const LoadingSpinner = () => {
    return (
        
            <div className='loading__spinner'>
                <RotatingLines strokeColor="purple" animationDuration="1.5" />
            </div>
      


    )
};
export default LoadingSpinner;