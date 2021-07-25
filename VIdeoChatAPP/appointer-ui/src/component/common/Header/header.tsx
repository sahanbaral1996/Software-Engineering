import {logo} from 'assets/image';

const Header = () => {
	return(
		<div className="nav-bar_wrapper">
			<div className="nav-bar_container">
				<div className="nav-bar">
					<div style={{ width:'50px', paddingLeft: '20px', height: '40px', paddingTop: '8px', paddingBottom: '8px'}}>
						<a href="/" className="nav-bar-link">
							<img src={logo} alt="logo" style={{ height:'40px' }}/>
						</a>
					</div>
					<div>
						<a href="/signup" className="nav-bar-link">
							Signup
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;