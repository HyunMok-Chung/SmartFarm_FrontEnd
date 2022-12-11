import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
/* 아이콘 컬러 전체 변경 기능 */
import { IconContext } from 'react-icons';

const UserInfo = (props) => {
	const [isLogined, setisLogined] = useState(false);
	useEffect(() => {
		console.log(props.UserInfo, "this useeffect");
		if (props.UserInfo)
			setisLogined(true);
		else
			setisLogined(false);
	});

	return (
		<nav>
			{isLogined === false ? <li className='nav-text'>
				<Link to='/Login'>
					<BsIcons.BsPersonCircle />
					<span>Login</span>
				</Link>
			</li> : <div><li className='nav-text'>
					<Link to='/Logout'>
						<BsIcons.BsPersonCircle />
						<span>Logout</span>
					</Link>
				</li>
				<li className='nav-text'>
					<Link to='/Register'>
						<BsIcons.BsApple />
						<span>Register</span>
					</Link>
			</li></div>
			}

			{SidebarData.map((item, index) => {
				return (
					<div>
						<li key={index} className={item.cName}>
							<Link to={item.path}>
								{item.icon}
								<span>{item.title}</span>
							</Link>
						</li>
					</div>
				);
			})}
		</nav>
	);
}

function Navbar(props) {
	const [sidebar, setSidebar] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);
	return (
		<>
			{/* 아이콘 컬러 전체 변경 기능 */}
			<IconContext.Provider value={{ color: '#fff' }}>
				{/* 네비게이션 토글 코드*/}
				<div className="navbar">
					<Link to="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className="nav-menu-items" onClick={showSidebar}>
						<li className="navbar-toggle">
							<Link to="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{/* SidebarData를 순서대로 담기*/}
						<UserInfo UserInfo={props.UserInfo} setUserInfo={props.setUserInfo}></UserInfo>
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}
export default Navbar;
