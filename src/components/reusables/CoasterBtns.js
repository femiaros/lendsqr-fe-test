import useAuth from '../../hooks/useAuth';
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io';
import autoPageUp from '../../hooks/autoPageUp';

const CoasterBtns = () => {
  const{allUsersData,setPageUsersList} = useAuth();

  const usersPerPage = 10;
  //divided allUsers lenght by amount of users to be displayed per page
  const division = (allUsersData.length/usersPerPage);
  let pageCount = Math.floor(division);
  const pageBtnWidth = 30;
  //if division not integer increment page by (1) 
  Number.isInteger(division)? pageCount = pageCount : pageCount +=1; 
  let pageBtns;
  const pages = [];
    

  for(let pageNum = 1; pageNum<=pageCount; pageNum++){
      pages.push( pageNum===1 ? 
                    <div className="page current active" 
                      key={pageNum}
                      onClick={(e)=>handlePageListUpdate(e,pageNum)}
                      role='button' tabIndex='0' 
                      aria-label = {`page ${pageNum} button`}
                    >
                      <>{pageNum}</>
                    </div> :
                    <div className="page"
                      key={pageNum}
                      onClick={(e)=>handlePageListUpdate(e,pageNum)}
                      role='button' tabIndex='0' 
                      aria-label = {`page ${pageNum} button`}
                    >
                      <>{pageNum}</>
                    </div>
                )
    };



  // Hide & Show prevBTN / nextBtn at the end/start of list
  const hideShowArrows = (targetIndex,prevBtn,nextBtn)=>{
    if(targetIndex === 0){
        prevBtn.classList.add('hide-arrow');
        nextBtn.classList.remove('hide-arrow');
    }else if( targetIndex === (pageBtns.length - 6)){
        prevBtn.classList.remove('hide-arrow');
        nextBtn.classList.add('hide-arrow');
    }else{
        prevBtn.classList.remove('hide-arrow');
        nextBtn.classList.remove('hide-arrow');
    }
  }

  //slide to pageBtns 
  const slideBtns = (coasterBtnsWrapper,currentPageBtn,targetPageBrn,leftMove)=>{
    coasterBtnsWrapper.style.transform = `translateX(-${leftMove}px)`;
    currentPageBtn.classList.remove('current');
    targetPageBrn.classList.add('current');
  }

  const handleNext = (e)=>{
    const nextBtn = e.target.closest('.CoasterBtns__next');
    //target CoasterBtns component
    const coasterBtnsComponent = nextBtn.parentElement;
    const prevBtn = coasterBtnsComponent.querySelector('.CoasterBtns__prev');
    const coasterBtnsWrapper = coasterBtnsComponent.querySelector('.CoasterBtns__wrapper');
    pageBtns = [...coasterBtnsComponent.querySelector('.CoasterBtns__wrapper').children];
    const currentPageBtn  = coasterBtnsComponent.querySelector('.current');

    const nextPageBtn = currentPageBtn.nextElementSibling;

    const nextIndex = pageBtns.findIndex(page=> page === nextPageBtn);
   
    //amount of pixel to be moved by btn
    const leftMove = (pageBtnWidth * nextIndex);

    // move to the next page btn
    slideBtns(coasterBtnsWrapper,currentPageBtn,nextPageBtn,leftMove);

    //hide && show the arrow direction btns
    hideShowArrows(nextIndex,prevBtn,nextBtn);
    
  };

  const handlePrev = (e)=>{
    const prevBtn = e.target.closest('.CoasterBtns__prev');
    //target CoasterBtns component
    const coasterBtnsComponent = prevBtn.parentElement;
    const nextBtn = coasterBtnsComponent.querySelector('.CoasterBtns__next');
    const coasterBtnsWrapper = coasterBtnsComponent.querySelector('.CoasterBtns__wrapper');
    pageBtns = [...coasterBtnsComponent.querySelector('.CoasterBtns__wrapper').children];
    const currentPageBtn  = coasterBtnsComponent.querySelector('.current');
    const prevPageBtn = currentPageBtn.previousElementSibling;

    const prevIndex = pageBtns.findIndex(pageBtn=> pageBtn === prevPageBtn);

    //amount of pixel to be moved by btn
    const leftMove = (pageBtnWidth * prevIndex);

    // move to the next page btn
    slideBtns(coasterBtnsWrapper,currentPageBtn,prevPageBtn,leftMove);

    //hide && show the arrow direction btns
    hideShowArrows(prevIndex,prevBtn,nextBtn);  
  };

  const handlePageListUpdate = (e,pageNum)=>{
    //scroll page bck up
    autoPageUp();
    //target clicked button
    const pageBtn = e.target;
    const coasterBtnsWrapper = pageBtn.parentElement;
    const otherPageBtns = [...coasterBtnsWrapper.children].filter(btn => btn !== pageBtn);
    const lastUserIndex = pageNum * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;

    //update users page displayed list
    setPageUsersList(
        allUsersData.slice(firstUserIndex,lastUserIndex)
    )

    // add active(CLASS) to the clicked page button && remove from others
    pageBtn.classList.add('active');

    otherPageBtns.forEach(btn => {
      btn.classList.remove('active');
    });
  }

  return (
    <>
    {division >= 1 ?
        <div className='CoasterBtns'>

            <span 
              className='CoasterBtns__prev' 
              onClick={(e)=>handlePrev(e)}
              role='button' tabIndex='0' 
              aria-label='slide page buttons to the right'
            >
              <IoIosArrowBack/>
            </span>

            <div className="CoasterBtns__rail">
              <div className="CoasterBtns__wrapper">
                
                {pages}
                
              </div>

            </div>

            <span 
              className='CoasterBtns__next' 
              onClick={(e)=>handleNext(e)}
              role='button' tabIndex='0' 
              aria-label='slide page buttons to the left'
            >
              <IoIosArrowForward/>
            </span>

        </div>
        :<></>
      }  
    </>    
  )
}

export default CoasterBtns