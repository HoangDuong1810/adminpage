import React from 'react'
import 
{ BsListCheck, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'

function Home() {

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Trang chủ</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Bác sĩ</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>15</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Lịch hẹn</h3>
                    <BsListCheck className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Khách hàng</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1>
            </div>
        </div>
    </main>
  )
}

export default Home