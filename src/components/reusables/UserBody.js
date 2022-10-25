
const UserBody = ({user}) => {

  return (
    <div className='UserBody'>
        <div className="UserBody__container">
            <div id='box1' 
                className="UserBody__detail-Box general open"
            >
                <div className="UserBody__detail-Box__field personal">
                    <h4 className='field-title'>Personal Information</h4>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">Full name</span>
                            <span className="field-content__item__value">{`${user.profile.firstName} ${user.profile.lastName}`}</span>
                        </div>

                        <div className="field-content__item">
                            <span className="field-content__item__title">marital status</span>
                            <span className="field-content__item__value">not stated</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">phone number</span>
                            <span className="field-content__item__value"><>{user.phoneNumber.split('x')[0]}</></span>
                        </div>

                        <div className="field-content__item">
                            <span className="field-content__item__title">children</span>
                            <span className="field-content__item__value">none</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">email address</span>
                            <span className="field-content__item__value email">{user.email}</span>
                        </div>

                        <div className="field-content__item">
                            <span className="field-content__item__title">type of residence</span>
                            <span className="field-content__item__value">parent's apartment</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">bvn</span>
                            <span className="field-content__item__value">{user.profile.bvn}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">gender</span>
                            <span className="field-content__item__value">{user.profile.gender}</span>
                        </div>
                    </div>

                </div>

                <div className="UserBody__detail-Box__field education">
                    <h4 className='field-title'>Education and Employment</h4>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">level of education</span>
                            <span className="field-content__item__value">{user.education.level}</span>
                        </div>

                        <div className="field-content__item">
                            <span className="field-content__item__title">office email</span>
                            <span className="field-content__item__value">{user.education.officeEmail}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">employment status</span>
                            <span className="field-content__item__value">{user.education.employmentStatus}</span>
                        </div>

                        <div className="field-content__item">
                            <span className="field-content__item__title">monthly income</span>
                            <span className="field-content__item__value">{`N${user.education.monthlyIncome[0]}-N${user.education.monthlyIncome[1]}`}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">sector of employment</span>
                            <span className="field-content__item__value">{user.education.sector}</span>
                        </div>

                        <div className="field-content__item">
                            <span className="field-content__item__title">loan repayment</span>
                            <span className="field-content__item__value">{`N${user.education.loanRepayment}`}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">duration of employment</span>
                            <span className="field-content__item__value">{user.education.duration}</span>
                        </div>
                    </div>

                </div>

                <div className="UserBody__detail-Box__field socials">
                    <h4 className='field-title'>Socials</h4>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">twitter</span>
                            <span className="field-content__item__value">{user.socials.twitter}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">facebook</span>
                            <span className="field-content__item__value">{user.socials.facebook}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">instagram</span>
                            <span className="field-content__item__value">{user.socials.instagram}</span>
                        </div>
                    </div>

                </div>

                <div className="UserBody__detail-Box__field guarantor">
                    <h4 className='field-title'>Guarantor</h4>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">full name</span>
                            <span className="field-content__item__value">{`${user.guarantor.firstName} ${user.guarantor.lastName}`}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">phone number</span>
                            <span className="field-content__item__value">{user.guarantor.phoneNumber.split('x')[0]}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">email address</span>
                            <span className="field-content__item__value email">{`${user.guarantor.firstName}@gmail.com`}</span>
                        </div>
                    </div>

                    <div className="field-content">
                        <div className="field-content__item">
                            <span className="field-content__item__title">relationship</span>
                            <span className="field-content__item__value">
                                {
                                    user.guarantor.gender === 'Male' ? 'brother':'sister'
                                }
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <div id='box2' className="UserBody__detail-Box">
                <center>Documents</center>
            </div>

            <div id='box3' className="UserBody__detail-Box">
                <center>Bank Details</center>
            </div>

            <div id='box4' className="UserBody__detail-Box">
                <center>Loans</center>
            </div>
            
            <div id='box5' className="UserBody__detail-Box">
                <center>Savings</center>
            </div>
            <div id='box6' className="UserBody__detail-Box">
                <center>App and System</center>
            </div>
        </div>
    </div>
  )
}

export default UserBody