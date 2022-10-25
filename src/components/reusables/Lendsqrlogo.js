import lendsqr_icon from '../../svgs/lendsqr_icon.svg';
import lendsqr_name from '../../svgs/lendsqr_name.svg';

const Lendsqr_logo = () => {
  return (
    <div className="Lendsqr-logo">
        <span className='Lendsqr-logo__icon'>
            <img src={lendsqr_icon} alt="icon" />
        </span>
        <span className='Lendsqr-logo__name'>
            <img src={lendsqr_name} alt="name" />
        </span>
    </div>
  )
}

export default Lendsqr_logo;